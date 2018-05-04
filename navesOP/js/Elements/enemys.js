'use strict'


var Ships = Ships || {}

Ships.enemy = function (x, y, width, height, type, health) {

  this.x = (x === undefined) ? 0 : x
  this.y = (y === undefined) ? 0 : y
  this.width = (width === undefined) ? 0 : width
  this.height = (height === undefined) ? width : height
  this.type = (type === undefined) ? 1 :
    this.health = (health === undefined) ? 3 : health
  this.timer = 0
  this.elapsedTime = 0
}

Ships.enemy.prototype = {

  constructor: Ships.player,

  init: function () {



  },

  update: function () {


    // Change Direction:
    this.moveEnemy();


  },

  render: function (ctx) {

    if (this.timer % 2 == 0) {
      ctx.strokeStyle = '#00f';
      this.drawImageArea(ctx, spritesheet, 30, 0, 10, 10);
      // ctx.fillStyle = 'green'
    } else {
      ctx.strokeStyle = '#fff';
      this.drawImageArea(ctx, spritesheet, 40, 0, 10, 10);
      // ctx.fillStyle = 'white'
    }
    // enemies[i].fill(ctx)
  },

  moveEnemy: function () {

  // Player Intersects Enemy
  if(Ships.Game.player.intersects(this) && Ships.Game.player.timer == 0){
    Ships.Game.player.health = Ships.Game.player.health - 1
    Ships.Game.player.timer = 20
  }

    this.y += 2;
    if (this.timer > 0)
      this.timer--
    if (this.y > Ships.Game.canvas.height) {
      this.x = mathRandom(Ships.Game.canvas.width / 10) * 10;
      this.y = 0;

       

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

  drawImageArea: function (ctx, img, sx, sy, sw, sh) {
    if (img.width)
      ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    else
      ctx.strokeRect(this.x, this.y, this.width, this.height);
  },


}



