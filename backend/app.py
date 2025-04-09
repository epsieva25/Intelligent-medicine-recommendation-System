from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Optional: Add headers manually for debugging CORS
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

# Set up paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "datasets")
MODEL_PATH = os.path.join(DATASET_DIR, "svc.pkl")

# Load datasets
try:
    symptoms_df = pd.read_csv(os.path.join(DATASET_DIR, "symptoms_df.csv"))
    medications_df = pd.read_csv(os.path.join(DATASET_DIR, "medications.csv"))
    precautions_df = pd.read_csv(os.path.join(DATASET_DIR, "precautions_df.csv"))
    workout_df = pd.read_csv(os.path.join(DATASET_DIR, "workout_df.csv"))
    diets_df = pd.read_csv(os.path.join(DATASET_DIR, "diets.csv"))
    description_df = pd.read_csv(os.path.join(DATASET_DIR, "description.csv"))
    training_df = pd.read_csv(os.path.join(DATASET_DIR, "Training.csv"))
except Exception as e:
    raise FileNotFoundError(f"Error loading datasets: {e}")

# Load the trained SVM model
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    raise FileNotFoundError(f"Error loading model: {e}")

# Get list of available symptoms
available_symptoms = training_df.columns[:-1].tolist()

# Default route
@app.route('/')
def home():
    return "🚀 Intelligent Medicine Recommendation System API is Running"

# Prediction route
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Preflight request
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight check successful'}), 200

    try:
        data = request.get_json()
        symptoms = data.get("symptoms", [])
        print("Received symptoms:", symptoms)

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        input_vector = [1 if symptom in symptoms else 0 for symptom in available_symptoms]
        prediction = model.predict([input_vector])[0]

        # Fetch disease-related info
        medication = medications_df.loc[medications_df['Disease'] == prediction, 'Medication'].values
        precaution = precautions_df.loc[precautions_df['Disease'] == prediction, 'Precaution'].values
        workout = workout_df.loc[workout_df['Disease'] == prediction, 'Workout'].values
        diet = diets_df.loc[diets_df['Disease'] == prediction, 'Diet'].values
        description = description_df.loc[description_df['Disease'] == prediction, 'Description'].values

        return jsonify({
            "disease": prediction,
            "description": [description[0]] if len(description) else ["Not Available"],
            "medications": [medication[0]] if len(medication) else ["Not Available"],
            "precautions": [precaution[0]] if len(precaution) else ["Not Available"],
            "workouts": [workout[0]] if len(workout) else ["Not Available"],
            "diets": [diet[0]] if len(diet) else ["Not Available"]
        })

    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
