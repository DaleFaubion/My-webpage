from flask import Flask, request, render_template
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

app = Flask(__name__)
# Restrict maximum upload size to 5MB to prevent memory exhaustion / DoS
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

@app.errorhandler(413)
def request_entity_too_large(error):
    return render_template("index.html", error="File too large. Maximum allowed size is 5MB."), 413

# Load models once at startup
models = [
    load_model("App/models/Best_model.keras"),
    load_model("App/models/Best_second_model.keras"),
    load_model("App/models/Best_third_model.keras")
]

# CIFAR-10 labels
cifar10_labels = {
    0: 'airplane',
    1: 'automobile',
    2: 'bird',
    3: 'cat',
    4: 'deer',
    5: 'dog',
    6: 'frog',
    7: 'horse',
    8: 'ship',
    9: 'truck'
}

def preprocess(img):
    img = img.resize((32, 32))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

@app.route("/", methods=["GET", "POST"])
def index():
    results = None
    error = None

    if request.method == "POST":
        file = request.files.get("image")

        if not file or file.filename == "":
            error = "Please upload an image file."
            return render_template("index.html", error=error), 400

        try:
            img = Image.open(file).convert("RGB")
        except Exception:
            error = "Could not process the uploaded file. Please ensure it is a valid image (PNG, JPEG, etc.)."
            return render_template("index.html", error=error), 400

        try:
            img_array = preprocess(img)

            predictions = []
            raw_preds = []

            # Individual model predictions
            for i, model in enumerate(models):
                pred = model.predict(img_array, verbose=0)
                raw_preds.append(pred)

                class_id = np.argmax(pred[0])
                class_name = cifar10_labels[class_id]
                confidence = float(np.max(pred[0]))

                predictions.append({
                    "model": f"Model {i+1}",
                    "class": class_name,
                    "confidence": round(confidence * 100, 2)
                })

            # Ensemble (average predictions)
            avg_pred = np.mean(raw_preds, axis=0)
            ensemble_class_id = np.argmax(avg_pred[0])
            ensemble_class = cifar10_labels[ensemble_class_id]
            ensemble_conf = float(np.max(avg_pred[0]))

            results = {
                "individual": predictions,
                "ensemble": {
                    "class": ensemble_class,
                    "confidence": round(ensemble_conf * 100, 2)
                }
            }
        except Exception as e:
            error = "An unexpected error occurred during model inference."
            return render_template("index.html", error=error), 500

    return render_template("index.html", results=results, error=error)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)