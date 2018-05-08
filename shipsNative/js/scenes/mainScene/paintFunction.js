//Create paint function

mainScene.paint = function (ctx) {
  // Clean canvas
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw Stars
  ctx.fillStyle='#fff';
  for(i=0,l=stars.length;i<l;i++){
    ctx.fillRect(stars[i].x,stars[i].y,1,1);
  }

  // Draw title
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.fillText('SHIPS', 100, 125)
  ctx.fillText('Press Enter', 100, 175)
}
