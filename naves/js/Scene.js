function Scene() {
  this.id = scenes.length
  scenes.push(this)
}

Scene.prototype = {
  constructor: Scene,
  load: function () {},
  paint: function (ctx) {},
  act: function () {}
}

function loadScene(scene) {
  currentScene = scene.id
  scenes[currentScene].load()
}
