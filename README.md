# Introvert vs Extrovert Personality Predictor

A machine learning powered system that predicts whether a person is an **Introvert** or an **Extrovert** based on behavioral features.

## 🌍 Live Access
- **Live Demo**: [https://bahasuru-naya.github.io/Introvert_Extrovert/](https://bahasuru-naya.github.io/Introvert_Extrovert/)
- **Public API**: [https://personality-prediction-bahasuru-bre69.ondigitalocean.app](https://personality-prediction-bahasuru-bre69.ondigitalocean.app)


## 🧠 Core Components
- **Training Notebook**: [`introvert-or-extrovert_notebook.ipynb`](./introvert-or-extrovert_notebook.ipynb) — Contains data analysis, model training, and evaluation logic.
- **Model File**: [`personality_model.pkl`](./personality_model.pkl) — The serialized machine learning model used for real-time predictions.
- **API Server**: [`app.py`](./app.py) — The Flask-based backend that powers the prediction API.

## 🚀 Features
- **Machine Learning Integration**: Uses a pre-trained `joblib` model for predictions.
- **Modern Web UI**: Beautiful glassmorphism design for easy data entry and visualization.
- **RESTful Endpoints**: Simple JSON-based interaction for developers.
- **Health Monitoring**: Includes a health check endpoint for deployment monitoring.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript
- **Backend**: Flask (Python) with Flask-CORS
- **Data Handling**: Pandas
- **Machine Learning**: Scikit-learn (Joblib for model loading)
- **Deployment**: Hosted on DigitalOcean

## 📦 Getting Started

### 1. Web Frontend
To use the visual interface, simply open `index.html` in any modern web browser or visit the [Live Demo](https://bahasuru-naya.github.io/Introvert_Extrovert/).

### 2. Local API Development
#### Clone the repository
```bash
git clone https://github.com/bahasuru-naya/Introvert_Extrovert.git
cd Introvert_Extrovert
```

#### Install dependencies
```bash
pip install -r requirements.txt
```

#### Run the application
```bash
python app.py
```
The local API will be available at `http://localhost:5000`.

## 🛣️ API Endpoints

### 1. Welcome & Usage Info
- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns general information about the API and example request format.

### 2. Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Verifies if the API and model are active.

### 3. Predict Personality
- **URL**: `/predict`
- **Method**: `POST`
- **Example Curl**:
```bash
curl -X POST https://personality-prediction-bahasuru-bre69.ondigitalocean.app/predict \
     -H "Content-Type: application/json" \
     -d '{"Time_spent_Alone":8,"Stage_fear":1,"Social_event_attendance":2,"Going_outside":2,"Drained_after_socializing":1,"Friends_circle_size":3,"Post_frequency":2}'
```

## 📝 Field Descriptions
| Field | Description | Range/Value |
| :--- | :--- | :--- |
| `Time_spent_Alone` | Hours spent alone per day | 0 - 11 |
| `Stage_fear` | Presence of stage fear | 1 (Yes) / 0 (No) |
| `Social_event_attendance` | Social events attended per month | 0 - 10 |
| `Going_outside` | Times going outside per week | 0 - 7 |
| `Drained_after_socializing` | Feeling drained after social events | 1 (Yes) / 0 (No) |
| `Friends_circle_size` | Number of close friends | Integer |
| `Post_frequency` | Social media posts per week | Integer |

---
**Author**: Bahasuru Nayanakantha  
**Contact**: p.h.d.bahasuru@gmail.com
