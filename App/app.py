from flask import Flask, request, render_template
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

app = Flask(__name__)

# Load models once at startup
models = [
    load_model("App/models/Best_model_c.keras"),
    load_model("App/models/Best_second_model_c.keras"),
    load_model("App/models/Best_third_model_c.keras")
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

    if request.method == "POST":
        file = request.files["image"]

        if file:
            img = Image.open(file).convert("RGB")
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

    return render_template("index.html", results=results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)