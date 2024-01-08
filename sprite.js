class Sprite{
    yVel = 7
    moving = true
    falling = false
    playing = true
    constructor(x, y, size) {
          this.x = x;
          this.y = y;
          this.size = size;
      }
      draw() {
          circle(this.x, this.y, this.size);
      }
      isColliding(otherSprite) {
        let d = dist(this.x, this.y, otherSprite.x, otherSprite.y);
        let radiusSum = this.size/2 + otherSprite.size / 2;
   
        if (d <= radiusSum) {
            return true;
        } else {
            return false;
        }
    }
 
      increaseSize(){
          this.size *= 2
          this.y -= this.size/2
      }
      draw() {
        circle(this.x, this.y+this.size/2, this.size);
        if(this.size == 50){
        }
    }
    control(){
        if(keyIsDown(DOWN_ARROW)){
            this.falling = true
        this.moving = false
        makeBall = true
        }
    }
    update(){
        if(this.falling){
            this.y += this.yVel
            if(this.y > height - this.size){
                this.y = height - this.size
                this.falling = false
            }
        }
        if(this.x - this.size <= 0){
            this.x = this.size
        }
        if(this.x + this.size/2 > 600){
            this.x = 600 - this.size
        }
    }
        move(){``
            if(this.moving == true){
            this.x += (mouseX-this.x) * 0.1
        }
    }
    endGame(){
        if(this.moving == false && this.y <= 20){
            this.size = 20000
            this.x = width/2
            this.y = 0
        }
    }
}
