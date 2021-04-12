import { quizData } from './data.js';

// const quizPlaceholder= document.querySelector('.quiz');
const question = document.querySelector('.quiz__question-header');
const answerA = document.querySelector('#quiz__answer-a');
const answerB = document.querySelector('#quiz__answer-b');
const answerC = document.querySelector('#quiz__answer-c');
const answerD = document.querySelector('#quiz__answer-d');
const imgSrc = document.querySelector('.quiz__img');
const imgAlt = document.querySelector('.quiz__img');

const correctMessages = ["Congratulations! Quizmaster in the making!", "You're doing great! Keep it up!", "Don't end this winning streak!", "Look at you go!"];
const losingMessages = ["Looks like you need to brush up on your trivia!", "So close! Better luck next time", "No winning streak this time!"];

const randomWinningMessage = correctMessages[Math.floor(Math.random() * correctMessages.length)];
const randomLosingMessage = losingMessages[Math.floor(Math.random() * losingMessages.length)];

let currentQuestion = 0;
console.log(quizData[currentQuestion]);

const createQuestionHTML = () => {
    const currentQuizData = quizData[currentQuestion];
    question.innerText = currentQuizData.question;
    answerA.innerText = currentQuizData.answers[0].answer;
    answerB.innerText = currentQuizData.answers[1].answer;
    answerC.innerText = currentQuizData.answers[2].answer;
    answerD.innerText = currentQuizData.answers[3].answer;
    imgSrc.src = currentQuizData.imgSrc;
    imgAlt.alt = currentQuizData.imgAlt;
    answerA.dataset.correct = currentQuizData.answers[0].isCorrect;
    answerB.dataset.correct = currentQuizData.answers[1].isCorrect;
    answerC.dataset.correct = currentQuizData.answers[2].isCorrect;
    answerD.dataset.correct = currentQuizData.answers[3].isCorrect;
}

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

const countdown = () => {
    timeLeft--;
    document.querySelector('.clock__timeRemaining').innerHTML = timeLeft;
    
    if(timeLeft <= 3) {
        document.querySelector('.clock__timeRemaining').style.color = "#EF233C";
    } 

    if(timeLeft <= 0) {
        clearInterval(runCountdown);
        disableAnswers();
        document.querySelector('.clock__timeRemaining').innerHTML = "Time's up...";
        document.querySelector('.clock__timeRemaining').style.color = "#fff";
        document.body.style.backgroundImage = "linear-gradient(to right, #fd746c, #fe7b6a, #ff8269, #ff8968, #ff9068)";
        // When timer hits 0, disable buttons so user can't click on answer
    }
};

const runCountdown = setInterval(countdown, 1500);
runCountdown;

// Function to prevent user from clicking an answer once the timer has run out or an answer has already been chosen.
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
        selectedAnswer.style.backgroundColor = "#60A561";
        document.querySelector('.clock__timeRemaining').innerHTML = randomWinningMessage;
    } else {
        selectedAnswer.style.backgroundColor = "#ff8269";
        document.querySelector('.clock__timeRemaining').innerHTML = randomLosingMessage;
    }

    disableAnswers();
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
        answer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    })
}









renderNextQuestion(currentQuestion);

createQuestionHTML();

// countdown();