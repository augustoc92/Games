'use strict'


var Ships = Ships || {}

Ships.player = function (x, y, width, height, type, health) {

  this.x = (x === undefined) ? 0 : x
  this.y = (y === undefined) ? 0 : y
  this.width = (width === undefined) ? 0 : width
  this.height = (height === undefined) ? width : height
  this.type = (type === undefined) ? 1 :
  this.health = (health === undefined) ? 3 : health
  this.timer = 0
  this.elapsedTime = 0
  this.multiShot = 0
  // this.iBody = new Image()
  // this.iBody.src = './assets/body.png'
}

Ships.player.prototype = {

  constructor: Ships.player,

  init: function () {

  },

  update: function () {


    // Change Direction:
    this.checkKeyboard()

    this.checkStatus()

  },

  render: function (ctx) {

    // Draw Body:


    this.drawImageArea(ctx, spritesheet, (~~(this.elapsedTime) % 3) * 10, 0, 10, 10)

  },



  drawImageArea: function (ctx, img, sx, sy, sw, sh) {
    if (img.width)
      ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    else
      ctx.strokeRect(this.x, this.y, this.width, this.height);
  },

  checkStatus: function () {

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
      Ships.Game.gameover = true;
      Ships.Game.state = 'over';
      // addHighscore(Ships.Game.score)
    }
  },

  intersects: function (rect) {
    if (rect === undefined) {
      window.console.warn('Missing parameters on function intersects')
    }
    else {
      return (this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y)
    }
  },

  checkKeyboard: function () {

    if (Keyboard.pressing[Keyboard.KEY_UP]) {
      this.y -= 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_RIGHT]) {
      this.x += 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_DOWN]) {
      this.y += 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_LEFT]) {
      this.x -= 10;
    }

    if (Keyboard.lastPress == Keyboard.KEY_SPACE) {
      if (this.multiShot == 3) {
        Ships.Game.shots.push(new Ships.Shot(this.x, this.y, 5, 5))
        Ships.Game.shots.push(new Ships.Shot(this.x + 5, this.y, 5, 5))
        Ships.Game.shots.push(new Ships.Shot(this.x + 9, this.y + 2, 5, 5))
      }
      else if (this.multiShot == 2) {
        Ships.Game.shots.push(new Ships.Shot(this.x, this.y, 5, 5))
        Ships.Game.shots.push(new Ships.Shot(this.x + 5, this.y, 5, 5))
      }
      else {
        Ships.Game.shots.push(new Ships.Shot(this.x + 3, this.y, 5, 5))
      }
      Keyboard.lastPress = null
    }


  },



}
