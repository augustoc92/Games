var player = new Rectangle(90, 290, 10, 10, 0, 3)
var player2 = new Rectangle(70, 290, 10, 10, 0, 3)
spritesheet.src = 'assets/spritesheet.png'

//Create game scene
gameScene = new Scene()

gameScene.load = function () {
  score = 0
  multiShot = 1
  shots.length = 0
  enemies.length = 0
  enemies.push(new Rectangle(10, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(60, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(120, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(180, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(-10, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(50, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(110, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(170, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(-20, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(40, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(100, 0, 10, 10, 0, 2))
  enemies.push(new Rectangle(160, 0, 10, 10, 0, 2))
  gameover = false
  pause = false
}
