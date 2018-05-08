'use strict'

var Ships = Ships || {}

window.onload = function () {

  Keyboard.listen()
  Ships.Game = new Ships.Game()
  Ships.Game.init()

}
