var canvas;
var canvasContext;
var ballX=50;
var ballY=50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;

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

window.onload = function() {
    console.log("Hello World! ");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(callBoth, 1000/framesPerSecond);

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });
}

function ballReset() {
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
            ballReset();
            player1Score += 1;
        }
    }
    if (ballX <= 10) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } 
        else {
            ballReset(); 
            player2Score += 1;
        }
    }
}

function drawEverything() {
    //the black table board
    colorRect( 0, 0, canvas.width, canvas.height, 'black');

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

