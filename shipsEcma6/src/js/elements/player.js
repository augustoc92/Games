import Rectangle from './rectangle';
import { KeyBoard } from '../utils/Keyboard';
import Shot from '../elements/shot';


export default class Player extends Rectangle {

    constructor(x, y, width , height, health){
        super(x, y, width, height, health);
        this.health = (health === undefined) ? 1 : health;
        this.timer = 0;
        this.shots = [];
        this.multiShot = 1;
        this.score = 0;
        this.state = '';
    }

    update() {
        this.movePlayer();
        this.checkStatus();
    }
  
    movePlayer() {
        if (KeyBoard.pressing[KeyBoard.KEY_UP]) {
            this.y -= 10;
        }
        if (KeyBoard.pressing[KeyBoard.KEY_RIGHT]) {
            this.x += 10;
        }
        if (KeyBoard.pressing[KeyBoard.KEY_DOWN]) {
            this.y += 10;
        }
        if (KeyBoard.pressing[KeyBoard.KEY_LEFT]) {
            this.x -= 10;
        }
        if (KeyBoard.lastPress == KeyBoard.KEY_SPACE) {
            this.shots.push(new Shot(this.x + 3, this.y, 5, 5));
            KeyBoard.lastPress = null;  
        }
        if (KeyBoard.lastPress == KeyBoard.KEY_SPACE) {
            this.shots.push(new Shot(this.x + 3, this.y, 5, 5));
            KeyBoard.lastPress = null;  
        }
    }
    checkStatus() {
        // Check position
        if (this.x > canvas.width - 10) {
            this.x = canvas.width - 10;
        }
        if (this.x < 0) {
            this.x = 0
        }
        if (this.y > canvas.height - 10) {
            this.y = canvas.height - 10;
        }
        if (this.y < 0) {
            this.y = 0
        }
        // Check Hp
        if (this.timer > 0) {
            this.timer = this.timer - 1
        }
        if (this.health == 0) {
            this.alive = false
        }
    }

    checkPowerUp(powerUps){
        //Check For Range inside Canvas and Intersection
        for (var i = 0, l = powerups.length; i < l; i++) {
            powerups[i].y += 5
            if (powerups[i].y > canvas.height) {
                powerups.splice(i--, 1)
                l--;
                continue;
            }
            if (this.intersects(powerups[i])) {
                if (powerups[i].type == 1) {
                    if (this.multiShot < 3) {
                        this.multiShot++;
                    }
                    else {
                        this.score += 5;
                    }
                }
                else {
                    this.score += 5;
                }
                powerups.splice(i--, 1);
                l--;
            }
        }
    }
}
    