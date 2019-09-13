//My questions and possible answers. The first entry into each answers array is the correct answer.
const master = [
    {
        question: "How many Star Wars movies are there in the Skywalker Saga?",
        answers: ["9", "3", "8", "6"],
        feedback: "Once Episode IX comes out in December 2019, there will be 6 films in the Skywalker Saga.",
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
        qusetion: "How long is Episode I (no Googling -- God is watching)",
        answers: ["136 minutes",
        "117 minutes",
        "124 minutes",
        "156 minutes"],
    },
    {
        question: "What is unique about Count Duku’s lightsaber?",
        answers: ["It is bent at the hilt",
        "It has two blades",
        "It's Purple",
        "It used to be Dath Plageus the Wise's"],
    },
    {
        question: "What species is Jar Jar Binks?",
        answers: ["Gungan",
        "Mandalorian",
        "Wookie",
        "Geonosian"],
    },
    {
        question: "What is Finn’s original storm trooper call number?",
        answers: ["FN-2187",
        "FIN-3552",
        "FN-4259",
        "FN-3423"],
    },
    {
        question: "Where does Rey find Luke Skywalker’s lightsaber?",
        answers: ["In Maz Kanata’s pub",
        "On a remote island",
        "Obi-Wan gave it to her",
        "In an ancient tree"],
    },
    {
        question: "Which movie was made 5th?",
        answers: ["Episode II",
        "Episode I",
        "Episode V",
        "Episode VII"],
    },
    {
        question: "How much money did George Lucas sell Lucasfilm for?",
        answers: ["$4.05 Billion",
        "$3.05 Billion",
        "$987 Million",
        "$405 Million"],
    }
];

//setting initial global variables of score and the current question the user is on as 0 as starting points.
//Then as the user progresses through the quiz, these variables will be updated.
let score = 0;
let questionNumber = 0;

//this function renders the current question to the screen
function renderQuestion () {
    let currentQuestion = master[questionNumber];
    let questionText = currentQuestion.question;
    let correctAnswer = currentQuestion.answers[0];
    let randomArray = currentQuestion.answers.sort(() => Math.random() - 0.5);
    $(".question-text").text(questionText);
    $('.answer-set').empty();
    let answerString = "";
    for (let i in randomArray) {
        let answer = randomArray[i];
        answerString += `<input type="radio" name="answer" id="ans-1" value="1">
        <label for="ans-1">${answer}</label>
        <br>`
    }
    $('.answer-set').html(answerString);
}

renderQuestion();