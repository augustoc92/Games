
const paintHighScoresScene = (ctx, highscores) => {
    // Clean canvas
    let posHighscore = 10;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw title
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', 100, 20);
    ctx.fillText('HIGH SCORE', 100, 40);
    // Draw high scores
    ctx.textAlign = 'right';
    for (let i = 0, l = highscores.length; i < l; i += 1) {
      if (i === posHighscore) {
          ctx.fillText('->   ' + highscores[i], 100, 60 + i * 10);
      }
      else {
          ctx.fillText(highscores[i], 100, 60 + i * 10);
      }
    }
  };
  
  export { paintHighScoresScene };

  