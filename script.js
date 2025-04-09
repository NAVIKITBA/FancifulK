// Greet the user with a popup
window.onload = function() {
    const savedName = localStorage.getItem('Name') || 'User'; // Replace with actual data retrieval logic
    alert(`Hey, ${savedName}! Let's begin the survey.`);
};

// Handle genre selection
const genreForm = document.getElementById('genre-form');
const startSurveyButton = document.getElementById('start-survey');
const surveyQuestionsSection = document.getElementById('survey-questions');
const questionsContainer = document.getElementById('questions-container');

startSurveyButton.addEventListener('click', () => {
    const selectedGenres = Array.from(genreForm.elements['genre'])
        .filter(input => input.checked)
        .map(input => input.value);

    if (selectedGenres.length === 0 || selectedGenres.length > 3) {
        alert('Please select up to 3 genres.');
        return;
    }

    loadQuestions(selectedGenres);
    genreForm.style.display = 'none';
    surveyQuestionsSection.style.display = 'block';
});

// Load questions dynamically
function loadQuestions(genres) {
    const questions = {
        Action: ['Action Q1', 'Action Q2', 'Action Q3', 'Action Q4'],
        Adventure: ['Adventure Q1', 'Adventure Q2', 'Adventure Q3', 'Adventure Q4'],
        Comedy: ['Comedy Q1', 'Comedy Q2', 'Comedy Q3', 'Comedy Q4'],
        Drama: ['Drama Q1', 'Drama Q2', 'Drama Q3', 'Drama Q4'],
        Fantasy: ['Fantasy Q1', 'Fantasy Q2', 'Fantasy Q3', 'Fantasy Q4'],
        Horror: ['Horror Q1', 'Horror Q2', 'Horror Q3', 'Horror Q4'],
        Romance: ['Romance Q1', 'Romance Q2', 'Romance Q3', 'Romance Q4'],
        SciFi: ['SciFi Q1', 'SciFi Q2', 'SciFi Q3', 'SciFi Q4']
    };

    questionsContainer.innerHTML = '';
    genres.forEach(genre => {
        const genreHeader = document.createElement('h3');
        genreHeader.textContent = genre;
        questionsContainer.appendChild(genreHeader);

        questions[genre].forEach((question, index) => {
            const questionLabel = document.createElement('label');
            questionLabel.textContent = question;

            const questionInput = document.createElement('input');
            questionInput.type = 'text';
            questionInput.name = `${genre}_Q${index + 1}`;

            questionsContainer.appendChild(questionLabel);
            questionsContainer.appendChild(questionInput);
            questionsContainer.appendChild(document.createElement('br'));
        });
    });
}

// Submit answers and save to API
document.getElementById('questions-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = Object.fromEntries(formData.entries());

    try {
        await fetch('https://sheetdb.io/api/v1/gevpdtunqva70', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        });
        alert('Your answers have been saved!');
    } catch (error) {
        alert('Failed to save your answers. Please try again.');
    }

    calculatePersonality(answers);
});

// Calculate personality type
function calculatePersonality(answers) {
    // Placeholder logic for personality calculation
    // Replace with actual logic based on answers
    alert('Your personality type has been calculated! (Logic to be implemented)');
}