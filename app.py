"""
Personality Predictor API
=========================
Bahasuru Nayanakantha
p.h.d.bahasuru@gmail.com
Flask REST API to predict Introvert vs Extrovert.
Deploy on Render.com (free tier) for a public URL.

POST /predict  →  returns personality prediction
GET  /health   →  health check
GET  /         →  welcome message with usage info
"""

from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Load model at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'personality_model.pkl')
model = joblib.load(MODEL_PATH)

# These are the exact feature names the model was trained on
FEATURE_COLUMNS = [
    'Time_spent_Alone',
    'Stage_fear',
    'Social_event_attendance',
    'Going_outside',
    'Drained_after_socializing',
    'Friends_circle_size',
    'Post_frequency'
]


@app.route('/', methods=['GET'])
def home():
    """Welcome endpoint with usage documentation."""
    return jsonify({
        'message': 'Personality Predictor API — Introvert vs Extrovert',
        'version': '1.0.0',
        'endpoints': {
            'POST /predict': 'Predict personality from behavioral features',
            'GET /health': 'Check API health'
        },
        'example_request': {
            'url': 'POST /predict',
            'headers': {'Content-Type': 'application/json'},
            'body': {
                'Time_spent_Alone': 8.0,
                'Stage_fear': 1,
                'Social_event_attendance': 2.0,
                'Going_outside': 2.0,
                'Drained_after_socializing': 1,
                'Friends_circle_size': 3.0,
                'Post_frequency': 2.0
            }
        },
        'field_notes': {
            'Stage_fear': '1=Yes, 0=No',
            'Drained_after_socializing': '1=Yes, 0=No',
            'Time_spent_Alone': 'Hours per day (0-11)',
            'Social_event_attendance': 'Events per month (0-10)',
            'Going_outside': 'Times per week (0-7)',
            'Friends_circle_size': 'Number of close friends',
            'Post_frequency': 'Social media posts per week'
        }
    }), 200


@app.route('/health', methods=['GET'])
def health():
    """Simple health check endpoint."""
    return jsonify({'status': 'healthy', 'model_loaded': True}), 200


@app.route('/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint.

    Accepts JSON with 7 behavioral features.
    Returns personality label, confidence, and probabilities.

    Example:
        curl -X POST https://your-api.onrender.com/predict \\
             -H 'Content-Type: application/json' \\
             -d '{"Time_spent_Alone": 8, "Stage_fear": 1,
                  "Social_event_attendance": 2, "Going_outside": 2,
                  "Drained_after_socializing": 1, "Friends_circle_size": 3,
                  "Post_frequency": 2}'
    """
    # Parse incoming JSON 
    if not request.is_json:
        return jsonify({
            'error': 'Request must have Content-Type: application/json'
        }), 400

    data = request.get_json()

    #  Validate all required fields are present
    missing_fields = [col for col in FEATURE_COLUMNS if col not in data]
    if missing_fields:
        return jsonify({
            'error': f'Missing required fields: {missing_fields}',
            'required_fields': FEATURE_COLUMNS
        }), 400

    #  Build a DataFrame (model expects this shape) 
    try:
        input_df = pd.DataFrame([{col: data[col] for col in FEATURE_COLUMNS}])
    except Exception as e:
        return jsonify({'error': f'Invalid input format: {str(e)}'}), 400

    #  Predict
    try:
        prediction = model.predict(input_df)[0]
        probabilities = model.predict_proba(input_df)[0]  # [P(Extrovert), P(Introvert)]

        label = 'Introvert' if prediction == 1 else 'Extrovert'
        confidence = float(max(probabilities)) * 100

        return jsonify({
            'prediction': label,
            'confidence_percent': round(confidence, 2),
            'probabilities': {
                'Extrovert': round(float(probabilities[0]) * 100, 2),
                'Introvert': round(float(probabilities[1]) * 100, 2)
            },
            'input_received': data
        }), 200

    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
