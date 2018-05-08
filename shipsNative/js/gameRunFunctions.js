function repaint() {
    window.requestAnimationFrame(repaint);
    if (scenes.length) {
      scenes[currentScene].paint(ctx)
    }
}

function run() {
    setTimeout(run, 50);
    if (scenes.length) {
      scenes[currentScene].act(0.05)
    }
}

function init() {
    // Get canvas and context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Load assets
    gun.src = 'assets/gun.png'
    star.src = 'assets/star.png'

    // Load saved highscores
    if (localStorage.highscores) {
      highscores = localStorage.highscores.split(',');
    }

    // Create the stars
    for(i=0;i<200;i++){
      stars.push(new Star(random(canvas.width),random(canvas.height)))
    }

    // Start game
    run();
    repaint();
}
