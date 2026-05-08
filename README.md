# Introvert_Extrovert
machine learning model to predict whether a person is an introvert or an extrovert based on the provided characteristics


curl -X POST http://192.168.1.3:5000/predict \\
             -H 'Content-Type: application/json' \\
             -d '{"Time_spent_Alone": 8, "Stage_fear": 1,
                  "Social_event_attendance": 2, "Going_outside": 2,
                  "Drained_after_socializing": 1, "Friends_circle_size": 3,
                  "Post_frequency": 2}'
