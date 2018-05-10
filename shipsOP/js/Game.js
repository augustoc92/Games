'use strict'

var Ships = Ships || {};
var spritesheet = new Image();
spritesheet.src = 'assets/spritesheet.png';

Ships.Game = function() {
}

Ships.Game.prototype = {

  constructor: Ships.Game,

  init: function() {
    this.createArena();
    this.update();
  },

  update: function() {
    this.render();
    this.changeState();
    this.resume();
    this.pause();
    setTimeout((this.update.bind(this)), 40);
  },


  pause: function() {
    Keyboard.lastPress = null;
  },


  render: function() {
    //Canvas:
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Enemies
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].render(this.ctx);
    }
    //Player
    this.player.render(this.ctx);
    //Score
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Score: ' + this.score, 10, 20);
    // Shots
    for (var i = 0, l = this.shots.length; i < l; i++) {
      this.shots[i].render(this.ctx);
    }
    // Stars
    for (var i = 0; i < 200; i++) {
      this.stars.push(new Ships.Star(mathRandom(canvas.width), mathRandom(canvas.height)))
      this.stars[i].render(this.ctx);
    }
    // PowerUps
    for (var i = 0, l = this.powerups.length; i < l; i++) {
      this.powerups[i].render(this.ctx);
    }
    //Pause:
    if (this.state === 'pause') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('PAUSE', 150, 75);
      this.ctx.textAlign = 'left';
    }
    //Game Over:
    if (this.state === 'over') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 150, 75);
      this.ctx.textAlign = 'left';
    }
  },

  resume: function() {
    if (this.state === 'playing') {
      this.player.update();
      // Enemy Movement
      this.enemyAction();
      for (var i = 0; i < this.stars.length; i++) {
        this.stars[i].update();
      }
      for (var i = 0, l = this.shots.length; i < l; i++) {
        this.shots[i].update();
        if (this.y < 0) {
          this.shots.splice(i--, 1);
          l--;
        }
      }
    }
  },

  enemyAction: function () {
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].update();
      // Check if enemy got shot
      for (var j = 0, ll = this.shots.length; j < ll; j++) {
        if (this.shots[j].rectCollision(this.enemies[i])
        ) {
          this.enemies[i].health--;
          if (this.enemies[i].health == 0) {
            this.score++;
            // Add PowerUp
            var r = mathRandom(20);
            if (r < 5) {
              if (r == 0)    // New MultiShot
                this.powerups.push(new Ships.PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 1));
              else        // New ExtraPoints
                this.powerups.push(new Ships.PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 0));
            }
            this.enemies[i].x = mathRandom(canvas.width / 10) * 10;
            this.enemies[i].y = 0;
            this.enemies[i].health = 2;
            this.enemies.push(new Ships.enemy(mathRandom(canvas.width / 10) * 10, 0, 10, 10, 0, 2));
          }
          else {
            this.enemies[i].timer = 1;
          }
          this.shots.splice(j--, 1);
          ll--;
        }
      }
    }
  },

  changeState: function() {
    if (Keyboard.lastPress === Keyboard.KEY_ENTER) {
      if (this.state === 'pause') {
        this.state = 'playing';
      }
      else if (this.state === 'playing') {
        this.state = 'pause';
      }
      else if (this.state === 'over' && Keyboard.lastPress === Keyboard.KEY_ENTER) {
        this.createArena();
        this.state = 'playing';
      }
    }
  },

  createArena: function () {
    this.canvas = null;
    this.ctx = null;
    this.gameover = false;
    this.state = 'playing';
    this.stars = [];
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.enemies = [];
    this.powerups = [];
    this.shots = [];
    this.star = new Image();
    this.gun = new Image();
    this.gun.src = 'assets/gun.png';
    this.star.src = 'assets/star.png';
    this.player = new Ships.player(90, 290, 10, 10, 0, 3);
    this.enemies.push(new Ships.enemy(10, 20, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(30, 20, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(50, 20, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(80, 0, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(100, 0, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(120, 0, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(150, 20, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(170, 20, 10, 10, 0, 2));
    this.enemies.push(new Ships.enemy(190, 20, 10, 10, 0, 2));
  }

}
