/**
 * CIFAR-10 CNN In-Browser Demo
 * Runs deep learning inference directly on client using ONNX Runtime Web
 */

const CIFAR10_CLASSES = [
  { name: 'airplane', emoji: '✈️' },
  { name: 'automobile', emoji: '🚗' },
  { name: 'bird', emoji: '🐦' },
  { name: 'cat', emoji: '🐱' },
  { name: 'deer', emoji: '🦌' },
  { name: 'dog', emoji: '🐶' },
  { name: 'frog', emoji: '🐸' },
  { name: 'horse', emoji: '🐴' },
  { name: 'ship', emoji: '🚢' },
  { name: 'truck', emoji: '🚚' }
];

// Model paths
const MODEL_PATHS = {
  model1: 'models/best_model.onnx',
  model2: 'models/best_second_model.onnx',
  model3: 'models/best_third_model.onnx'
};

// State
let sessions = {
  model1: null,
  model2: null,
  model3: null
};
let isEnsembleMode = false;
let isModelLoading = false;
let currentImageSrc = null;

// DOM Elements
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const originalPreview = document.getElementById('originalPreview');
const cnnCanvas = document.getElementById('cnnCanvas');
const processingCanvas = document.getElementById('processingCanvas');
const origDim = document.getElementById('origDim');
const winnerEmoji = document.getElementById('winnerEmoji');
const winnerClass = document.getElementById('winnerClass');
const winnerConf = document.getElementById('winnerConf');
const winnerLatency = document.getElementById('winnerLatency');
const probList = document.getElementById('probList');
const ensembleBreakdown = document.getElementById('ensembleBreakdown');
const modeSingle = document.getElementById('modeSingle');
const modeEnsemble = document.getElementById('modeEnsemble');
const sampleItems = document.querySelectorAll('.sample-item');

// Configure ONNX Runtime Web
function initOrtEnvironment() {
  if (window.ort) {
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
    // Single-threaded WASM avoids requiring COOP/COEP headers on static hosts
    ort.env.wasm.numThreads = 1;
  }
}

// Load Model Session
async function loadModel(key) {
  if (sessions[key]) return sessions[key];
  try {
    statusDot.className = 'status-dot';
    statusText.textContent = `Loading ${key === 'model1' ? 'CNN model' : key}...`;
    const session = await ort.InferenceSession.create(MODEL_PATHS[key], {
      executionProviders: ['wasm']
    });
    sessions[key] = session;
    return session;
  } catch (err) {
    console.error(`Error loading ${key}:`, err);
    statusText.textContent = `Failed to load ${key}`;
    throw err;
  }
}

// Preload primary model
async function initModels() {
  initOrtEnvironment();
  try {
    await loadModel('model1');
    statusDot.className = 'status-dot ready';
    statusText.textContent = 'Model ready (In-Browser)';
  } catch (err) {
    statusText.textContent = 'Error loading model';
  }
}

// Preprocess Image for CNN (32x32 RGB, channels-last, normalized 0.0 - 1.0)
function preprocessImage(imgElement) {
  const ctx = processingCanvas.getContext('2d');
  processingCanvas.width = 32;
  processingCanvas.height = 32;

  // Draw scaled image to 32x32 canvas
  ctx.drawImage(imgElement, 0, 0, 32, 32);

  // Also render onto visual preview canvas (scaled up with pixelated styling)
  const viewCtx = cnnCanvas.getContext('2d');
  cnnCanvas.width = 32;
  cnnCanvas.height = 32;
  viewCtx.imageSmoothingEnabled = false;
  viewCtx.drawImage(processingCanvas, 0, 0, 32, 32);

  const imgData = ctx.getImageData(0, 0, 32, 32);
  const data = imgData.data;

  // Shape: [1, 32, 32, 3] Float32Array normalized to [0, 1]
  const floatArr = new Float32Array(1 * 32 * 32 * 3);
  let p = 0;
  for (let i = 0; i < data.length; i += 4) {
    floatArr[p++] = data[i] / 255.0;     // R
    floatArr[p++] = data[i + 1] / 255.0; // G
    floatArr[p++] = data[i + 2] / 255.0; // B
  }

  return new ort.Tensor('float32', floatArr, [1, 32, 32, 3]);
}

