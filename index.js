const master = [
    {
        question: "How many Star Wars movies are there in the Skywalker Saga?",
        answers: ["9", "3", "8", "6"],
    },
    {
        question: "Who is Lando Calrisian?",
        answers: ["Old Friend of Han Solo’s", 
        "Princess Leia’s Husband", 
        "Luke Skywalker’s Uncle", 
        "A bounty hunter in Episode IV"],
    }
];

let score = 0;

let questionNumber = 0;

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