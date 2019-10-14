document.getElementById("body-content").onload = function() {
   

    document.getElementById("play-button").onclick = loadGame;
    document.getElementById("guess-button").onclick = guess;
    document.getElementById("guess-input").onkeydown = inputEntered;

    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-button").disabled = true;
    
}

function inputEntered(e){
    var keyCode = e.code;
    if(keyCode === "Enter"){
        guess();
    }
}
function loadGame(){
    
    window.guesses = 4;
    window.guessedLetters = 0;
    window.guessBank = [];

    //"Re-render" initial element settings
    loadElements();
    drawInitialCanvas();

    document.getElementById("tries-text").innerHTML = window.guesses;

    document.getElementById("guess-input").focus();
    document.getElementById("guess-input").select();

    var DifficultyDD = document.getElementById("select-menu");
    var apiRequestURL = "https://hangman-api.lively.software/";
    if(DifficultyDD.value === "easy")
    {
        apiRequestURL += "?difficulty=easy";
    }
    else if(DifficultyDD.value === "medium"){
        apiRequestURL += "?difficulty=medium";
    }
    else{
        apiRequestURL += "?difficulty=hard";
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiRequestURL);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var JSONResponse = JSON.parse(xhr.responseText);
           playHangman(JSONResponse.word);
        }
        else {
            alert('Request to wordbank api failed! Please try again later.');
        }
    };
    xhr.send();
}

function loadElements(){

    //Show or hide as many letter cells as necessary
    for(i=1; i<=15; i++)
    {
        var textCellID = "textCell" + i;
        document.getElementById(textCellID).innerHTML = "";
    }

    //Hide the win condition title
    document.getElementById("result-message").style.display = "none";

    //Reset the letter bank
    document.getElementById("letterbank").innerHTML = "";

    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-button").disabled = false;
}

function playHangman(word){
    
    var wordLength = word.length;
    for(i = 1; i <= wordLength; i++){
        var textCellID = "textCell" + i;
        document.getElementById(textCellID).style.display = "block";
    }
    for(i = wordLength + 1; i <=15; i++)
    {
        var textCellID = "textCell" + i;
        document.getElementById(textCellID).style.display = "none";
    }

    document.getElementById("test-p").innerHTML = word;
    document.getElementById("test-p2").innerHTML = word[0];
    document.getElementById("guesses-p").innerHTML = window.guesses;

    //Set global variables
    window.word = word;
    window.wordLength = wordLength;
}

function guess(){
    
    var letterGuess = document.getElementById("guess-input").value.toLowerCase();

    //If nothing is entered just return (don't even alert user)
    if(letterGuess === "" || letterGuess === " ")
    {
        return;
    }
    
    //Make sure the guess is a letter
    var asciiCode = letterGuess.charCodeAt(0);
    if(asciiCode < 65 || (asciiCode > 90 && asciiCode < 97) || asciiCode > 122)
    {
        alert(letterGuess + " is not a letter! Try again!");
        document.getElementById("guess-input").focus();
        document.getElementById("guess-input").select();
        return;
    }
    
    //Make sure the letter wasn't already guessed
    for(i=0; i < window.guessBank.length; i++){
        if(window.guessBank[i] === letterGuess){
            alert("You already guessed that letter! Try again!");
            document.getElementById("guess-input").focus();
            document.getElementById("guess-input").select();
            return;
        }
    }
    //Check if letter exists in word
    var success = 0;
    for(i = 0; i < window.wordLength; i++)
    {
        if(window.word[i] === letterGuess){
            var cellID = i+1;
            var textCellID = "textCell" + cellID;
            document.getElementById(textCellID).innerHTML = letterGuess;
            success = 1; //letter found
            window.guessedLetters++; //increment guessed letters
        }
    }

    //Check for unsuccessful guess
    if(success === 0){
        alert("you lost a guess!")
        window.guesses--;
        document.getElementById("guesses-p").innerHTML = window.guesses;

        drawNextBodyPart();
        document.getElementById("tries-text").innerHTML = window.guesses;
    }
    
    //Add letter to guess bank
    window.guessBank.push(letterGuess);
    var letterBank = document.getElementById("letterbank").innerHTML;
    document.getElementById("letterbank").innerHTML = letterBank + '  ' + letterGuess;

    //Check for win condition
    if(window.guessedLetters === window.wordLength){
        document.getElementById("result-text").innerHTML = "YOU WON!";
        document.getElementById("result-text").style.color = "green";
        document.getElementById("result-message").style.display = "block";
        document.getElementById("guess-input").disabled = true;
        document.getElementById("guess-button").disabled = true;

    }

    //Check for lose condition
    if(window.guesses === 0)
    {
        document.getElementById("result-text").innerHTML = "YOU LOST! <br/> The word was: " + window.word;
        document.getElementById("result-text").style.color = "red";
        document.getElementById("result-message").style.display = "block";
        document.getElementById("guess-input").disabled = true;
        document.getElementById("guess-button").disabled = true;
    }

    document.getElementById("guess-input").focus();
    document.getElementById("guess-input").select();
}

function drawInitialCanvas(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //Clear the canvas
    context.clearRect(0, 0, 300, 300);

    //Draw the hang stand
    context.fillStyle = 'brown';
    context.fillRect(60, 20, 10, 100);
    context.fillRect(60, 20, 89, 2);
    context.fillRect(149, 20, 2, 20);
}

function drawNextBodyPart(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //Draw the head
    if(window.guesses === 3){
        context.beginPath();
        context.arc(150, 50, 10, 0, 2 * Math.PI);
        context.strokeStyle= "white";
        context.stroke();
    }
    
    //Draw the arms
    else if(window.guesses === 2){
        context.fillStyle = "white";
        context.fillRect(149, 60, 2, 20);
    }

    //Draw the body
    else if(window.guesses === 1){
        context.fillStyle = "white";
        context.fillRect(135, 60, 30, 1);
    }

    //Draw the legs
    else if(window.guesses === 0){
        context.fillStyle = "white";
        context.fillRect(135, 80, 30, 1);
    }
}