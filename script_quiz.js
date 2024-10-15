
let timerInterval;

function updateProgressBar() {
    const progress = document.getElementById('progress');
    const totalQuestions = quizData.length;

    let progressPercent;
    if (currentQuestion === 0) {
        progressPercent = 5;  
    } else {
        progressPercent = ((currentQuestion ) / totalQuestions) * 100;
    }


    progress.style.width = `${progressPercent}%`;


    progress.classList.remove('half', 'near-end');


    if (progressPercent > 50 && progressPercent < 75) {
        progress.classList.add('half');
    } else if (progressPercent >= 75) {
        progress.classList.add('near-end');
    }
}




function startTimer(duration, display) {
    if (timerInterval) { 
        clearInterval(timerInterval);
    }
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if (timer <= 10) {
            display.classList.add('warning');
        }
        if (--timer < 0) {
            timer = 0; 
            clearInterval(timerInterval);
            display.classList.remove('running');
            submitQuiz(); 
        }
    }, 1000);

    display.classList.add('running');
}

function resetTimer() {
    const display = document.getElementById('timer');
    if(currentQuestion===quizData.length){
        clearInterval(timerInterval);
        display.classList.add('warning');
        display.textContent = "00:00";
    }
    else{
        startTimer(20, display); 
    }
    
}

function retryQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    updateProgressBar();
    resetTimer();
    
    document.getElementById('quiz_next_btn').style.display = 'block';
    document.getElementById('quiz_submit_btn').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('question-container').innerHTML = '';
    loadQuestion();
}


const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        options: {
            A: "Venus",
            B: "Mars",
            C: "Jupiter",
            D: "Saturn"
        },
        correct: "B"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: {
            A: "William Shakespeare",
            B: "Charles Dickens",
            C: "Mark Twain",
            D: "Jane Austen"
        },
        correct: "A"
    },
    {
        question: "What is the chemical symbol for water?",
        options: {
            A: "O",
            B: "H",
            C: "H2O",
            D: "CO2"
        },
        correct: "C"
    },
    {
        question: "What is the chemical symbol for water?",
        options: {
            A: "O",
            B: "H",
            C: "H2O",
            D: "CO2"
        },
        correct: "C"
    }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = quizData[currentQuestion];
    questionContainer.innerHTML = `
        <div class="quiz-question">
            <p>${currentQuestion + 1}. ${questionData.question}</p>
            <label><input type="radio" name="q${currentQuestion}" value="A"> A) ${questionData.options.A}</label><br>
            <label><input type="radio" name="q${currentQuestion}" value="B"> B) ${questionData.options.B}</label><br>
            <label><input type="radio" name="q${currentQuestion}" value="C"> C) ${questionData.options.C}</label><br>
            <label><input type="radio" name="q${currentQuestion}" value="D"> D) ${questionData.options.D}</label>
        </div>
    `;

    
    if (currentQuestion === quizData.length - 1) {
        document.getElementById('quiz_next_btn').style.display = 'none';
        document.getElementById('quiz_submit_btn').style.display = 'block';
    } else {
        document.getElementById('quiz_next_btn').style.display = 'block';
        document.getElementById('quiz_submit_btn').style.display = 'none';
    }
}


function checkAnswer(selected) {
    const questionData = quizData[currentQuestion];
    const quizContainer = document.querySelector("#quiz-container");

    if (selected === questionData.correct) {
        quizContainer.classList.add('correct-answer');
    } else {
        quizContainer.classList.add('wrong-answer');
    }

    const options = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
    options.forEach(option => option.disabled = true);

    userAnswers[currentQuestion] = selected;
}


function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (!selectedOption) {
        alert("Please select an answer before proceeding!");
        return;
    }

    checkAnswer(selectedOption.value);
    currentQuestion++;
    updateProgressBar();
    setTimeout(() => {
        const quizContainer = document.querySelector("#quiz-container");
        quizContainer.classList.remove('correct-answer', 'wrong-answer');
        loadQuestion();
        resetTimer();
    }, 1100);
}




function submitQuiz() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (!selectedOption) {
        alert("Please select an answer before proceeding!");
        return;
    }
    checkAnswer(selectedOption.value);
    currentQuestion++;
    updateProgressBar();
    
    let score = 0;
    let resultsHtml = "";

    setTimeout(() => {
        const quizContainer = document.querySelector("#quiz-container");
        quizContainer.classList.remove('correct-answer', 'wrong-answer');
    }, 1200);

    resetTimer();

    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correct;


        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) {
            score++;
        }
        resultsHtml += `
            <div class="quiz-result">
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                ${isCorrect ? '<p class="correct">Correct!</p>' : `
                    <p class="incorrect">Wrong! The correct answer was: ${question.options[correctAnswer]}</p>
                `}
                <hr>
            </div>
        `;
    });

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>Your Results</h2>
        ${resultsHtml}
        <p class="final-score"><strong>Total Score:</strong> ${score}/${quizData.length}</p>
    `;

    document.getElementById('reset-btn').style.display = 'block'; 
    document.getElementById('quiz_next_btn').style.display = 'none';
    document.getElementById('quiz_submit_btn').style.display = 'none';


    
    
}


window.onload = () => { 
    const display = document.getElementById('timer');
    startTimer(20, display);
    updateProgressBar();
    loadQuestion(); 
};