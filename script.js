const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Properti Bola
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

// Properti Paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Kontrol Paddle
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// Properti Bata
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Membuat array bata
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }; // status 1 = utuh, 0 = hancur
    }
}

// Event Listeners untuk kontrol
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Tambahkan fungsi baru ini untuk menggambar skor
function drawScore() {
    ctx.font = '16px Poppins';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, 8, 20);
}

// Tambahkan fungsi baru ini untuk menggambar nyawa
function drawLives() {
    ctx.font = '16px Poppins';
    ctx.fillStyle = '#fff';
    ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++; // Tambah skor
                    // Cek jika menang
                    if (score == brickRowCount * brickColumnCount) {
                        alert('YOU WIN, CONGRATULATIONS!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Ganti fungsi drawBall()
function drawBall() {
    ctx.beginPath();
    // Gunakan gradasi radial untuk efek 3D pada bola
    const gradient = ctx.createRadialGradient(x, y, ballRadius * 0.1, x, y, ballRadius);
    gradient.addColorStop(0, '#ffafbd');
    gradient.addColorStop(1, '#ffc3a0');
    
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
}

// Ganti fungsi drawPaddle()
function drawPaddle() {
    ctx.beginPath();
    // Gunakan gradasi linear untuk paddle
    const gradient = ctx.createLinearGradient(paddleX, 0, paddleX + paddleWidth, 0);
    gradient.addColorStop(0, '#5ee7df');
    gradient.addColorStop(1, '#b490ca');

    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
}

// Ganti fungsi drawBricks()
function drawBricks() {
    const rowColors = ['#ff7e5f', '#feb47b', '#ffeda0']; // Warna berbeda per baris
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
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

// Game Loop Utama
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore(); // Panggil fungsi gambar skor
    drawLives(); // Panggil fungsi gambar nyawa
    collisionDetection();

    // Deteksi tabrakan dengan dinding samping
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Deteksi tabrakan dengan dinding atas
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Deteksi tabrakan dengan paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--; // Kurangi nyawa
            if (!lives) {
                alert('GAME OVER');
                document.location.reload();
            } else {
                // Reset posisi bola dan paddle
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Menggerakkan paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

draw(); // Mulai game loop