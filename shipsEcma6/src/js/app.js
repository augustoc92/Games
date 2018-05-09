import { KeyBoard } from './utils/Keyboard.js';
import Game from './Game';

window.onload = () => {
    const game = new Game();
    KeyBoard.listen();
    game.init();
}   
