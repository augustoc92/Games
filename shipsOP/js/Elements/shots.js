'use strict'


var Ships = Ships || {}

Ships.Shot = function (x, y, width, height, type, health) {

    this.x = (x === undefined) ? 0 : x
    this.y = (y === undefined) ? 0 : y
    this.width = (width === undefined) ? 0 : width
    this.height = (height === undefined) ? width : height
    this.type = (type === undefined) ? 1 : type
        this.health = (health === undefined) ? 3 : health
    this.timer = 0
    this.elapsedTime = 0
}


Ships.Shot.prototype = {


    update: function () {

        // Change Direction:
        this.moveShots()
    
    },

    drawImageArea: function (ctx, img, sx, sy, sw, sh) {
        if (img.width)
            ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        else
            ctx.strokeRect(this.x, this.y, this.width, this.height);

    },
    render: function (ctx) {
        // Shots
        ctx.fillStyle = '#f00'

        // shots[i].fill(ctx)
        // shots[i].drawImageArea(ctx,spritesheet,70,0,5,5);
        this.drawImageArea(ctx, spritesheet, 70, (~~(this.elapsedTime * 10) % 2) * 5, 5, 5)
    },

    rectCollision: function (rect) {
        if (rect === undefined) {
          window.console.warn('Missing parameters on function intersects')
        }
        else {
          return (
            this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y
          )
        }
      },

    moveShots: function () {
            this.y -= 10
            },
    }




