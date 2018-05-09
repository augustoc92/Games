
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
    }

    render(ctx){
        ctx.fillStyle='#fff';
        ctx.fillRect(this.x,this.y,1,1);
  }

}

