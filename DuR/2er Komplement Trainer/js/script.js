document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const wrongCountElement = document.getElementById('wrong-count');
    const timerElement = document.getElementById('timer');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    const errorStatsElement = document.getElementById('error-stats');

    let wrongCount = 0;
    let timeLeft = 180;
    let currentNumber;
    let timerInterval;
    let errorStats = {};

    const correctSound = new Audio('sounds/correct.mp3');
    const wrongSound = new Audio('sounds/wrong.mp3');

    const generateQuestion = () => {
        currentNumber = Math.floor(Math.random() * 20) + 1;
        questionElement.textContent = `Was ist die 2er-Komplement Darstellung von ${currentNumber}?`;
        questionElement.style.fontSize = '2em';
    };

    const checkAnswer = () => {
        const userAnswer = answerElement.value.trim();
        const correctAnswer = currentNumber.toString(2);

        if (userAnswer === correctAnswer) {
            correctSound.play();
            generateQuestion();
            answerElement.value = '';
        } else {
            wrongSound.play();
            wrongCount++;
            wrongCountElement.textContent = wrongCount;
            if (!errorStats[currentNumber]) {
                errorStats[currentNumber] = 0;
            }
            errorStats[currentNumber]++;
            updateErrorStats();
        }
    };

    const updateErrorStats = () => {
        errorStatsElement.innerHTML = '';
        for (const number in errorStats) {
            const listItem = document.createElement('li');
            listItem.textContent = `Zahl ${number}: ${errorStats[number]} Fehler`;
            errorStatsElement.appendChild(listItem);
        }
    };

    const startTimer = () => {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showResult();
            }
        }, 1000);
    };

    const showResult = () => {
        questionElement.parentElement.classList.add('hidden');
        resultElement.classList.remove('hidden');
        scoreElement.textContent = `Sie haben ${wrongCount} falsche Antworten gegeben.`;
    };

    const restartQuiz = () => {
        wrongCount = 0;
        timeLeft = 180;
        wrongCountElement.textContent = wrongCount;
        timerElement.textContent = timeLeft;
        resultElement.classList.add('hidden');
        questionElement.parentElement.classList.remove('hidden');
        errorStats = {};
        errorStatsElement.innerHTML = '';
        generateQuestion();
        startTimer();
    };

    submitButton.addEventListener('click', checkAnswer);
    restartButton.addEventListener('click', restartQuiz);
    answerElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    generateQuestion();
    startTimer();
});