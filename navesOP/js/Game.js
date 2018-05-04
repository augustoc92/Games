'use strict'

var Ships = Ships || {};
var spritesheet = new Image();
spritesheet.src = 'assets/spritesheet.png'

//This is the constructor
Ships.Game = function () {

}

Ships.Game.prototype = {

  constructor: Ships.Game,

  init: function () {

    this.canvas = null;
    this.ctx = null
    this.score = 0;
    this.gameover = false;
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
    this.state = 'playing'
    this.player = new Ships.player(90, 290, 10, 10, 0, 3);
    this.enemies = []
    this.enemies.push(new Ships.enemy(10, 20, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(30, 20, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(50, 20, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(80, 0, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(100, 0, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(120, 0, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(150, 20, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(170, 20, 10, 10, 0, 2))
    this.enemies.push(new Ships.enemy(190, 20, 10, 10, 0, 2))

    this.Star = new Image()
    this.stars = []

    this.shots = []
    this.update()
    this.createArena()


  },

  update: function () {

    this.render()

    this.changeState()

    this.resume()

    this.pause()

    setTimeout((this.update.bind(this)), 40)

  },


  pause: function () {

    Keyboard.lastPress = null

  },


  render: function () {

    //Canvas:
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Score
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'left'
    this.ctx.fillText('Score: ' + this.score, 10, 20)
    //Player
    this.player.render(this.ctx)

    // Enemies
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].render(this.ctx)
    }
    // Shots
    for (var i = 0, l = this.shots.length; i < l; i++) {
      this.shots[i].render(this.ctx)
    }
    // Stars
    for (var i = 0; i < 200; i++) {
      this.stars.push(new Ships.Star(mathRandom(canvas.width), mathRandom(canvas.height)))
      this.stars[i].render(this.ctx);
    }





    //Pause:
    if (this.state === 'pause') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('PAUSE', 150, 75);
      this.ctx.textAlign = 'left';
    }

    //Game Over:
    if (this.state === 'over') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('GAME OVER', 150, 75);
      this.ctx.textAlign = 'left';
    }

  },

  resume: function () {

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
          this.shots.splice(i--, 1)
          l--
        }
      }

    }

  },

  enemyAction: function () {
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].update();
      // Check if enemy got shot
      for (var j = 0, ll = this.shots.length; j < ll; j++) {

        if (
          this.shots[j].rectCollision(this.enemies[i])
        ) {
          this.enemies[i].health--
          if (this.enemies[i].health == 0) {
            this.score++
            this.enemies[i].x = mathRandom(canvas.width / 10) * 10
            this.enemies[i].y = 0
            this.enemies[i].health = 2
            this.enemies.push(new Ships.enemy(mathRandom(canvas.width / 10) * 10, 0, 10, 10, 0, 2))
          }
          else {
            this.enemies[i].timer = 1
          }
          this.shots.splice(j--, 1)
          ll--
        }
      }
    }
  },

  changeState: function () {

    if (Keyboard.lastPress === Keyboard.KEY_ENTER) {

      if (this.state === 'pause') {
        this.state = 'playing'

      }
      else if (this.state === 'playing') {

        this.state = 'pause'

      }

      else if (this.state === 'over') {

        this.die()

      }

    }

  },



  createArena: function () {

    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    /*    this.walls = new Array()
        this.walls.push(new Snake.Wall(100, 50, 10, 10))
        this.walls.push(new Snake.Wall(100, 100, 10, 10))
        this.walls.push(new Snake.Wall(200, 50, 10, 10))
        this.walls.push(new Snake.Wall(200, 100, 10, 10))
    */
  }

}
