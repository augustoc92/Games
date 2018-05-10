import Canvas from './canvas'
import MathRandom from '../utils/MathRandom';

export default class Star{
    constructor(x,y){ 
        this.x = (x == null) ? 0 : x
        this.y = (y == null) ? 0 : y
    }

    init() {
        this.y++
        if(this.y>canvas.height) {
            this.y=0
        }
    }

    update() {            
        this.moveStars();
    }

    moveStars() {
            this.y += 1;
            if (this.timer > 0) this.timer--;
            if (this.y > canvas.height) {
                this.x = MathRandom.max(canvas.width / 10) * 10;
                this.y = 0;
            }
    }

    render(ctx){
        ctx.fillStyle='#fff';
        ctx.fillRect(this.x,this.y,1,1);
  }

}

