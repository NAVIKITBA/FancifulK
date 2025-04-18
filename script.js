// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        age: params.get('age'),
        gender: params.get('gender'),
        email: params.get('email')
    };
}

// Greet the user with a popup using data from the first phase
window.onload = function() {
    const userData = getUrlParams();
    if (userData.name) {
        localStorage.setItem('Name', userData.name); // Save the name for later use
        alert(`Hey, ${userData.name}! Let's begin the survey.`);
    } else {
        alert('Welcome! Please ensure your data is passed from the first phase.');
    }
};

// Handle genre selection
const genreForm = document.getElementById('genre-form');
const startSurveyButton = document.getElementById('start-survey');
const surveyQuestionsSection = document.getElementById('survey-questions');
const questionsContainer = document.getElementById('questions-container');

startSurveyButton.addEventListener('click', function () {
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(input => input.value);

    if (selectedGenres.length === 0) {
        alert('Please select at least one genre to proceed.');
        return;
    }

    // Hide genre selection and show survey questions
    document.getElementById('genre-selection').style.display = 'none';
    surveyQuestionsSection.style.display = 'block';

    // Show only the selected genre forms and add titles dynamically
    const allForms = document.querySelectorAll('#survey-questions form');
    allForms.forEach(form => {
        if (selectedGenres.includes(form.id.replace('-Genre', ''))) {
            form.style.display = 'block';

            // Add genre title dynamically
            const genreTitle = document.createElement('h3');
            genreTitle.textContent = form.id.replace('-', ' ');
            form.prepend(genreTitle);

            // Add a submit button dynamically if not already present
            if (!form.querySelector('button[type="submit"]')) {
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = `Submit ${form.id.replace('-', ' ')} Answers`;
                form.appendChild(submitButton);
            }
        } else {
            form.style.display = 'none';
        }
    });
});

// Load questions dynamically
function loadQuestions(genres) {
    const questions = {
        Action: [
            'In a high-stakes battle, would you rather lead your team with bold commands (E) or analyze the situation quietly before making a move (I)?',
            'When faced with an overwhelming enemy force, do you prefer charging into the fray (E) or finding a secluded spot to plan your next step (I)?',
            'If given the choice, would you rather fight alongside allies to boost morale (E) or take a moment alone to recharge before rejoining the fight (I)?',
            'During a heated confrontation, do you find yourself more energized by the chaos around you (E) or prefer to retreat to gather your thoughts (I)?'
        ],
        Adventure: [
            'In the midst of combat, do you rely more on observing the immediate surroundings (S) or trusting a gut feeling about what might happen next (N)?',
            'When planning an attack, do you focus on the tangible details of the environment (S) or consider possible future scenarios that could unfold (N)?',
            'Do you prefer using weapons and techniques that you have mastered over time (S) or experimenting with new untested methods during the fight (N)?',
            'Is it more important to stay grounded in the present reality of the battle (S) or to envision creative solutions that may seem unconventional at first (N)?'
        ],
        Comedy: [
            'When deciding whether to strike an opponent, do you base your decision on logic and strategy (T) or consider how it will affect those around you emotionally (F)?',
            'If a teammate makes a mistake in battle, do you focus on correcting their error immediately (T) or offer encouragement to help them regain confidence (F)?',
            'Would you rather prioritize defeating the enemy efficiently (T) or ensure that no innocent lives are harmed even if it complicates the mission (F)?',
            'In a tough situation, do you weigh the consequences objectively (T) or let your heart guide you toward what feels morally right (F)?'
        ],
        Drama: [
            'Before entering a dangerous mission, do you prefer having a clear plan mapped out (J) or remaining flexible to adapt as things unfold (P)?',
            'Would you rather stick to a well-thought-out strategy (J) or embrace spontaneity and improvise when unexpected challenges arise (P)?',
            'Do you feel more comfortable knowing exactly what your role is in a team (J) or enjoy exploring different options and changing tactics mid-battle (P)?',
            'Is it better to prepare meticulously for every possibility (J) or trust that you can handle whatever comes your way without overplanning (P)?'
        ]
        // Add more genres and their respective questions here if needed
    };

    questionsContainer.innerHTML = '';
    genres.forEach(genre => {
        const genreHeader = document.createElement('h3');
        genreHeader.textContent = genre;
        questionsContainer.appendChild(genreHeader);

        questions[genre].forEach((question, index) => {
            const questionLabel = document.createElement('label');
            questionLabel.textContent = question;
            questionsContainer.appendChild(questionLabel);

            const buttonContainer = document.createElement('div');

            const buttonE = document.createElement('button');
            buttonE.textContent = 'E';
            buttonE.type = 'button';
            buttonE.onclick = () => addAnswer(genre, 'E');

            const buttonI = document.createElement('button');
            buttonI.textContent = 'I';
            buttonI.type = 'button';
            buttonI.onclick = () => addAnswer(genre, 'I');

            buttonContainer.appendChild(buttonE);
            buttonContainer.appendChild(buttonI);
            questionsContainer.appendChild(buttonContainer);
        });
    });
}

