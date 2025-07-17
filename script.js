const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const controlToggleButton = document.getElementById('control-toggle');

let gameState = 'menu'; 
let controlMode = 'keyboard';
let ballIsStuck = true;

let score = 0;
let lives = 3;
let ballRadius = 10;
let x, y, dx, dy;

const paddleHeight = 12;
const paddleWidth = 80;
let paddleX;

const brickRowCount = 4;
const brickColumnCount = 6;
const brickWidth = 65;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 30;

let rightPressed = false;
let leftPressed = false;

const bricks = [];

function setupBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

document.addEventListener('keydown', e => { if (controlMode === 'keyboard') keyDownHandler(e); });
document.addEventListener('keyup', e => { if (controlMode === 'keyboard') keyUpHandler(e); });
document.addEventListener('mousemove', e => { if (controlMode === 'mouse') mouseMoveHandler(e); });
document.addEventListener('click', mouseClickHandler);
controlToggleButton.addEventListener('click', toggleControl);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
    else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
    else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function mouseClickHandler() {
    if (gameState === 'menu' || gameState === 'gameOver' || gameState === 'win') {
        resetGame();
        gameState = 'playing';
    } else if (gameState === 'playing' && ballIsStuck) {
        ballIsStuck = false;
    }
}

function toggleControl() {
    if (controlMode === 'keyboard') {
        controlMode = 'mouse';
        controlToggleButton.textContent = 'Switch to Keyboard Control';
    } else {
        controlMode = 'keyboard';
        controlToggleButton.textContent = 'Switch to Mouse Control';
    }
}

function resetBallAndPaddle() {
    x = canvas.width / 2;
    y = canvas.height - paddleHeight - ballRadius;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width - paddleWidth) / 2;
    ballIsStuck = true;
}

function resetGame() {
    setupBricks();
    score = 0;
    lives = 3;
    resetBallAndPaddle();
}

function drawBall() {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, ballRadius * 0.1, x, y, ballRadius);
    gradient.addColorStop(0, '#ffafbd');
    gradient.addColorStop(1, '#ffc3a0');
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(paddleX, 0, paddleX + paddleWidth, 0);
    gradient.addColorStop(0, '#5ee7df');
    gradient.addColorStop(1, '#b490ca');
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    const rowColors = ['#ff7e5f', '#feb47b', '#ffeda0', '#bce6eb'];
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = rowColors[r];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = '18px Poppins';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 10, 25);
}

function drawLives() {
    ctx.font = '18px Poppins';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.fillText('Lives: ' + lives, canvas.width - 10, 25);
}

function drawMessage(title, subtitle) {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '40px Poppins';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Poppins';
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 20);
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        gameState = 'win';
                    }
                }
            }
        }
    }
}

function updateGame() {
    if (controlMode === 'keyboard') {
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }

    if (ballIsStuck) {
        x = paddleX + paddleWidth / 2;
        y = canvas.height - paddleHeight - ballRadius;
        return;
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                gameState = 'gameOver';
            } else {
                resetBallAndPaddle();
            }
        }
    }

    x += dx;
    y += dy;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    drawBall();
    
    if (gameState === 'playing') {
        updateGame();
        collisionDetection();
    } else if (gameState === 'menu') {
        drawMessage('Block Breaker', 'Click to Start');
    } else if (gameState === 'gameOver') {
        drawMessage('GAME OVER', 'Click to Restart');
    } else if (gameState === 'win') {
        drawMessage('YOU WIN!', 'Click to Restart');
    }

    requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();