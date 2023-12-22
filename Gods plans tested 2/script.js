let yPos = 100
let balls = [];
let makeBall = false
let pScore = 0;
function createBall() {
  const randomSize = random([12.5,25,50,100]);
  const x = random(width); 
  const y = 0;
  const player = new Fruit(x, y, randomSize);
  balls.push(player);
  updateScore();
}

function setup() {
  createCanvas(800, 900);
  createBall();
}
function draw() {
  background("#FEC47F");

  textSize(60);
  text(pScore, 700, 80);
	line(0, yPos, 600, yPos);
  line(600,height,600,0)
    for (let i = 0; i < balls.length; i++) {
      balls[i].move();
      balls[i].control()
      balls[i].update()
      balls[i].draw();
    for(let j = 0; j < balls.length; j++) {
      if(i != j && balls[i].isColliding(balls[j])) {
          console.log("colliding");
          let distCenters = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
          console.log("Distance between centers:", distCenters);
          let distance = balls[i].size/2 + balls[j].size/2
          console.log("Minimum distance for collision:", distance);
          let overlap = distance - distCenters;
          let angle = atan2( balls[i].y - balls[j].y, balls[i].x - balls[j].x);
          if (balls[j].size < balls[i].size) {
            balls[j].x -= cos(angle) * overlap;
            balls[j].y -= sin(angle) * overlap;
          } else if (balls[j].size > balls[i].size) {
            balls[i].x += cos(angle) * overlap;
            balls[i].y += sin(angle) * overlap; 
          } else { 
            balls[i].x += cos(angle) * overlap / 2;
            balls[i].y += sin(angle) * overlap / 2;
            balls[j].x -= cos(angle) * overlap / 2;
            balls[j].y -= sin(angle) * overlap / 2;
          }
          if (balls[i].size == balls[j].size && balls[i].size < 400) {
              balls[i].increaseSize();
              balls.splice(j, 1);
              break;
          }
      }
    }
  }
    for(let i = 0; i<balls.lengthl; i++){
      for(let j = 0; j< balls.length; j++){
        if(i != j && balls[i].isColliding(balls[j])) {
          let distCenters = dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
          console.log("Distance between centers:", distCenters);
          let distance = balls[i].size/2 + balls[j].size/2
          console.log("Minimum distance for collision:", distance);
          let overlap = distance - distCenters;
          balls[i].x += cos(angle) * overlap / 2;
            balls[i].y += sin(angle) * overlap / 2;
            balls[j].x -= cos(angle) * overlap / 2;
            balls[j].y -= sin(angle) * overlap / 2;
      
    }
	}
}
}
function getColor(){
  for(let i =0; i<balls.length; i++){
    if(balls[i].size = 50){
      fill(100)
    }
  }
}
function keyPressed() {
	if (key == " " && makeBall == true) {
		createBall();
    makeBall = false
	}
}

function updateScore() {
  pScore = 0;

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    if (ball.size === 12.5) {
      pScore += 2;
    } else if (ball.size === 25) {
      pScore += 4;
    } else if (ball.size === 50) {
      pScore += 8;
    } else if (ball.size === 100) {
      pScore += 16;
    }else if(ball.size === 200){
      pScore += 32
    }else if(ball.size === 400){
      pScore += 64
    }
  }
}