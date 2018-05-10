
const paintMainScene = (ctx) =>{
 // Clean canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw title
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText('SHIPS', 100, 125);
  ctx.fillText('Press Enter', 100, 175);
}

export { paintMainScene };