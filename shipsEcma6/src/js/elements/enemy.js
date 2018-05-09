import Rectangle from './rectangle';
import MathRandom from '../utils/MathRandom';
import Canvas from './canvas'

export default class Enemy extends Rectangle {
    
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.health = 2;
        this.timer = 0;
    }

    init() {
        
    }
        
    update(player1) {
        this.moveEnemy();
        this.checkIntersect(player1);
    }
    // Enemy checks position
    checkIntersect(player1){
        if(player1.intersects(this) && player1.timer == 0){
            player1.health = player1.health - 1;
            player1.timer = 20;
        }
    }
    moveEnemy () {
        this.y += 2;
        if (this.timer > 0) this.timer--;
        if (this.y > canvas.height) {
            this.x = MathRandom.max(canvas.width / 10) * 10;
            this.y = 0;
        }
    }
}    