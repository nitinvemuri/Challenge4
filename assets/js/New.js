//questions
var score = 0;
var aButton = document.getElementById('a');
var bButton = document.getElementById('b');
var cButton = document.getElementById('c');
var dButton = document.getElementById('d')
var number = ["1", "2", "3", "4", "5","6", "7", "8","9", "0"] 
var currentQuestionNumber = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;
var userInput = "Your Answer"


//getelementbyid
var startQuizButton = document.getElementById ("startButton");
var scorePageButton = document.getElementById ("startPageScore")
var startQuizDiv = document.getElementById ("startPage");
var quizBody = document.getElementById ("codeQuiz");
var questionEl = document.getElementById ("question");
var scoreDisplayInitials = document.getElementById ("scoreInitials");
var scoreDisplayScore = document.getElementById ("recentScore");
var finalScoreEl = document.getElementById ("finScore");
var resultEl = document.getElementById ("result");
var scoreInputInitials = document.getElementById ("initials");
var submitCurrentScoreBtn = document.getElementById ("submitCurrentScore");
var gameOver = document.getElementById ("gameover");
var qTimer = document.getElementById ("timer");
var endGameButtons = document.getElementById ("endGameButtons");
var scoreContainer = document.getElementById ("scoreContainer");
var scoreDiv = document.getElementById ("scorePage");




function generateQuizQuestion(){
    gameOver.style.display = "none";
    if (currentQuestionNumber === finalQuestion) {
        return Score();
    }
    
    var currentQuestion = quizQuestions [currentQuestionNumber];
    questionEl.innerHTML = "<h2>" + currentQuestion.question + "</h2>";
    aButton.innerHTML = currentQuestion.choiceA;
    bButton.innerHTML = currentQuestion.choiceB;
    cButton.innerHTML = currentQuestion.choiceC;
    dButton.innerHTML = currentQuestion.choiceD;
};


//quiz

function startQuiz(){
    gameOver.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        qTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          Score();
        }
      }, 1000);
    quizBody.style.display = "block";
}

function redoQuiz () {
    timeLeft = 100;
    timerInterval;
    score = 0;
    currentQuestionNumber = 0;
    startQuizDiv.style.display = "flex";
    scoreContainer.style.display = "";
    gameOver.style.display = "none";
}


//quiz questions
var quizQuestions = [{
    question: "Commonly used Data Types do not include what?",
    choiceA: "strings",
    choiceB: "Eren Jaeger",
    choiceC: "numbers",
    choiceD: "booleans",
    correctAns: "b"},
    
    {
        question: "Arrays in Java Script can be used to store",
        choiceA: "numbers",
        choiceB: "other arrays",
        choiceC: "booleans",
        choiceD: "All the above",
        correctAns: "d"},

        {
        question: "A tool used during devolopment and debugging for printing content to the debugge is:",
        choiceA: "JavaScript",
        choiceB: "terminal/bash",
        choiceC: "for loops",
        choiceD: "console.log",
        correctAns: "d"},

        {
            question: "string values must be enclosed within what in order to be assigned to a variable?",
            choiceA: ",",
            choiceB: "{}",
            choiceC: " ' ' ",
            choiceD: " () ",
            correctAns: "d"},

        {
            question: "How to get be able to get a variable in a quote?",
            choiceA: "`${}`",
            choiceB: " '${}' ",
            choiceC: " /userinput",
            choiceD: " %{} ",
            correctAns: "a"},

        {
            question: "BONUS QUESTION: Who is my favorite anime characters?",
            choiceA: "Lelouch",
            choiceB: "CSS",
            choiceC: "HTML",
            choiceD: "JavaScript",
            correctAns: "a"},

];

var finalQuestion = quizQuestions.length



function checkAnswer(answer){
    correct = quizQuestions[currentQuestionNumber].correctAns;

    if (answer === correct && currentQuestionNumber !== finalQuestion){
        score++;
        alert(`${userInput} is Correct`);
        currentQuestionNumber++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionNumber !==finalQuestion){
        alert(`${userInput} is Incorrect.`)
        currentQuestionNumber++;
        generateQuizQuestion();
    
    }else{
        Score();
    }
}

//score page
function generateHighscores(){
    scoreDisplayInitials.innerHTML = "";
    scoreDisplayScore.innerHTML = "";


    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    
    for (i=0; i<highscores.length; i++){
        var nameSpan = document.createElement("li");
        var scoreSpan = document.createElement("li");

        nameSpan.textContent = highscores[i].name;
        scoreSpan.textContent = highscores[i].score;

        scoreDisplayInitials.appendChild(nameSpan);
        scoreDisplayScore.appendChild(scoreSpan);
    }
}

function clearScore () {
    localStorage.clear ();
    scoreDisplayScore.innerHTML="";
    scoreDisplayInitials.innerHTML = "";
}

function Score(){
    quizBody.style.display = "none"
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    scoreInputInitials.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

function scorePage () {
    gameOver.style.display = "none"
    startQuizDiv.style.display = "none"
    clearInterval(timerInterval);

    showHighscore ();
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameOver.style.display = "none";
    scoreContainer.style.display = "flex";
    scoreDiv.style.display = "block";
    endGameButtons.style.display = "flex";

    generateHighscores();
}



//button to start quiz
startQuizButton.addEventListener("click", startQuiz);




submitCurrentScoreBtn.addEventListener("click", function highscore(){
    
    if(scoreInputInitials.value === null) {
        alert ("Initials only")
        return false;
    }
    
    if(scoreInputInitials.value === "") {
        alert("Initials cannot be blank >:(");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = scoreInputInitials.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOver.style.display = "none";
        scoreContainer.style.display = "flex";
        scoreDiv.style.display = "block";
        endGameButtons.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});