// Run Inference
async function classifyImage(imgElement) {
  if (!window.ort) {
    alert('ONNX Runtime library is still initializing. Please wait a moment.');
    return;
  }

  statusText.textContent = 'Classifying image...';
  const startTime = performance.now();

  try {
    const inputTensor = preprocessImage(imgElement);
    const feeds = { 'args_0:0': inputTensor };

    // Primary model prediction
    const session1 = await loadModel('model1');
    const out1 = await session1.run(feeds);
    const p1 = Array.from(out1['Identity:0'].data);

    let finalProbabilities = p1;
    let p2 = null;
    let p3 = null;

    if (isEnsembleMode) {
      statusText.textContent = 'Running 3-model ensemble...';
      const session2 = await loadModel('model2');
      const out2 = await session2.run(feeds);

      const session3 = await loadModel('model3');
      const out3 = await session3.run(feeds);

      p2 = Array.from(out2['Identity:0'].data);
      p3 = Array.from(out3['Identity:0'].data);

      // Average predictions across all 3 models
      finalProbabilities = p1.map((val, idx) => (val + p2[idx] + p3[idx]) / 3);
    }

    const elapsed = Math.round(performance.now() - startTime);

    renderResults(finalProbabilities, elapsed, { p1, p2, p3 });

    statusDot.className = 'status-dot ready';
    statusText.textContent = `Ready (${elapsed}ms)`;
  } catch (err) {
    console.error('Inference error:', err);
    statusText.textContent = 'Inference error';
  }
}

// Render Results to UI
function renderResults(probabilities, latencyMs, ensembleDetails) {
  // Find top prediction
  let topIdx = 0;
  let topScore = -1;
  probabilities.forEach((score, idx) => {
    if (score > topScore) {
      topScore = score;
      topIdx = idx;
    }
  });

  const topClass = CIFAR10_CLASSES[topIdx];
  const topPercent = (topScore * 100).toFixed(1);

  // Update Winning Badge
  winnerEmoji.textContent = topClass.emoji;
  winnerClass.textContent = topClass.name;
  winnerConf.textContent = `${topPercent}%`;
  winnerLatency.textContent = `Inference: ${latencyMs} ms`;

  // Update Probability Bars
  probList.innerHTML = '';
  CIFAR10_CLASSES.forEach((cls, idx) => {
    const prob = probabilities[idx];
    const pct = (prob * 100).toFixed(1);
    const isTop = idx === topIdx;

    const row = document.createElement('div');
    row.className = 'prob-row';
    row.innerHTML = `
      <div class="prob-header">
        <span class="label">${cls.emoji} ${cls.name}</span>
        <span class="pct">${pct}%</span>
      </div>
      <div class="prob-bar-track">
        <div class="prob-bar-fill ${isTop ? 'top' : ''}" style="width: ${Math.max(1, pct)}%"></div>
      </div>
    `;
    probList.appendChild(row);
  });

  // Ensemble Breakdown Table
  if (isEnsembleMode && ensembleDetails.p2 && ensembleDetails.p3) {
    ensembleBreakdown.style.display = 'block';

    const getTop = (arr) => {
      let maxIdx = 0;
      arr.forEach((v, i) => { if (v > arr[maxIdx]) maxIdx = i; });
      return `${CIFAR10_CLASSES[maxIdx].emoji} ${CIFAR10_CLASSES[maxIdx].name} (${(arr[maxIdx] * 100).toFixed(0)}%)`;
    };

    document.getElementById('m1Vote').textContent = getTop(ensembleDetails.p1);
    document.getElementById('m2Vote').textContent = getTop(ensembleDetails.p2);
    document.getElementById('m3Vote').textContent = getTop(ensembleDetails.p3);
  } else {
    ensembleBreakdown.style.display = 'none';
  }
}

// Handle Image Loading
function handleImageSource(src) {
  currentImageSrc = src;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    originalPreview.src = src;
    origDim.textContent = `${img.naturalWidth} × ${img.naturalHeight} px`;
    classifyImage(img);
  };
  img.src = src;
}

// File Selection Handler
function handleFiles(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (JPG, PNG, or WebP).');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    handleImageSource(e.target.result);
  };
  reader.readAsDataURL(file);
}

// Event Listeners
function setupEvents() {
  // Dropzone click
  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  // Drag and Drop
  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleFiles(dt.files);
    }
  });

  // Paste image from clipboard
  window.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleFiles([file]);
        break;
      }
    }
  });

  // Sample items click
  sampleItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      if (src) {
        handleImageSource(src);
      }
    });
  });

  // Mode toggles
  modeSingle.addEventListener('click', () => {
    if (!isEnsembleMode) return;
    isEnsembleMode = false;
    modeSingle.classList.add('active');
    modeEnsemble.classList.remove('active');
    ensembleBreakdown.style.display = 'none';
    if (currentImageSrc) handleImageSource(currentImageSrc);
  });

  modeEnsemble.addEventListener('click', async () => {
    if (isEnsembleMode) return;
    isEnsembleMode = true;
    modeEnsemble.classList.add('active');
    modeSingle.classList.remove('active');
    if (currentImageSrc) handleImageSource(currentImageSrc);
  });
}

// Startup
window.addEventListener('DOMContentLoaded', () => {
  setupEvents();
  initModels().then(() => {
    // Automatically classify the first sample image (Airplane) on initial load
    const firstSample = document.querySelector('.sample-item');
    if (firstSample) {
      const src = firstSample.getAttribute('data-src');
      if (src) handleImageSource(src);
    }
  });
});
