const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const speedEl = document.getElementById("speed");

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

const gameOverScreen =
document.getElementById("gameOverScreen");

const finalScore =
document.getElementById("finalScore");

let gameStarted = false;
let gameOver = false;
let paused = false;

let score = 0;
let speed = 6;
let roadOffset = 0;

const particles = [];
const obstacles = [];
const coins = [];

let highScore =
Number(localStorage.getItem("runnerHighScore")) || 0;

highScoreEl.textContent =
"High Score: " + highScore;

let playerColor = "#2196f3";

const carOptions =
document.querySelectorAll(".car-option");

carOptions.forEach(option => {

    option.addEventListener("click", () => {

        carOptions.forEach(car =>
            car.classList.remove("selected")
        );

        option.classList.add("selected");

        playerColor =
        option.dataset.color;

    });

});

const road = {
    x: canvas.width / 2 - 150,
    width: 300
};

const player = {
    width: 50,
    height: 90,
    x: road.x + 125,
    y: canvas.height - 120
};

function createObstacle(){

    const lanes = [
        road.x + 25,
        road.x + 125,
        road.x + 225
    ];

    obstacles.push({
        x: lanes[Math.floor(Math.random()*3)],
        y: -100,
        width: 50,
        height: 90
    });
}

function createCoin(){

    const lanes = [
        road.x + 25,
        road.x + 125,
        road.x + 225
    ];

    coins.push({
        x: lanes[Math.floor(Math.random()*3)],
        y: -50,
        radius: 15
    });
}

setInterval(() => {

    if(gameStarted && !gameOver){
        createObstacle();
    }

}, 1200);

setInterval(() => {

    if(gameStarted && !gameOver){
        createCoin();
    }

}, 3000);

startBtn.addEventListener("click", () => {

    gameStarted = true;
    menu.style.display = "none";

});

pauseBtn.addEventListener("click", () => {

    paused = !paused;

    pauseBtn.textContent =
    paused ? "Resume" : "Pause";

});

document.addEventListener("keydown", e => {

    if(!gameStarted || gameOver) return;

    if(e.key === "ArrowLeft"){

        player.x -= 100;

        if(player.x < road.x + 25){
            player.x = road.x + 25;
        }
    }

    if(e.key === "ArrowRight"){

        player.x += 100;

        if(player.x > road.x + 225){
            player.x = road.x + 225;
        }
    }

});

function collision(a,b){

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function createCoinParticles(x,y){

    for(let i=0;i<12;i++){

        particles.push({
            x,
            y,
            radius: Math.random()*4+2,
            dx:(Math.random()-0.5)*6,
            dy:(Math.random()-0.5)*6,
            life:30,
            color:"gold"
        });

    }
}

function createExplosion(x,y){

    for(let i=0;i<40;i++){

        particles.push({
            x,
            y,
            radius:Math.random()*6+2,
            dx:(Math.random()-0.5)*12,
            dy:(Math.random()-0.5)*12,
            life:50,
            color:
            Math.random() > 0.5
            ? "orange"
            : "red"
        });

    }
}

function update(){

    if(!gameStarted || gameOver || paused)
        return;

    roadOffset += speed;

    score += 0.05;

    scoreEl.textContent =
    "Score: " + Math.floor(score);

    speedEl.textContent =
    "Speed: " + speed.toFixed(1);

    speed += 0.001;

    for(let i=particles.length-1;i>=0;i--){

        particles[i].x += particles[i].dx;
        particles[i].y += particles[i].dy;
        particles[i].life--;

        if(particles[i].life <= 0){
            particles.splice(i,1);
        }
    }

    for(let i=coins.length-1;i>=0;i--){

        coins[i].y += speed;

        if(coins[i].y > canvas.height){
            coins.splice(i,1);
            continue;
        }

        const coin = coins[i];

        if(
            player.x < coin.x + 30 &&
            player.x + player.width > coin.x &&
            player.y < coin.y + 30 &&
            player.y + player.height > coin.y
        ){

            score += 10;

            createCoinParticles(
                coin.x + 15,
                coin.y + 15
            );

            coins.splice(i,1);
        }
    }

    for(let i=obstacles.length-1;i>=0;i--){

        obstacles[i].y += speed;

        if(obstacles[i].y > canvas.height){
            obstacles.splice(i,1);
            continue;
        }

        if(collision(player, obstacles[i])){

            createExplosion(
                player.x + player.width/2,
                player.y + player.height/2
            );

            gameOver = true;

            const final =
            Math.floor(score);

            if(final > highScore){

                highScore = final;

                localStorage.setItem(
                    "runnerHighScore",
                    highScore
                );
            }

            finalScore.textContent =
            "Score: " + final;

            gameOverScreen
            .classList
            .remove("hidden");
        }
    }
}

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#2e7d32";

    ctx.fillRect(
        0,
        0,
        road.x,
        canvas.height
    );

    ctx.fillRect(
        road.x + road.width,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#333";

    ctx.fillRect(
        road.x,
        0,
        road.width,
        canvas.height
    );

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;

    for(
        let y = -40 + (roadOffset % 40);
        y < canvas.height;
        y += 40
    ){

        ctx.beginPath();

        ctx.moveTo(
            canvas.width/2,
            y
        );

        ctx.lineTo(
            canvas.width/2,
            y+20
        );

        ctx.stroke();
    }

    ctx.fillStyle = "gold";

    coins.forEach(coin => {

        ctx.beginPath();

        ctx.arc(
            coin.x + 15,
            coin.y + 15,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.fillStyle = playerColor;

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle = "#e53935";

    obstacles.forEach(obs => {

        ctx.fillRect(
            obs.x,
            obs.y,
            obs.width,
            obs.height
        );

    });

    particles.forEach(p => {

        ctx.globalAlpha =
        p.life / 50;

        ctx.fillStyle =
        p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(
        gameLoop
    );
}

window.addEventListener(
    "resize",
    () => {

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }
);
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function moveLeft() {

    if (!gameStarted || gameOver) return;

    player.x -= 100;

    if (player.x < road.x + 25) {
        player.x = road.x + 25;
    }
}

function moveRight() {

    if (!gameStarted || gameOver) return;

    player.x += 100;

    if (player.x > road.x + 225) {
        player.x = road.x + 225;
    }
}

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

leftBtn.addEventListener("touchstart", moveLeft);
rightBtn.addEventListener("touchstart", moveRight);
gameLoop();