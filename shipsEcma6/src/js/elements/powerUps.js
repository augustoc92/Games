import Rectangle from './rectangle'

export default class PowerUp extends Rectangle{
    constructor(x, y, width, height, type){
      this.x = (x === undefined) ? 0 : x
      this.y = (y === undefined) ? 0 : y
      this.width = (width === undefined) ? 0 : width
      this.height = (height === undefined) ? this.width : height
      this.type = (type === undefined) ? 1 : type
    }
}