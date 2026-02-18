let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".question-options");
const scoreText = document.querySelector(".score-text");
const playAgainButton = document.querySelector(".play-again-button");

async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error('Erreur réseau lors du chargement des questions');
        }
        questions = await response.json();
        startQuiz();
    } catch (error) {
        console.error('Erreur:', error);
        questionText.textContent = "Impossible de charger les questions. Assurez-vous de lancer ce fichier via un serveur local (ex: Live Server).";
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = "Score: 0";
    playAgainButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectAnswer(option, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedOption, correctParam) {
    const isCorrect = selectedOption === correctParam;
    if (isCorrect) {
        score++;
        scoreText.textContent = `Score: ${score}`;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 500);
}

function showScore() {
    resetState();
    questionText.textContent = `Vous avez terminé ! Votre score est de ${score} sur ${questions.length}.`;
    playAgainButton.style.display = "block";
}

playAgainButton.addEventListener("click", startQuiz);


fetchQuestions();
