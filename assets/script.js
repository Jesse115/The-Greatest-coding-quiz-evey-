var totalScore = 0;
var nextQuestion = -1; 
var timeLeft = 0;
var quizTimer;
var feedbackEl = document.querySelector("#feedback");

const questions = [

    {
        questionTitle: "The function and var are known as?",
        choices: ["Keywords", "data Types", "Declaration statements", "Prototypes" ],
        answer: "Declaration statements"
    },
        
    {
        questionTitle: "Which of the following type of a variable is volatile?",
        choices: ["Mutable variable", "Dynamic variable", "Volatile variable", "Immutable variable" ],
        answer: "Mutable variable"
    },

    {
        questionTitle: "Which one of the following operator returns false if both values are equal?",
        choices: ["!", "!==", "!=", "all of the above"],
        answer: "!="
    },

    {
        questionTitle: "In a case, where the value of the operator is NULL , the typeof returned by the unary operator is?",
        choices: ["undefined", "string", "boolean", "object"],
        answer: "object"
    },
        
    {
        questionTitle: "Which one of the following is not a keyword?",
        choices: ["if", "with", "debugger", "use strict"],
        answer: "use strict" 
    },

    {
        questionTitle: "What is 'null' exactly?",
        choices: ["Null represents the absence of a value.","Null is a variable representing what is within a function.", "Null represents the number 0.", "Null means nothing in JavaScript."],
        answer: "Null represents the absence of a value." 
    },
    
    {
        questionTitle: "Which one of the following symbol is used for creating comments in the javascript?",
        choices: ["//", "/C", "C/", "**"],
        answer: "//", 
    },
    
    {
        questionTitle: "How is a conditional statement in JavaScript declared?",
        choices: ["The for loop", "The var function statement", "The while loop", "The if else statement"],
        answer: "The if else statement" 
    },

    {
        questionTitle: "What are the three important manipulations for a loop on a loop variable?",
        choices: ["Updation, Incrementation, Initialization","Initialization, Testing, Incrementation", "Testing, Updation, Testing", "Initialization, Testing, Updation"],
        answer: "Initialization, Testing, Updation"
    },        

    {
        questionTitle: "Which one of the following keywords is used for defining the function in the JavaScript",
        choices: ["Void","init", "main", "function"],
        answer: "function" 
    },

]
 
function startQuiz() {

    timeLeft = 100;
    document.getElementById("timeLeft").innerHTML=timeLeft + " seconds";

    quizTimer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML=timeLeft + " seconds";
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            window.alert("TIME IS UP! THE QUIZ IS OVER!");
            quizOver(); 
        }
        }, 1000); 
        nextNewQuestion();
    }

function quizOver() {
    clearInterval(quizTimer);
    var finalQuizDetails = `
    <h2>Great job!</h2>
    <p>Your final score is ` + totalScore + `!</p>
    <p>Please enter your initials to submit your score in the highscore chart.</p>
    <input type="text" id="MVP" class="initials" maxlength="3" required>
    <button onclick="saveHighscore()" class="highscore-btn" title="Submit Highscore">Submit</button>`;

    document.getElementById("startpage").innerHTML = finalQuizDetails;
}

function saveHighscore() {
    localStorage.setItem("Highscore", totalScore);
    localStorage.setItem("MVP", document.getElementById('MVP').value);

    getHighscore();
}

function getHighscore() {
    var finalQuizDetails = `
    <h2>` + localStorage.getItem("MVP") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("Highscore") + `</h1><br >
    <button onclick="clearHighscore()" class="clear-btn" title = "Clear Score and Play Again!">Clear Score and Play Again!</button>
    <button onclick="resetGame()" class="reset-btn" title = "Just Play Again!">Just Play Again!</button>
    `;
    document.getElementById("startpage").innerHTML = finalQuizDetails;
}

function clearHighscore(){
    localStorage.setItem("Highscore", "");
    localStorage.setItem("MVP", "");

    resetGame();
}    

function resetGame() {
    clearInterval(quizTimer);
    totalScore = 0;
    nextQuestion = -1;
    timeLeft = 0;
    quizTimer = null;

    document.getElementById("timeLeft").innerHTML=timeLeft + " seconds";

    window.location.reload();

    document.getElementById("startpage").innerHTML = finalQuizDetails;
}

function wrongAnswer() {
    timeLeft -= 25;

    if (timeLeft < 0) {
        timeLeft = 0;
    }
    feedbackEl.textContent = "WRONG! The answer was: " + questions[nextQuestion].answer;
    feedbackEl.style.color = "red";
    feedbackEl.style.fontWeight = "bold";
    feedbackEl.style.fontSize = "100%";

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "hide");
    }, 1500);

    nextNewQuestion();

}

function correctAnswer() {
    totalScore += 40;

    feedbackEl.textContent = "CORRECT! That was the right answer: " + questions[nextQuestion].answer;
    feedbackEl.style.color = "green";
    feedbackEl.style.fontWeight = "bold";
    feedbackEl.style.fontSize = "100%";

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "hide");
    }, 1500);

    nextNewQuestion();

}


function nextNewQuestion() {
    nextQuestion++;

    if (nextQuestion > questions.length - 1) {
        quizOver();
        return;
    }

    var finalQuizDetails = "<h2>" + questions[nextQuestion].questionTitle + "</h2>"

    for (var i = 0; i < questions[nextQuestion].choices.length; i++) {
        var choiceButton = "<button onclick = \"[answerchoice]\">[CHOICE]</button>";
        choiceButton = choiceButton.replace("[CHOICE]", questions[nextQuestion].choices[i]);
            if (questions[nextQuestion].choices[i] === questions[nextQuestion].answer) {
                choiceButton = choiceButton.replace("[answerchoice]", "correctAnswer()");
            } else {
                choiceButton = choiceButton.replace("[answerchoice]", "wrongAnswer()");
            }
        finalQuizDetails += choiceButton
    }
        document.getElementById("startpage").innerHTML = finalQuizDetails;
}