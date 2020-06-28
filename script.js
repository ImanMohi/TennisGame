var canvas;
var canvasContext;
var ballX=50;
var ballY=50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;

var WIN_score = 3;
var showWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}

function handleMouseClick(evt) {
    if(showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen =  false;
    }
}

window.onload = function() {
    console.log("Hello World! ");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(callBoth, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });
}

function ballReset() {
    if(player1Score >= WIN_score || player2Score >= WIN_score) {
        showWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function callBoth() {
    moveEverything();
    drawEverything();
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY-35) {
        paddle2Y += 6;
    }
    else if (paddle2YCenter > ballY+35){
        paddle2Y -= 6;
    }
}

function moveEverything() {
    if (showWinScreen) {
        return;
    }
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY >= canvas.height-10) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY <= 10) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX >= canvas.width-10) {
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } 
        else {
            player1Score += 1;
            ballReset();
        }
    }
    if (ballX <= 10) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } 
        else {
            player2Score += 1;
            ballReset(); 
        }
    }
}

function drawNet() {
    for (var i=0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1, i, 3, 20, '#cff');
    }
}

function drawEverything() {
    //the black table board
    colorRect( 0, 0, canvas.width, canvas.height, 'black');

    if (showWinScreen) {
        canvasContext.fillStyle='cyan';

        if(player1Score >= WIN_score) {
            canvasContext.fillText("Left player Won! ", 380, 350);
        } else if (player2Score >= WIN_score) {
            canvasContext.fillText("Right player Won! ", 380, 350);
        }
        canvasContext.fillText("click to continue", 380, 300,100);
        return;
    }

    drawNet();

    //left player paddle
    colorRect(5,paddle1Y,10,PADDLE_HEIGHT, '#fcc');

    //right player paddle
    colorRect(canvas.width-15,paddle2Y,10,PADDLE_HEIGHT, '#fcc');

    //the ball
    colorCircle(ballX, ballY, 10, '#ff007f');

    //score display
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true );
    canvasContext.fill();
}

function colorRect( leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor ;
    canvasContext.fillRect(leftX,topY,width, height);
}

