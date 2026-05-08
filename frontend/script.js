document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const inputCard = document.getElementById('input-card');
    const resultCard = document.getElementById('result-card');
    const predictBtn = document.getElementById('predict-btn');
    const btnLoader = document.getElementById('btn-loader');
    const btnText = predictBtn.querySelector('.btn-text');
    const resetBtn = document.getElementById('reset-btn');

    // UI elements for results
    const predictionResult = document.getElementById('prediction-result');
    const confidenceBar = document.getElementById('confidence-bar');
    const confidenceText = document.getElementById('confidence-text');
    const probIntrovert = document.getElementById('prob-introvert');
    const probExtrovert = document.getElementById('prob-extrovert');

    // Update range value badges
    const ranges = [
        { id: 'Time_spent_Alone', badge: 'val-alone', suffix: 'h' },
        { id: 'Social_event_attendance', badge: 'val-social', suffix: '' },
        { id: 'Going_outside', badge: 'val-outside', suffix: '' },
        { id: 'Friends_circle_size', badge: 'val-friends', suffix: '' },
        { id: 'Post_frequency', badge: 'val-posts', suffix: '' }
    ];

    ranges.forEach(range => {
        const input = document.getElementById(range.id);
        const badge = document.getElementById(range.badge);
        
        input.addEventListener('input', (e) => {
            badge.textContent = `${e.target.value}${range.suffix}`;
        });
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prepare data
        const formData = new FormData(form);
        const data = {
            Time_spent_Alone: parseFloat(formData.get('Time_spent_Alone')),
            Stage_fear: document.getElementById('Stage_fear').checked ? 1 : 0,
            Social_event_attendance: parseFloat(formData.get('Social_event_attendance')),
            Going_outside: parseFloat(formData.get('Going_outside')),
            Drained_after_socializing: document.getElementById('Drained_after_socializing').checked ? 1 : 0,
            Friends_circle_size: parseFloat(formData.get('Friends_circle_size')),
            Post_frequency: parseFloat(formData.get('Post_frequency'))
        };

        // Loading state
        predictBtn.disabled = true;
        btnLoader.style.display = 'block';
        btnText.textContent = 'Analyzing...';

        try {
            const response = await fetch('https://personality-prediction-bahasuru-bre69.ondigitalocean.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Prediction failed. Please try again.');
            }

            const result = await response.json();
            displayResult(result);

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please check your connection and try again.');
            
            // Reset button state
            predictBtn.disabled = false;
            btnLoader.style.display = 'none';
            btnText.textContent = 'Analyze Personality';
        }
    });

    function displayResult(data) {
        // Hide form, show result
        inputCard.classList.add('hidden');
        resultCard.classList.remove('hidden');

        // Populate results
        predictionResult.textContent = data.prediction;
        
        // Handle Introvert vs Extrovert colors if needed
        if (data.prediction === 'Introvert') {
            predictionResult.style.background = 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)';
            predictionResult.style.webkitBackgroundClip = 'text';
        } else {
            predictionResult.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)';
            predictionResult.style.webkitBackgroundClip = 'text';
        }

        // Animate confidence bar
        confidenceText.textContent = `${data.confidence_percent}% Confidence`;
        setTimeout(() => {
            confidenceBar.style.width = `${data.confidence_percent}%`;
        }, 100);

        // Probability breakdown
        probIntrovert.textContent = `${data.probabilities.Introvert}%`;
        probExtrovert.textContent = `${data.probabilities.Extrovert}%`;
    }

    // Reset Form
    resetBtn.addEventListener('click', () => {
        resultCard.classList.add('hidden');
        inputCard.classList.remove('hidden');
        
        // Reset button state
        predictBtn.disabled = false;
        btnLoader.style.display = 'none';
        btnText.textContent = 'Analyze Personality';
        
        // Reset bar width for next animation
        confidenceBar.style.width = '0%';
    });
});
