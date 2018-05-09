class Keyboard {

   constructor() {
    this.pressing = [];
    this.lastPress = null;
    this.x = 0;
    this.y = 0;
    this.KEY_LEFT = 37;
    this.KEY_UP = 38;
    this.KEY_RIGHT = 39;
    this.KEY_DOWN = 40;
    this.KEY_ENTER = 13;
    this.KEY_SPACE = 32;
  }
 
  listen() {
   
    document.addEventListener('keyup', evt => {
      this.pressing[evt.keyCode] = false;
    }, false);
    document.addEventListener('keydown', evt => {
      this.lastPress = evt.keyCode;
      this.pressing[evt.keyCode] = true;
    }, false);
  }
}

export const KeyBoard = new Keyboard();