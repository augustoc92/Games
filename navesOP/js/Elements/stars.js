'use strict'


var Ships = Ships || {}

Ships.Star = function (x,y) {
        this.x = (x == null) ? 0 : x
        this.y = (y == null) ? 0 : y
}


Ships.Star.prototype = {
    constructor: Ships.Star,
    
      init: function () {
    
      },
  
  render: function(ctx){

   // Draw Stars
  ctx.fillStyle='#fff';
    ctx.fillRect(this.x,this.y,1,1);
  
},

}