// Submit answers and save to API
document.getElementById('submit-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect answers from all visible forms
    const answers = {};
    const visibleForms = Array.from(document.querySelectorAll('#survey-questions form')).filter(form => form.style.display === 'block');

    visibleForms.forEach(form => {
        const formAnswers = Array.from(form.querySelectorAll('button.active')).map(button => button.dataset.answer);
        answers[form.id] = formAnswers;
    });

    // Calculate MBTI type
    const mbtiType = calculateMBTI(answers);

    // Save answers to Google Sheets or API
    await saveAnswersToGoogleSheets(mbtiType);

    alert(`Your MBTI type is: ${mbtiType}`);
});

// Calculate personality type
function calculatePersonality(answers) {
    // Placeholder logic for personality calculation
    // Replace with actual logic based on answers
    alert('Your personality type has been calculated! (Logic to be implemented)');
}

// Store answers for MBTI calculation
let answers = {
    EI: [],
    SN: [],
    TF: [],
    JP: []
};

// Function to add answers to the respective dichotomy
function addAnswer(dichotomy, answer) {
    answers[dichotomy].push(answer);
}

// Function to calculate MBTI type
function calculateMBTI(answers) {
    const mbtiResults = {
        Action: calculateGenreMBTI(answers.Action),
        Adventure: calculateGenreMBTI(answers.Adventure),
        Comedy: calculateGenreMBTI(answers.Comedy),
        Drama: calculateGenreMBTI(answers.Drama),
        Fantasy: calculateGenreMBTI(answers.Fantasy),
        Horror: calculateGenreMBTI(answers.Horror),
        Romance: calculateGenreMBTI(answers.Romance),
        SciFi: calculateGenreMBTI(answers.SciFi)
    };
    return mbtiResults;
}

function calculateGenreMBTI(genreAnswers) {
    // Logic to calculate MBTI type for a specific genre
    return genreAnswers ? 'ExampleType' : ''; // Replace with actual logic
}

// Function to save answers to Google Sheets
async function saveAnswersToGoogleSheets(mbtiType) {
    const userData = getUrlParams(); // Retrieve user data from URL parameters
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(input => input.value).join(',');

    const data = {
        Name: userData.name || 'Anonymous',
        Age: userData.age || 'N/A',
        Gender: userData.gender || 'N/A',
        Email: userData.email || 'N/A',
        Genre: selectedGenres,
        MBTI_Action: mbtiType.Action || '',
        MBTI_Adventure: mbtiType.Adventure || '',
        MBTI_Comedy: mbtiType.Comedy || '',
        MBTI_Drama: mbtiType.Drama || '',
        MBTI_Fantasy: mbtiType.Fantasy || '',
        MBTI_Horror: mbtiType.Horror || '',
        MBTI_Romance: mbtiType.Romance || '',
        MBTI_SciFi: mbtiType.SciFi || ''
    };

    try {
        await fetch('https://sheetdb.io/api/v1/gevpdtunqva70', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        alert('Your MBTI results and selected genres have been saved!');
    } catch (error) {
        alert('Failed to save your MBTI results. Please try again.');
    }
}
