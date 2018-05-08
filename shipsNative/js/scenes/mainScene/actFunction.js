//Create act function

mainScene.act = function () {
  // Load next scene
  if (lastPress === KEY_ENTER) {
      loadScene(highScoresScene)
      lastPress = null
  }

  // Move Stars
  for(i=0,l=stars.length;i<l;i++){
    stars[i].y++
    if(stars[i].y>canvas.height) {
      stars[i].y=0
    }
  }
}
