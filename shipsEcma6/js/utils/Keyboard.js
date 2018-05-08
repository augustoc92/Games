'use strict'

var Keyboard = {};

Keyboard.pressing = [];
Keyboard.lastPress = null;
Keyboard.x = 0
Keyboard.y = 0
Keyboard.KEY_LEFT = 37
Keyboard.KEY_UP = 38
Keyboard.KEY_RIGHT = 39
Keyboard.KEY_DOWN = 40
Keyboard.KEY_ENTER = 13
Keyboard.KEY_SPACE = 32


Keyboard.listen = function () {

  document.addEventListener('keyup', function (evt) {
    Keyboard.pressing[evt.keyCode] = false

  }, false);

  document.addEventListener('keydown', function (evt) {

    Keyboard.lastPress = evt.keyCode;
    Keyboard.pressing[evt.keyCode] = true;

  }, false)


}
