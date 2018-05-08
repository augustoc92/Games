gameScene.paint = function (ctx) {
    // Clean canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Stars
    ctx.fillStyle='#fff';
    for(i=0,l=stars.length;i<l;i++){
      ctx.fillRect(stars[i].x,stars[i].y,1,1);
    }

    // Draw player
    ctx.fillStyle = 'blue'
    if(player.timer % 2 == 0)
      player.drawImageArea(ctx,spritesheet,(~~(elapsedTime*10)%3)*10,0,10,10);
      // player.drawImageArea(ctx,spritesheet,0,0,10,10)
      //player.fill(ctx);

    // Draw player 2
    ctx.fillStyle = 'blue'
    if(player2.timer % 2 == 0)
      player2.drawImageArea(ctx,spritesheet,(~~(elapsedTime*10)%3)*10,0,10,10);

    // Debug last key pressed
    ctx.fillStyle = '#fff'
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);

    // Shots
    ctx.fillStyle='#f00'
    for(var i=0,l=shots.length;i<l;i++)
      // shots[i].fill(ctx)
      // shots[i].drawImageArea(ctx,spritesheet,70,0,5,5);
      shots[i].drawImageArea(ctx,spritesheet,70,(~~(elapsedTime*10)%2)*5,5,5);

    // PowerUp
    for(var i=0,l=powerups.length;i<l;i++){
      if(powerups[i].type == 1) {
        ctx.strokeStyle='#f90'
        powerups[i].drawImage(ctx, gun)
        // ctx.fillStyle = '#f90'
      }
      else {
        ctx.strokeStyle='#cc6'
        powerups[i].drawImage(ctx, star)
        // ctx.fillStyle = '#cc6'
      }
      // powerups[i].fill(ctx);
    }

    // Enemies
     for(var i=0,l=enemies.length;i<l;i++) {
      if (enemies[i].timer % 2 == 0) {
        ctx.strokeStyle='#00f';
        enemies[i].drawImageArea(ctx,spritesheet,30,0,10,10);
        // ctx.fillStyle = 'green'
      } else {
        ctx.strokeStyle='#fff';
        enemies[i].drawImageArea(ctx,spritesheet,40,0,10,10);
        // ctx.fillStyle = 'white'
      }
      // enemies[i].fill(ctx)
    }

    ctx.fillStyle='#fff';
    for(var i=0,l=messages.length;i<l;i++) {
      ctx.fillText(messages[i].string, messages[i].x, messages[i].y)
    }

    // Draw score
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'left'
    ctx.fillText('Score: ' + score, 10, 20)

    // Health
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'left'
    ctx.fillText('Lives: ' + player.health, canvas.width - 45, 20)

    // Health2
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'left'
    ctx.fillText('Lives 2: ' + player2.health, canvas.width - 45, 40)

   // Draw pause
   if (pause) {
    ctx.fillStyle='white'
    ctx.textAlign = 'center'
    if (gameover) {
      ctx.fillText('GAME OVER', 100, 150)
    }
     else {
       ctx.fillText('PAUSE', 100, 150)
     }
   }

}
