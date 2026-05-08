# Introvert vs Extrovert Personality Predictor API

A Flask-based REST API that predicts whether a person is an **Introvert** or an **Extrovert** based on behavioral features using a Machine Learning model.

## 🚀 Features
- **Machine Learning Integration**: Uses a pre-trained `joblib` model for predictions.
- **RESTful Endpoints**: Simple JSON-based interaction.
- **Health Monitoring**: Includes a health check endpoint for deployment monitoring.
- **Detailed Documentation**: Interactive home endpoint providing usage examples.

## 🛠️ Tech Stack
- **Backend**: Flask (Python)
- **Data Handling**: Pandas
- **Machine Learning**: Scikit-learn (Joblib for model loading)
- **Deployment Ready**: Configured for platforms like Render or Heroku.

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/bahasuru-naya/Introvert_Extrovert.git
cd Introvert_Extrovert
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the application
```bash
python app.py
```
The API will be available at `http://localhost:5000`.

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
- **Body**:
```json
{
    "Time_spent_Alone": 8.0,
    "Stage_fear": 1,
    "Social_event_attendance": 2.0,
    "Going_outside": 2.0,
    "Drained_after_socializing": 1,
    "Friends_circle_size": 3.0,
    "Post_frequency": 2.0
}
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
