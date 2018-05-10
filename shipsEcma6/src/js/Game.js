import MathRandom from './utils/MathRandom';
import OrderByMax from './utils/OrderByMax';
import { KeyBoard } from './utils/Keyboard.js';
import { canvas, ctx } from './elements/canvas';
import Player from './elements/player';
import Enemy from './elements/enemy';
import Shot from './elements/shot';
import Star from './elements/star';
import PowerUp from './elements/powerUps';
import { paintMainScene } from './scenes/paintMainscene';
import { paintHighScoresScene } from './scenes/highscoreScene';

export default class Game {

    constructor() {
        debugger;
        this.state = null;
        this.player1 = null;
        this.stars = [];
        this.powerUps = [];
        this.spritesheet = new Image();
        this.gun = new Image();
        this.gun.src ='../../shipsEcma6/src/assets/gun.png';
        this.starImg = new Image();
        this.starImg.src ='../../shipsEcma6/src/assets/star.png';
        this.highscores = [];   
        localStorage.setItem("highscores", JSON.stringify(this.highscores));
        this.storedHighScores = JSON.parse(localStorage.getItem("highscores"));
        this.spritesheet.src = '../../shipsEcma6/src/assets/spritesheet.png';
    }

    init() {
        this.createArena();
        this.update();
    }

    checkState() {
        const isPaused = this.state === 'pause'
        const isEnter = KeyBoard.lastPress === KeyBoard.KEY_ENTER
        if (isEnter) {
            const isPlaying = this.state === 'playing'
            const isOver = this.state === 'over'
            if (isPaused) {
              this.state = 'playing';
            }
            else if (isPlaying) {
                this.state = 'pause';
            }
            else if (isOver) {
                this.createArena();
                this.state = 'playing';
            }
        }
        if (isPaused) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'
            ctx.fillText('PAUSE', 150, 75);
            ctx.textAlign = 'left';
        }
    }   

    update() {
        this.checkScene();
        this.checkState();
        this.render();
        this.resume();
        this.pause();
        setTimeout(this.update.bind(this), 40);
    }

    checkScene() {
        const isEnter = KeyBoard.lastPress === KeyBoard.KEY_ENTER;
        if (this.scene === 'main') {
            paintMainScene(ctx);
            if (isEnter) {
                this.scene = 'playing';
                KeyBoard.lastPress = null;
            }
        }
        else if(this.player1.health == 0){
            this.scene = 'gameover';
            if (this.state === 'playing') {
                this.highscores.push(this.player1.score);
                localStorage.setItem("highscores", JSON.stringify(this.highscores));
                this.storedHighScores = JSON.parse(localStorage.getItem("highscores"));
                this.storedHighScores = OrderByMax.Order(this.highscores);
            }
            this.state = 'over';
            paintHighScoresScene(ctx, this.storedHighScores);
            if (isEnter) {
                this.scene = 'playing';
                this.state = 'playing';
                this.createArena();
                KeyBoard.lastPress = null;
            }
        }
    }

    pause() {
        KeyBoard.lastPress = null;
    }

    render() {
        if (this.scene === 'playing') {
            //Draw Canvas
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //Draw Stars
            for (var i = 0; i < 200; i++) {
                this.stars[i].render(ctx);
            }
            //Draw Player 
            // ctx.fillStyle = 'blue';
            // this.player1.fill(ctx);
            this.player1.drawImageArea(ctx,this.spritesheet, 0, 0, 10, 10)
            //Draw Enemies
            for (var i = 0, l = this.enemies.length; i < l; i++) {
                // ctx.fillStyle = 'white';
                // this.enemies[i].fill(ctx);
                this.enemies[i].drawImageArea(ctx, this.spritesheet, 30, 0, 10, 10)
            }
            //Draw Shots
            for (var i = 0, l = this.player1.shots.length; i < l; i++) {
                // ctx.fillStyle = 'red';
                // this.shots[i].fill(ctx);
                this.player1.shots[i].drawImageArea(ctx, this.spritesheet, 70, 0, 10, 10);
            }
            //Draw PowerUps
            for (var i = 0, l = this.powerUps.length; i < l; i++) {
                this.powerUps[i].render(ctx, this.gun, this.starImg);
            }
            //Draw Score
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText('Score: ' + this.player1.score, 10, 20);
            //Draw HP
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText('Lives: ' + this.player1.health, canvas.width - 45, 20);
            //Pause:
             if (this.state === 'pause') {
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.fillText('PAUSE', 150, 75);
                ctx.textAlign = 'left';
            }
        }
    }

    resume() {
        if (this.state === 'playing' && this.scene == 'playing') {
            // Move player and shots
            this.player1.update();
            
            for (var i = 0, l = this.player1.shots.length; i < l; i++) {
                this.player1.shots[i].update();
            }
            //Move Enemies and check shots Collision
            for (var i = 0, l = this.enemies.length; i < l; i++) {
                this.enemies[i].update(this.player1);
                for (var j = 0, ll = this.player1.shots.length; j < ll; j++) {
                    if (this.player1.shots[j].rectCollision(this.enemies[i])) {
                        this.enemies[i].health--;
                            this.player1.shots.splice(j--, 1)
                            ll--;
                            if (this.enemies[i].health == 0) {
                            this.player1.score++;
                            let r = MathRandom.max(20);
                                if (r < 5) {
                                    if (r == 0){    // New MultiShot
                                        this.powerUps.push(new PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 1));
                                    } else {        // New ExtraPoints
                                        this.powerUps.push(new PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 0));
                                    }
                                }   
                            this.enemies[i].x = MathRandom.max(canvas.width / 10) * 10;
                            this.enemies[i].y = 0;
                            this.enemies[i].health = 2;
                            this.enemies.push(new Enemy(MathRandom.max(canvas.width / 10) * 10, 0, 10, 10));
                            
                           
                        } 
                        else {
                            this.enemies[i].timer = 1;
                        }
                    }
                }   
            }
            //Move Stars
            for (var i = 0, l = this.stars.length; i < l; i++) {
                this.stars[i].update();
            }
            //Check For Powerup Pickup
            for (var i = 0, l = this.powerUps.length; i < l; i++) {
                if (this.player1.checkPowerUp(this.powerUps[i])) {
                    this.powerUps.splice(i--, 1);
                    l--;
                }
               
            }  
        }
    }

    createArena() {
        this.scene = 'main';
        this.player1 = new Player(90, 290, 10, 10, 3);
        this.enemies = [];
        this.powerUps = [];
        this.enemies.push(new Enemy(10, 20, 10, 10));
        this.enemies.push(new Enemy(30, 20, 10, 10));
        this.enemies.push(new Enemy(50, 20, 10, 10));
        this.enemies.push(new Enemy(80, 0, 10, 10));
        this.enemies.push(new Enemy(100, 0, 10, 10));
        this.enemies.push(new Enemy(120, 0, 10, 10));
        this.enemies.push(new Enemy(150, 20, 10, 10));
        this.enemies.push(new Enemy(170, 20, 10, 10));
        this.enemies.push(new Enemy(190, 20, 10, 10));
        for (var i = 0; i < 200; i++) {
            const maxW = MathRandom.max(canvas.width);
            const maxH = MathRandom.max(canvas.height);
            const star = new Star(maxW, maxH);
            this.stars.push(star);
        }
        this.state = 'playing';
    }

}