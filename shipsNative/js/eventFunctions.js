window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());

document.addEventListener('keydown', function (evt) {
    lastPress = evt.keyCode
    pressing[evt.keyCode] = true
}, false)

document.addEventListener('keyup', function (evt) {
    pressing[evt.keyCode] = false
}, false)

window.addEventListener('load', init, false);
