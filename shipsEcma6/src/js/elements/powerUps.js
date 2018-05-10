import Rectangle from './rectangle'

export default class PowerUp extends Rectangle{

    constructor(x, y, width, height, type){
      super(x, y, width, height);
      this.type = (type === undefined) ? 1 : type;
    }

    render(ctx ,gun ,star) {
      if(this.type == 1) {
        ctx.strokeStyle='#f90';
        this.drawImage(ctx, gun);
        // ctx.fillStyle = '#f90'
      }
      else {
        ctx.strokeStyle='#cc6';
        this.drawImage(ctx, star);
        // ctx.fillStyle = '#cc6'
      }
    }
}