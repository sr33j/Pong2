Here's the content for static/script.js:

const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

const drawRect = (x, y, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
};

const drawCircle = (x, y, radius, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
};

const drawNet = () => {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }
}

const draw = () => {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawNet();
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');
    drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');
    drawCircle(ballX, ballY, ballRadius, 'white');
};

const update = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }

    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }
};

const gameLoop = () => {
    update();
    draw();
    requestAnimationFrame(gameLoop);
};

canvas.addEventListener('mousemove', (event) => {
    const relativeY = event.clientY - canvas.getBoundingClientRect().top;
    if (relativeY - paddleHeight / 2 > 0 && relativeY + paddleHeight / 2 < canvas.height) {
        paddle1Y = relativeY - paddleHeight / 2;
    }
});

gameLoop();