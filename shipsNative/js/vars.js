var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_SPACE = 32;
var KEY_W = 87;
var KEY_S = 83;
var KEY_A = 65;
var KEY_D = 68; 
var KEY_E = 69; 

var pressing = [];
var enemies = [];
var canvas = null;
var ctx = null;
var lastPress = null;
var pause = false;
var gameover = true;
var x = 100;
var y = 290;
var dir = 0
var player = 0;
var shots = [];
var score = 0;
var highscores = [];
var posHighscore = 10;
var scenes = [];
var currentScene = 0;
var powerups = [];
var multiShot = 1;;
var messages = [];
var spritesheet = new Image();
var elapsedTime = 0;
var stars = [];
var star = new Image();
var gun = new Image();
