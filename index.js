//My questions and possible answers. The first entry into each answers array is the correct answer.
const master = [
    {
        question: "How many Star Wars movies are there in the Skywalker Saga?",
        answers: ["9", "3", "8", "6"],
        correct: "9",
        feedback: "Once Episode IX comes out in December 2019, there will be 9 films in the Skywalker Saga.",
    },
    {
        question: "Who is Lando Calrisian?",
        answers: ["Old Friend of Han Solo’s", 
        "Princess Leia’s Husband", 
        "Luke Skywalker’s Uncle", 
        "A bounty hunter in Episode IV"],
        correct: "Old Friend of Han Solo’s",
        feedback: "Lando and Han Solo go way back. Leia isn't married, and Luke's uncle is Owen.",
    },
    {
        question: "!! Spoiler Alert !! Who is Luke Skywalker’s Father?",
        answers: ["Darth Vader", 
        "Obi-Wan Kenobi", 
        "Qui-Gon Jin", 
        "Mace Windu"],
        correct: "Darth Vader",
        feedback: "If you didn't get this one, please watch all of Episode V in its entirety. And ask any person on the street.",
    },
    {
        question: "How long is Episode I (no Googling -- God is watching)",
        answers: ["136 minutes",
        "117 minutes",
        "124 minutes",
        "156 minutes"],
        correct: "136 minutes",
        feedback: "Okay, this one was mean. It's 136 minutes long.",
    },
    {
        question: "What is unique about Count Duku’s lightsaber?",
        answers: ["It is bent at the hilt",
        "It has two blades",
        "It's Purple",
        "It used to be Dath Plageus the Wise's"],
        correct: "It is bent at the hilt",
        feedback: "Count Duku's lightsaber is bent at the hilt.",
    },
    {
        question: "What species is Jar Jar Binks?",
        answers: ["Gungan",
        "Mandalorian",
        "Wookie",
        "Geonosian"],
        correct: "Gungan",
        feedback: "Jar Jar, a gungan, is arguably the Star Wars fandom's least favorite character.",
    },
    {
        question: "What is Finn’s original storm trooper call number?",
        answers: ["FN-2187",
        "FIN-3552",
        "FN-4259",
        "FN-3423"],
        correct: "FN-2187",
        feedback: "Phasma says... 'FN-2187, submit your blaster for inspection.'",
    },
    {
        question: "Where does Rey find Luke Skywalker’s lightsaber?",
        answers: ["In Maz Kanata’s pub",
        "On a remote island",
        "Obi-Wan gave it to her",
        "In an ancient tree"],
        correct: "In Maz Kanata’s pub",
        feedback: "Rey finds Luke's lightsaber in Maz Kanata's pub."
    },
    {
        question: "Which movie was made 5th?",
        answers: ["Episode II",
        "Episode I",
        "Episode V",
        "Episode VII"],
        correct: "Episode II",
        feedback: "In release order: IV, V, VI, I, !!II!!, III, VII, VIII, IX",
    },
    {
        question: "How much money did George Lucas sell Lucasfilm for?",
        answers: ["$4.05 Billion",
        "$3.05 Billion",
        "$987 Million",
        "$405 Million"],
        correct: "$4.05 Billion",
        feedback: "$4.05 billion is a lot of money...",
    }
];

const wordsOfWisdom = [
    "“Much to learn you still have” - Yoda",
    "“Obi-Wan has taught you well” - Darth Vader",
    "“I am a Jedi, like my father before me” - Luke Skywalker",
    "“Impressive… Most, impressive” - Darth Vader"
]

//setting initial global variables of score and the current question the user is on as 0 as starting points.
//Then as the user progresses through the quiz, these variables will be updated.
let score = 0;
let questionNumber = 0;
let randomArray = [];
let correctAnswer;
let feedback;

function initiateQuiz() {
    //this function initiates the quiz from the landing page
    $('.js-start').submit(event => {
        event.preventDefault();
        $('.js-start').toggleClass('hidden');
        renderCurrentQuestion();
    })
}

