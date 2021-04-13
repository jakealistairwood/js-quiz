import { quizData } from './data.js';

// const quizPlaceholder= document.querySelector('.quiz');
const question = document.querySelector('.quiz__question-header');
const answerA = document.querySelector('#quiz__answer-a');
const answerB = document.querySelector('#quiz__answer-b');
const answerC = document.querySelector('#quiz__answer-c');
const answerD = document.querySelector('#quiz__answer-d');
const img = document.querySelector('.quiz__img');
const imgContainer = document.querySelector('.quiz__imgContainer');

const correctMessages = ["Congratulations! Quizmaster in the making!", "You're doing great! Keep it up!", "Don't end this winning streak!", "Look at you go!"];
const losingMessages = ["Looks like you need to brush up on your trivia!", "So close! Better luck next time", "No winning streak this time!"];

const randomWinningMessage = correctMessages[Math.floor(Math.random() * correctMessages.length)];
const randomLosingMessage = losingMessages[Math.floor(Math.random() * losingMessages.length)];

let currentQuestion = 0;
console.log(quizData[currentQuestion]);


// Function to render Quiz Data to HTML
const createQuestionHTML = () => {
    const currentQuizData = quizData[currentQuestion];
    question.innerText = currentQuizData.question;
    answerA.innerText = currentQuizData.answers[0].answer;
    answerB.innerText = currentQuizData.answers[1].answer;
    answerC.innerText = currentQuizData.answers[2].answer;
    answerD.innerText = currentQuizData.answers[3].answer;
    img.src = currentQuizData.imgSrc;
    img.alt = currentQuizData.imgAlt;
    answerA.dataset.correct = currentQuizData.answers[0].isCorrect;
    answerB.dataset.correct = currentQuizData.answers[1].isCorrect;
    answerC.dataset.correct = currentQuizData.answers[2].isCorrect;
    answerD.dataset.correct = currentQuizData.answers[3].isCorrect;
}

/* Function to render next question data 
    1. Update currentQuestion index
    2. Update current HTML to render new question
    3. Reset necessary functions when new question updated
        - Reset countdown
        - Change background color if necessary
        - Enable answer buttons
*/

const renderNextQuestion = () => {
    const nextQuestionBtn = document.querySelector('.nextBtn');
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestion++;
        createQuestionHTML(currentQuestion);
        resetQuiz();
    })
    bindAnswerEventListeners();
}

let timeLeft = document.querySelector('.clock__timeRemaining').innerHTML;


// Countdown initiation functionality
const countdown = () => {
    timeLeft--;
    document.querySelector('.clock__timeRemaining').innerHTML = timeLeft;
    // When timer hits 3 seconds left -> change font color to red
    if(timeLeft <= 3) {
        document.querySelector('.clock__timeRemaining').style.color = "#EF233C";
    } 
    /* When timer hits 0 
        1. Stop Countdown
        2. Disable buttons so user can't choose answer
        3. Change seconds left to say a message such as 'time's up...' and update font to white
        4. Change window background color to some sort of red
        5. Update score counter
    */
    if(timeLeft <= 0) {
        clearInterval(runCountdown);
        disableAnswers();
        document.querySelector('.clock__timeRemaining').innerHTML = "Time's up...";
        document.querySelector('.clock__timeRemaining').style.color = "#fff";
        document.body.style.backgroundImage = "linear-gradient(to right, #fd746c, #fe7b6a, #ff8269, #ff8968, #ff9068)";
        updateTotalScore();
    }
};

const runCountdown = setInterval(countdown, 1500);
runCountdown;

// Functions to prevent/enable user from clicking an answer.
const disableAnswers = () => {
    const answers = document.querySelectorAll('.quiz__answer');
    answers.forEach(answer => {
        answer.disabled = true;
    })
}

const enableAnswers = () => {
    const answers = document.querySelectorAll('.quiz__answer');
    answers.forEach(answer => {
        answer.disabled = false;
    })
}

const validateAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer.dataset.correct;

    if(isCorrect === 'true') {
        selectedAnswer.classList.add('correct');
        document.querySelector('.clock__timeRemaining').innerHTML = randomWinningMessage;
        updateUserScore();
    } else {
        selectedAnswer.classList.add('incorrect');
        document.querySelector('.clock__timeRemaining').innerHTML = randomLosingMessage;
    }
    disableAnswers();
    updateTotalScore();
}

const updateUserScore = () => {
    let userScore = document.querySelector('.user__score').innerHTML;
    userScore++;
    document.querySelector('.user__score').innerHTML = userScore;
}

const updateTotalScore = () => {
    let totalScore = document.querySelector('.total__score').innerHTML;
    totalScore++;
    document.querySelector('.total__score').innerHTML = totalScore;
}

const bindAnswerEventListeners = () => {
    const answers = document.querySelectorAll('.quiz__answer');
    answers.forEach(answer => {
        answer.addEventListener('click', e => {
            validateAnswer(e.target);
            clearInterval(runCountdown);
        })
    })
}

// validateAnswer();


const resetQuiz = () => {
    enableAnswers();
    // Countdown
    document.querySelector('.clock__timeRemaining').innerText = '15';
    const answers = document.querySelectorAll('.quiz__answer');
    answers.forEach(answer => {
        answer.classList.remove('correct');
        answer.classList.remove('incorrect');
    })
    document.body.style.backgroundImage = 'linear-gradient(to right, #acb6e5, #95c9f8, #7cddff, #72eef9, #86fde8)';
}









renderNextQuestion(currentQuestion);

createQuestionHTML();

// countdown();