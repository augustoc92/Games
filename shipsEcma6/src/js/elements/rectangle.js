export default class Rectangle {
  
  constructor(x, y, width, height) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.width = (width === undefined) ? 0 : width;
    this.height = (height === undefined) ? this.width : height;
  }

  intersects(rect) {
    if (rect === undefined) {
      window.console.warn('Missing parameters on function intersects')
    } else {
      return (this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y
      );
    }
  }
  
  rectCollision(rect) {
    if (rect === undefined) {
      window.console.warn('Missing parameters on function intersects')
    } else {
      return (
        this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y
      );
    }
  }
  
  fill(ctx) {
    if (ctx === undefined) {
      window.console.warn('Missing parameters on function fill')
    } else {
     
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  drawImage(ctx, img) {
    if (img === undefined) {
      window.console.warn('Missing parameters on function drawImage')
    } else {
        if (img.width) {
         ctx.drawImage(img, this.x, this.y);
      } else {
          ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
  }

  drawImageArea(ctx, img, sx, sy, sw, sh) {
    if (img.width) {
      ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    }
      else {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}