function renderQuizEnd() {
    $('.js-quiz').addClass('hidden');
    $('.js-feedback').addClass('hidden');
    $('.progress').addClass('hidden');
    $('.end-quiz').toggleClass('hidden');
    document.getElementById('restart-quiz').focus();
    $('.end-score').text(score);
    if (score <= 3) {
        $('.final-word-of-wisdom').text(wordsOfWisdom[0]);
    } else if (score > 3 && score <=6) {
        $('.final-word-of-wisdom').text(wordsOfWisdom[1]);
    } else if (score > 6 && score <=9) {
        $('.final-word-of-wisdom').text(wordsOfWisdom[2]);
    } else if (score === 10) {
        $('.final-word-of-wisdom').text(wordsOfWisdom[3]);
    }
}

function renderCurrentQuestion() {
    //this function renders the user's current question to the screen

    //these ensure the question form is displayed and the feedback portion is hidden
    $('.js-quiz').removeClass('hidden');
    $('.js-feedback').addClass('hidden');
    //$('.progress').removeClass('hidden');
    renderProgress();
    if (questionNumber === 10) {
        renderQuizEnd();
    } else {
        let currentQuestion = master[questionNumber];
        correctAnswer = currentQuestion.correct;
        feedback = currentQuestion.feedback;
        $('.question-text').text(currentQuestion.question);
        randomArray = currentQuestion.answers.sort(() => Math.random() - 0.5);
        $('.answer-set').empty();
        let answerString = "";
        for (let i in randomArray) {
            let answer = randomArray[i];
            answerString += `<input type="radio" name="answer" id="ans-${i}" value="${i}">
            <label for="ans-${i}">${answer}</label>
            <br>`
        }
        $('.answer-set').html(answerString);
        document.getElementById('ans-0').focus();
        $('#ans-0').attr("checked", "checked");
    }
}

function evaluateAnswer() {
    //this function evaluates if the user's answer is the correct answer
    $('.js-quiz').submit(event => {
        event.preventDefault();
        let correctIndex = randomArray.indexOf(correctAnswer);
        let radioValue = $("input[name='answer']:checked").val(); 
        if (radioValue === undefined) {
            alert(`Do, or do not. There is no try. Please pick an option.`);
            return;
        } else if (correctIndex == radioValue) {
            score += 1;
            questionNumber += 1;
            renderScore();
            renderPositiveFeedback();
        } else {
            questionNumber += 1;
            renderScore();
            renderNegativeFeedback();
        }
    })
}

function hideQuizAndDisplayFeedback() {
    //this function hides the quiz form by adding a hidden class
    //and displays the feedback section by removing the hidden class
    $('.js-quiz').toggleClass('hidden');
    $('.js-feedback').toggleClass('hidden');
    $('#question-feedback').text(feedback);
}

function renderPositiveFeedback() {
    //this function renders the positive feedback to the user upon submitting an answer
    hideQuizAndDisplayFeedback();
    $('.feedback-text').text("You are both wise and strong with the force.");
    document.getElementById('next-question').focus();
}

function renderNegativeFeedback() {
    //this function renders the negative feedback to the user upon submitting an answer
    hideQuizAndDisplayFeedback();
    $('.feedback-text').text("Much to learn you still have.");
    document.getElementById('next-question').focus();
}

function renderScore() {
    //this function renders the user's current score to the screen
    $('.js-score-status').text(score);
}

function renderProgress() {
    //this function renders the user's progress to the screen
    $('.js-question-status').text(questionNumber + 1);
}

function advanceQuestion() {
    //this function handles advancing to the next question
    $('.js-feedback').submit(event => {
        event.preventDefault();
        renderCurrentQuestion();
    });
}

function restartQuiz() {
    //this function restarts the quiz
    $('#restart-quiz').click(event => {
        //reset globals
        score = 0;
        questionNumber = 0;
        randomArray = [];
        //correctAnswer = undefined;
        //feedback = undefined;
        renderScore();
        //renderProgress();
        renderCurrentQuestion();
        $('.end-quiz').toggleClass('hidden');
        $('.progress').toggleClass('hidden');
    })
}

function handleQuizApp() {
    initiateQuiz();
    evaluateAnswer();
    renderScore();
    advanceQuestion();
    restartQuiz();
}

//on page load have the start button in focus so the user can just hit enter if they want
document.getElementById('start-button').focus();

$(handleQuizApp);