function random(max) {
  return ~~(Math.random() * max)
}

function addHighscore(score) {
  posHighscore = 0
  while (highscores[posHighscore] > score && posHighscore < highscores.length) {
    posHighscore += 1
  }
  highscores.splice(posHighscore, 0, score)
  if (highscores.length > 10) {
    highscores.length = 10
  }
  localStorage.highscores = highscores.join(',')
}

function Message(string, x, y) {
  this.string = (string == null) ? '?' : string
  this.x = (x == null) ? 0 : x
  this.y = (y == null) ? 0 : y
}

function Star(x, y) {
  this.x = (x == null) ? 0 : x
  this.y = (y == null) ? 0 : y
}
