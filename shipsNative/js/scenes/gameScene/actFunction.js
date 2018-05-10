gameScene.act = function (deltaTime) {
  if (!pause) {
    // GameOver Reset
    if (gameover) {
      loadScene(highScoresScene);
    }
    // Move Stars
    for (i = 0, l = stars.length; i < l; i++) {
      stars[i].y++;
      if (stars[i].y > canvas.height) {
        stars[i].y = 0;
      }
    }
    // Move Player
    if (pressing[KEY_UP]) {
      player.y -= 10;
    }
    if (pressing[KEY_RIGHT]) {
       player.x += 10;
    } 
    if (pressing[KEY_DOWN]) {
      player.y += 10;
    }
    if (pressing[KEY_LEFT]) {
      player.x -= 10;
    }
    // Move Player2
    if (pressing[KEY_W]) {
      player2.y -= 10;
    }
    if (pressing[KEY_D]) {
      player2.x += 10;
    }
    if (pressing[KEY_S]) {
      player2.y += 10;
    }
    if (pressing[KEY_A]) {
      player2.x -= 10;
    }
    // Move Enemies
    for (var i = 0, l = enemies.length; i < l; i++) {
      enemies[i].y += 2;
      if (enemies[i].timer > 0)
        enemies[i].timer--;
      if (enemies[i].y > canvas.height) {
        enemies[i].x = random(canvas.width / 10) * 10;
        enemies[i].y = 0;
      }
      // Player Intersects Enemy
      if (player.intersects(enemies[i]) && player.timer == 0) {
        player.health = player.health - 1;
        player.timer = 20;
      }
      // Shot Intersects Enemy
      for (var j = 0, ll = shots.length; j < ll; j++) {
        if (shots[j].rectCollision(enemies[i])) {
          enemies[i].health--;
          if (enemies[i].health == 0) {
            score++
            // Add PowerUp
            var r = random(20);
            if (r < 5) {
              if (r == 0)    // New MultiShot
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 1));
              else        // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 0));
            }
            enemies[i].x = random(canvas.width / 10) * 10;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 10) * 10, 0, 10, 10, 0, 2));
          }
          else {
            enemies[i].timer = 1;
          }
          shots.splice(j--, 1);
          ll--;
        }
      }
    }
    // Move PowerUps
    for (var i = 0, l = powerups.length; i < l; i++) {
      powerups[i].y += 5
      // Powerup Outside Screen
      if (powerups[i].y > canvas.height) {
        powerups.splice(i--, 1)
        l--;
        continue;
      }
      // Player intersects
      if (player.intersects(powerups[i])) {
        if (powerups[i].type == 1) { // MultiShot
          if (multiShot < 3) {
            multiShot++;
            messages.push(new Message('MULTI', player.x - (player.width / 2), player.y - 15))
          }
          else {
            score += 5;
            messages.push(new Message('+5', player.x - (player.width / 2), player.y - 15))
          }
        }
        else { // ExtraPoints
          score += 5;
          messages.push(new Message('+5', player.x - (player.width / 2), player.y - 15))
        }
        powerups.splice(i--, 1);
        l--;
      }
      // Player 2 intersects
      if (player2.intersects(powerups[i])) {
        if (powerups[i].type == 1) { // MultiShot
          if (multiShot < 3) {
            multiShot++;
            messages.push(new Message('MULTI', player2.x - (player2.width / 2), player2.y - 15))
          }
          else {
            score += 5;
            messages.push(new Message('+5', player2.x - (player2.width / 2), player2.y - 15))
          }
        }
        else { // ExtraPoints
          score += 5;
          messages.push(new Message('+5', player2.x - (player2.width / 2), player2.y - 15))
        }
        powerups.splice(i--, 1);
        l--;
      }
    }
    // Timer
    if (player.timer > 0) {
      player.timer = player.timer - 1
    }
    if (player2.timer > 0) {
      player2.timer = player2.timer - 1
    }
    if (player.health == 0 && player2.health == 0) {
      gameover = true;
      pause = true;
      addHighscore(score)
    }
    //walls player 1
    if (player.x > canvas.width - 10) {
      player.x = canvas.width - 10;
    }
    if (player.x < 0) {
      player.x = 0
    }
    if (player.y > canvas.height - 10) {
      player.y = canvas.height - 10;
    }
    if (player.y < 0) {
      player.y = 0
    }
    //walls player 2
    if (player2.x > canvas.width - 10) {
      player2.x = canvas.width - 10;
    }
    if (player2.x < 0) {
      player2.x = 0
    }
    if (player2.y > canvas.height - 10) {
      player2.y = canvas.height - 10;
    }
    if (player2.y < 0) {
      player2.y = 0
    }
    // New Shot
    if (lastPress == KEY_SPACE) {
      if (multiShot == 3) {
        shots.push(new Rectangle(player.x, player.y, 5, 5))
        shots.push(new Rectangle(player.x + 5, player.y, 5, 5))
        shots.push(new Rectangle(player.x + 9, player.y + 2, 5, 5))
      }
      else if (multiShot == 2) {
        shots.push(new Rectangle(player.x, player.y, 5, 5))
        shots.push(new Rectangle(player.x + 5, player.y, 5, 5))
      }
      else {
        shots.push(new Rectangle(player.x + 3, player.y, 5, 5))
      }
      lastPress = null
    }
    //New shot player 2
    if (lastPress == KEY_E) {
      if (multiShot == 3) {
        shots.push(new Rectangle(player2.x, player2.y, 5, 5))
        shots.push(new Rectangle(player2.x + 5, player2.y, 5, 5))
        shots.push(new Rectangle(player2.x + 9, player2.y + 2, 5, 5))
      }
      else if (multiShot == 2) {
        shots.push(new Rectangle(player2.x, player2.y, 5, 5))
        shots.push(new Rectangle(player2.x + 5, player2.y, 5, 5))
      }
      else {
        shots.push(new Rectangle(player2.x + 3, player2.y, 5, 5))
      }
      lastPress = null
    }
    // Move Shots
    for (var i = 0, l = shots.length; i < l; i++) {
      shots[i].y -= 10
      if (shots[i].y < 0) {
        shots.splice(i--, 1)
        l--
      }
    }
    // Elapsed time
    elapsedTime += deltaTime;
    if (elapsedTime > 3600) {
      elapsedTime -= 3600;
    }
    // Move Messages
    for (var i = 0, l = messages.length; i < l; i++) {
      messages[i].y += 2
      if (messages[i].y < canvas.height - 40) {
        messages.splice(i--, 1);
        l--;
      }
    }
  }
   // Pause/Unpause
  if (lastPress == KEY_ENTER) {
    pause = !pause;
    lastPress = null;
  }
}
