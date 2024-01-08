let yPos = 100;
let balls = [];
let makeBall = false;
let pScore = 0;
let gameOver = false;


const BALL_SIZES = {
  12.5: '#0f0',
  25: '#a12423',
  50: '#1a2472',
  100: '#c9c9c9',
  200: '#ffb838',
  400: '#000000'
};


function setup() {
  createCanvas(800, 600);
  createBall();
}


function createBall() {
  const randomSize = random([12.5, 25, 50]);
  const x = random(width);
  const y = 30;
  balls.push(new Fruit(x, y, randomSize));
  updateScore();
}


function getColor(size) {
  return BALL_SIZES[size] || color(128);
}


function keyPressed() {
  if (keyCode === ENTER && gameOver) {
    restartGame();
  }
  if (key === " " && makeBall) {
    createBall();
    makeBall = false;
  }
}


function restartGame() {
  gameOver = false;
  balls = [];
  createBall();
  pScore = 0;
}


function gameOverScreen() {
  background("#FEC47F");
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("GAME OVER!", width / 2, height / 2 - 50);
  text("Score: " + pScore, width / 2, height / 2 - 120);
  text("Press ENTER to restart", width / 2, height / 2 + 50);
}


function updateScore() {
  pScore = balls.reduce((score, ball) => {
    switch (ball.size) {
      case 12.5: return score + 2;
      case 25: return score + 4;
      case 50: return score + 8;
      case 100: return score + 16;
      case 200: return score + 32;
      case 400: return score + 64;
      default: return score;
    }
  }, 0);
}


function draw() {
  background("#FEC47F");
  textSize(60);
  text(pScore, 700, 80);
  line(0, yPos, 600, yPos);
  line(600, height, 600, 0);


  for (let i = 0; i < balls.length; i++) {
    if (balls[i].size == 20000) {
      gameOver = true;
      break;
    }
  }


  if (gameOver) {
    gameOverScreen();
    return;
  }


  updateAndDrawBalls();
}


function updateAndDrawBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].move();
    balls[i].control();
    balls[i].endGame();


    for (let j = i + 1; j < balls.length; j++) {
      handleCollision(i, j);
    }


    fill(getColor(balls[i].size));
    balls[i].draw();
  }
}


function handleCollision(i, j) {
  if (balls[i].isColliding(balls[j])) {
    if (balls[i].size == balls[j].size && balls[i].size < 400) {
      balls[i].increaseSize();
      balls.splice(j, 1);
    } else if (balls[i].size != balls[j].size) {
      let sumRadius = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
      let distance = balls[i].size / 2 + balls[j].size / 2;
      let checkTotalOverlap = distance - sumRadius;
      let angle = atan2(balls[i].y - balls[j].y, balls[i].x - balls[j].x);


      if (balls[j].size < balls[i].size) {
        balls[j].x -= cos(angle) * checkTotalOverlap;
        balls[j].y -= sin(angle) * checkTotalOverlap;
      } else if (balls[j].size > balls[i].size) {
        balls[i].x -= 2 * checkTotalOverlap;
      }
    }
  }
}
