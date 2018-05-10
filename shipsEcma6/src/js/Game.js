import MathRandom from './utils/MathRandom';
import { KeyBoard } from './utils/Keyboard.js';
import { canvas, ctx } from './elements/canvas';
import Player from './elements/player';
import Enemy from './elements/enemy';
import Shot from './elements/shot';
import Star from './elements/star';
import { paintMainScene } from './scenes/paintMainscene';
import { paintHighScoresScene } from './scenes/highscoreScene';

export default class Game {

    constructor() {
        this.state = null;
        this.player1 = null;
        this.stars = [];
        this.spritesheet = new Image();
        this.spritesheet.src = '../dist/assets/spritesheet.png';
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
            }
            this.state = 'over';
            paintHighScoresScene(ctx, this.highscores);
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
            ctx.fillStyle = 'blue';
            this.player1.fill(ctx);
            //Draw Enemies
            ctx.fillStyle = 'green';
            for (var i = 0, l = this.enemies.length; i < l; i++) {
                this.enemies[i].fill(ctx);
            }
            //Draw Shots
            ctx.fillStyle = 'white';
            for (var i = 0, l = this.player1.shots.length; i < l; i++) {
                this.player1.shots[i].fill(ctx);
            }
            //Draw Score
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText('Score: ' + this.player1.score, 10, 20);
            //Draw HP
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'left'
            ctx.fillText('Lives: ' + this.player1.health, canvas.width - 45, 20)   
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
            for (var i = 0, l = this.stars.length; i < l; i++) {
                this.stars[i].update();
            }   
        }
    }

    createArena() {
        this.scene = 'main';
        this.highscores = [];
        this.player1 = new Player(90, 290, 10, 10, 3);
        this.enemies = [];
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