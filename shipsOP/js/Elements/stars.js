'use strict'


var Ships = Ships || {}

Ships.Star = function (x,y) {
        this.x = (x == null) ? 0 : x
        this.y = (y == null) ? 0 : y
}


Ships.Star.prototype = {
    constructor: Ships.Star,
    
      init: function () {
    this.y++
    if(this.y>canvas.height) {
      this.y=0
    }
      },

      update : function(){
            
        this.moveStars();
      
    },

      moveStars: function (){
            // Move Stars
            // this.y++
            // if(this.y>canvas.height) {
            //   this.y=0
            // }
  
      },
  
  render: function(ctx){

   // Draw Stars
  ctx.fillStyle='#fff';
    ctx.fillRect(this.x,this.y,1,1);
  
},

}