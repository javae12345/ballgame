class Fruit extends Sprite {
	constructor(x, y, size){
		  super(x , y ,size)
	  };
  
  
	  draw() {
	  circle(this.x, this.y+this.size/2, this.size);
	}
  }
  