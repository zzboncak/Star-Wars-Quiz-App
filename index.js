//My questions and possible answers. The first entry into each answers array is the correct answer.
const master = [
    {
        question: "How many Star Wars movies are there in the Skywalker Saga?",
        answers: ["9", "3", "8", "6"],
        feedback: "Once Episode IX comes out in December 2019, there will be 9 films in the Skywalker Saga.",
    },
    {
        question: "Who is Lando Calrisian?",
        answers: ["Old Friend of Han Solo’s", 
        "Princess Leia’s Husband", 
        "Luke Skywalker’s Uncle", 
        "A bounty hunter in Episode IV"],
        feedback: "Land and Han Solo go way back. Leia isn't married, and Luke's uncle is Owen.",
    },
    {
        question: "!! Spoiler Alert !! Who is Luke Skywalker’s Father?",
        answers: ["Darth Vader", 
        "Obi-Wan Kenobi", 
        "Qui-Gon Jin", 
        "Mace Windu"],
        feedback: "If you didn't get this one, please watch all of Episode V in its entirety. And ask any person on the street.",
    },
    {
        question: "How long is Episode I (no Googling -- God is watching)",
        answers: ["136 minutes",
        "117 minutes",
        "124 minutes",
        "156 minutes"],
        feedback: "Okay, this one was mean. it's 136 minutes long.",
    },
    {
        question: "What is unique about Count Duku’s lightsaber?",
        answers: ["It is bent at the hilt",
        "It has two blades",
        "It's Purple",
        "It used to be Dath Plageus the Wise's"],
        feedback: "Count Duku's lightsaber is bent at the hilt.",
    },
    {
        question: "What species is Jar Jar Binks?",
        answers: ["Gungan",
        "Mandalorian",
        "Wookie",
        "Geonosian"],
        feedback: "Jar Jar, a gungan, is arguably the Star Wars fandom's least favorite character.",
    },
    {
        question: "What is Finn’s original storm trooper call number?",
        answers: ["FN-2187",
        "FIN-3552",
        "FN-4259",
        "FN-3423"],
        feedback: "Phasma says... 'FN-2187, submit your blaster for inspection.'",
    },
    {
        question: "Where does Rey find Luke Skywalker’s lightsaber?",
        answers: ["In Maz Kanata’s pub",
        "On a remote island",
        "Obi-Wan gave it to her",
        "In an ancient tree"],
        feedback: "Rey finds Luke's lightsaber in Maz Kanata's pub."
    },
    {
        question: "Which movie was made 5th?",
        answers: ["Episode II",
        "Episode I",
        "Episode V",
        "Episode VII"],
        feedback: "In release order: IV, V, VI, I, !!II!!, III, VII, VIII, IX",
    },
    {
        question: "How much money did George Lucas sell Lucasfilm for?",
        answers: ["$4.05 Billion",
        "$3.05 Billion",
        "$987 Million",
        "$405 Million"],
        feedback: "$4.05 billion is a lot of money...",
    }
];

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
        console.log(`initiateQuiz ran!`);
        renderCurrentQuestion();
        //this is not really needed as a function.
        //I can just place the event listener outside of any function
        //The HTML links the user to the form page
    })
}

function renderQuizEnd() {
    $('.js-quiz').addClass('hidden');
    $('.js-feedback').addClass('hidden');
    $('.progress').addClass('hidden');
    $('.end-quiz').toggleClass('hidden');
    $('.end-score').text(score);
}

function renderCurrentQuestion() {
    //this function renders the user's current question to the screen
    
    //these ensure the question form is displayed and the feedback portion is hidden
    $('.js-quiz').removeClass('hidden');
    $('.js-feedback').addClass('hidden');
    $('.progress').removeClass('hidden');

    if (questionNumber === 10) {
        renderQuizEnd();
    } else {
        let currentQuestion = master[questionNumber];
        correctAnswer = currentQuestion.answers[0];
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
        console.log(`renderQuestion ran!`);
        console.log(correctAnswer);
    }
    
}

function evaluateAnswer() {
    //this function evaluates if the user's answer is the correct answer
    $('.js-quiz').submit(event => {
        event.preventDefault();
        let correctIndex = randomArray.indexOf(correctAnswer);
        let radioValue = $("input[name='answer']:checked").val(); 
        if (correctIndex == radioValue) {
            score += 1;
            questionNumber += 1;
            renderScoreAndProgress();
            renderPositiveFeedback();
            console.log(`correct answer selected!`);
        } else {
            questionNumber += 1;
            renderScoreAndProgress();
            renderNegativeFeedback();
            console.log(`wrong answer selected!`)
        }
        console.log(`evaluateAnswer ran!`);
    })
    
}

function renderPositiveFeedback() {
    //this function renders the positive feedback to the user upon submitting an answer
    $('.js-quiz').toggleClass('hidden');
    $('.js-feedback').toggleClass('hidden');
    $('.progress').toggleClass('hidden');
    $('.feedback-text').text("You are both wise and strong with the force.");
    $('#question-feedback').text(feedback);
    console.log(`renderFeedback ran!`);
}

function renderNegativeFeedback() {
    //this function renders the negative feedback to the user upon submitting an answer
    $('.js-quiz').toggleClass('hidden');
    $('.js-feedback').toggleClass('hidden');
    $('.progress').toggleClass('hidden');
    $('.feedback-text').text("Much to learn you still have.");
    $('#question-feedback').text(feedback);
    console.log(`renderFeedback ran!`);
}

function renderScoreAndProgress() {
    //this function renders the user's current score and progress to the screen
    //later I may break this into two functions
    $('.js-score-status').text(score);
    $('.js-question-status').text(questionNumber + 1);
    console.log(`renderScoreAndProgress ran!`);
}

function advanceQuestion() {
    $('.js-feedback').submit(event => {
        event.preventDefault();
        renderCurrentQuestion();
    });
}


function handleQuizApp() {
    initiateQuiz();
    renderCurrentQuestion();
    evaluateAnswer();
    renderScoreAndProgress();
    advanceQuestion()
}

$(handleQuizApp);