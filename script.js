var canvas;
var canvasContext;
var ballX=50;
var ballSpeedX = 7;

window.onload = function() {
    console.log("Hello World! ");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(callBoth, 1000/framesPerSecond);
}

function callBoth() {
    moveEverything();
    drawEverything();
}

function moveEverything() {
    ballX += ballSpeedX;
    if (ballX >= canvas.width-20 || ballX <= 20) {
        ballSpeedX = -ballSpeedX;
    }
}

function drawEverything() {
    //the black table board
    colorRect( 0, 0, canvas.width, canvas.height, 'black');

    //left player paddle
    colorRect(5,200,10,100, '#fcc');

    //right player paddle
    colorRect(785,200,10,100, '#fcc');
    //the ball
    colorCircle(ballX, 250, 10, '#ff007f');
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