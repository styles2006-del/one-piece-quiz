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
        questionText.textContent = "Impossible de charger les questions.";
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
    questions.pop(currentQuestion);
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
    const buttons = optionsContainer.querySelectorAll(".option-button");
    const isCorrect = selectedOption === correctParam;
    
    buttons.forEach(button => {
        button.style.pointerEvents = "none";
        if (button.textContent === selectedOption) {
            button.classList.add(isCorrect ? "correct-choice" : "wrong-choice");
        }
        if (button.textContent === correctParam) {
            button.classList.add("correct-choice");
        }
    });

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
    }, 1000); // Increased delay to see animations
}

function showScore() {
    resetState();
    questionText.textContent = `Vous avez terminé ! Votre score est de ${score} sur ${questions.length}.`;
    playAgainButton.style.display = "block";
}

playAgainButton.addEventListener("click", startQuiz);

fetchQuestions();
