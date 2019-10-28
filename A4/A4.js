document.getElementById("body-content").onload = function() {
   

    document.getElementById("canvas").onclick = getPlayerClick;
    document.getElementById("reset-button").onclick = resetBoard;
    initalizeGlobals();
    drawBoard();
    
}

function initalizeGlobals(){
    window.playerTurn = 'O';
    window.gamesPlayed = 0;
    window.xWins = 0;
    window.yWins = 0;
    window.draws = 0;
    window.boardState = [null, null, null, null, null, null, null, null, null];
    window.gameEnded = false;
}

function resetBoard(){
    window.boardState = [null, null, null, null, null, null, null, null, null];
    drawBoard();
    window.gameEnded = false;
}

function drawBoard(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //Clear the canvas
    context.clearRect(0, 0, 300, 300);

    /*Draw the grid*/
    //Vertical lines
    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(100, 300);
    context.stroke();
    //context.beginPath();
    context.moveTo(200, 0);
    context.lineTo(200, 300);
    context.stroke();

    //Horizontal lines
    //context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300,100);
    context.stroke();
    context.moveTo(0, 200);
    context.lineTo(300,200);
    context.stroke();

}


//Mouse click trigger function
function getPlayerClick(e)
{
    
    //Flag to disable game after a victory until the reset button is clicked
    if(window.gameEnded){
        return;
    }

    //alert("You clicked on x:" + e.clientX + ", y:" + e.clientY + "| Offsetleft: " + document.getElementById("canvas").offsetLeft + " OffsetTop: " + document.getElementById("canvas").offsetTop)
    var offsetLeft = document.getElementById("canvas").offsetLeft;
    var offsetTop = document.getElementById("canvas").offsetTop;
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    var posX = mouseX - offsetLeft;
    var posY = mouseY - offsetTop;

    //Check click against board state
    checkClick(posX, posY);
}


