'use strict'


var Ships = Ships || {}

Ships.PowerUp = function (x, y, width, height, type, health) {

  this.x = (x === undefined) ? 0 : x
  this.y = (y === undefined) ? 0 : y
  this.width = (width === undefined) ? 0 : width
  this.height = (height === undefined) ? this.width : height
  this.type = (type === undefined) ? 1 : type
  this.health = (health === undefined) ? 1 : health
  this.timer = 0
}

Ships.PowerUp.prototype = {



  render : function(ctx){
    if(this.type == 1) {
      ctx.strokeStyle='#f90'
      this.drawImage(ctx, Ships.Game.gun)
      // ctx.fillStyle = '#f90'
    }
    else {
      ctx.strokeStyle='#cc6'
      this.drawImage(ctx, Ships.Game.star)
      // ctx.fillStyle = '#cc6'
    }
  },

  drawImage: function (ctx, img) {
    if (img === undefined) {
      window.console.warn('Missing parameters on function drawImage')
    }
    else {
      if (img.width) {
        ctx.drawImage(img, this.x, this.y)
      }
      else {
        ctx.strokeRect(this.x, this.y, this.width, this.height)
      }
    }
  },

  drawImageArea: function (ctx, img, sx, sy, sw, sh) {
    if (img.width)
      ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    else
      ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