//Check for validity and trigger visual rendering if valid
function checkClick(posX, posY){

    var alertUser = false;

    //Top row
    if(posY > 0 && posY <= 100)
    {
        //Cell 1
        if(posX > 0 && posX <= 100){
            if(window.boardState[0] === null){
                drawCell1();
                window.boardState[0] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 2
        else if(posX > 100 && posX <= 200){
            if(window.boardState[1] === null){
                drawCell2();
                window.boardState[1] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 3
        else if(posX > 200 && posX <= 300){
            if(window.boardState[2] === null){
                drawCell3();
                window.boardState[2] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        } 
    }

    //Middle Row
    else if(posY > 100 && posY <= 200)
    {
        //Cell 4
        if(posX > 0 && posX <= 100){
            if(window.boardState[3] === null){
                drawCell4();
                window.boardState[3] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 5
        else if(posX > 100 && posX <= 200){
            if(window.boardState[4] === null){
                drawCell5();
                window.boardState[4] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 6
        else if(posX > 200 && posX <= 300){
            if(window.boardState[5] === null){
                drawCell6();
                window.boardState[5] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        } 
    }

    //Bottom row
    else if(posY > 200 && posY <= 300)
    {
        //Cell 7
        if(posX > 0 && posX <= 100){
            if(window.boardState[6] === null){
                drawCell7();
                window.boardState[6] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 8
        else if(posX > 100 && posX <= 200){
            if(window.boardState[7] === null){
                drawCell8();
                window.boardState[7] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        }
        //Cell 9
        else if(posX > 200 && posX <= 300){
            if(window.boardState[8] === null){
                drawCell9();
                window.boardState[8] = window.playerTurn;
            }
            else{
                alertUser = true;
            }
        } 
    }

    //Check whether or not to alert for invalid move
    if(alertUser){
        alert("This spot has already been played!");
    }

    //Otherwise check for win/draw condition and change player's turn
    else{

        //Check for win condition
        checkForWin();

        //Change turn (doesn't matter if game ends... that way the loser gets to go first)
        if(window.playerTurn === 'X'){
            window.playerTurn = 'O';
        }
        else{
            window.playerTurn = 'X';
        }        
    }
}

//Check for win/(draw)
function checkForWin(){

    var victory = false;
    var draw = false;

    //Horizontal win conditions
    if((window.boardState[0] === 'X' && window.boardState[1] === 'X' && window.boardState[2] === 'X') ||
       (window.boardState[0] === 'O' && window.boardState[1] === 'O' && window.boardState[2] === 'O'))
    {
        victory = true;
    }
    if((window.boardState[3] === 'X' && window.boardState[4] === 'X' && window.boardState[5] === 'X') ||
       (window.boardState[3] === 'O' && window.boardState[4] === 'O' && window.boardState[5] === 'O'))
    {
        victory = true;
    }
    if((window.boardState[6] === 'X' && window.boardState[7] === 'X' && window.boardState[8] === 'X') ||
       (window.boardState[6] === 'O' && window.boardState[7] === 'O' && window.boardState[8] === 'O'))
    {
        victory = true;
    }

    //Vertical win conditions
    if((window.boardState[0] === 'X' && window.boardState[3] === 'X' && window.boardState[6] === 'X') ||
       (window.boardState[0] === 'O' && window.boardState[3] === 'O' && window.boardState[6] === 'O'))
    {
        victory = true;
    }
    if((window.boardState[1] === 'X' && window.boardState[4] === 'X' && window.boardState[7] === 'X') ||
       (window.boardState[1] === 'O' && window.boardState[4] === 'O' && window.boardState[7] === 'O'))
    {
        victory = true;
    }
    if((window.boardState[2] === 'X' && window.boardState[5] === 'X' && window.boardState[8] === 'X') ||
       (window.boardState[2] === 'O' && window.boardState[5] === 'O' && window.boardState[8] === 'O'))
    {
        victory = true;
    }

    //Diagonal win conditions
    if((window.boardState[0] === 'X' && window.boardState[4] === 'X' && window.boardState[8] === 'X') ||
       (window.boardState[0] === 'O' && window.boardState[4] === 'O' && window.boardState[8] === 'O'))
    {
        victory = true;
    }
    if((window.boardState[2] === 'X' && window.boardState[4] === 'X' && window.boardState[6] === 'X') ||
       (window.boardState[2] === 'O' && window.boardState[4] === 'O' && window.boardState[6] === 'O'))
    {
        victory = true;
    }

    //Check for draw
    if(victory == false &&
        window.boardState[0] !== null &&
        window.boardState[1] !== null &&
        window.boardState[2] !== null &&
        window.boardState[3] !== null &&
        window.boardState[4] !== null &&
        window.boardState[5] !== null &&
        window.boardState[6] !== null &&
        window.boardState[7] !== null &&
        window.boardState[8] !== null &&
        window.boardState[9] !== null    )
    {
        draw = true;
    }

    //Apply updates for draw/win condition
    if(victory || draw)
    {
        if(victory){
            if(window.playerTurn === 'X'){
                alert("X's reign supreme! (click reset to play again)");
                window.xWins++;
            }
            else{
                alert("O's are the champion!(click reset to play again)");
                window.yWins++;
            }
        }
        else{
            alert("The game ends in a tie!");
            window.draws++;
        }

        //Increment the games played
        window.gamesPlayed++;

        //Flag game as over so mouse clicks on canvas are ignored until a new game
        window.gameEnded = true;

        //Update game stats
        document.getElementById("games-played").innerHTML = window.gamesPlayed;
        document.getElementById("x-wins").innerHTML = window.xWins;
        document.getElementById("o-wins").innerHTML = window.yWins;
        document.getElementById("draws").innerHTML = window.draws;
    }
    

}
//1st cell of the grid in order from top left to bottom right
function drawCell1(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(25, 25);
        context.lineTo(75,75);
        context.stroke();
        context.moveTo(75, 25);
        context.lineTo(25,75);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(50, 50, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}

//2nd cell of the grid in order from top left to bottom right
function drawCell2(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(125, 25);
        context.lineTo(175,75);
        context.stroke();
        context.moveTo(175, 25);
        context.lineTo(125,75);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(150, 50, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}

//3rd cell of the grid in order from top left to bottom right
function drawCell3(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(225, 25);
        context.lineTo(275,75);
        context.stroke();
        context.moveTo(275, 25);
        context.lineTo(225,75);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(250, 50, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//4th cell of the grid in order from top left to bottom right
function drawCell4(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(25, 125);
        context.lineTo(75,175);
        context.stroke();
        context.moveTo(75, 125);
        context.lineTo(25,175);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(50, 150, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//5th cell of the grid in order from top left to bottom right
function drawCell5(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(125, 125);
        context.lineTo(175,175);
        context.stroke();
        context.moveTo(175, 125);
        context.lineTo(125,175);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(150, 150, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//6th cell of the grid in order from top left to bottom right
function drawCell6(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(225, 125);
        context.lineTo(275,175);
        context.stroke();
        context.moveTo(275, 125);
        context.lineTo(225,175);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(250, 150, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//7th cell of the grid in order from top left to bottom right
function drawCell7(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(25, 225);
        context.lineTo(75,275);
        context.stroke();
        context.moveTo(75, 225);
        context.lineTo(25,275);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(50, 250, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//8th cell of the grid in order from top left to bottom right
function drawCell8(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(125, 225);
        context.lineTo(175,275);
        context.stroke();
        context.moveTo(175, 225);
        context.lineTo(125,275);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(150, 250, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
//9th cell of the grid in order from top left to bottom right
function drawCell9(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if(window.playerTurn === 'X'){
        context.beginPath()
        context.moveTo(225, 225);
        context.lineTo(275,275);
        context.stroke();
        context.moveTo(275, 225);
        context.lineTo(225,275);
        context.stroke();
    }
    else{
        context.beginPath();
        context.arc(250, 250, 25, 0, 2 * Math.PI);
        context.stroke();
    }
    
}
