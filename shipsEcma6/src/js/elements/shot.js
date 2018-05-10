import Rectangle from './rectangle';
import { KeyBoard } from '../utils/Keyboard';

export default class Shot extends Rectangle {

    constructor( x, y, width, height ){
        super( x, y, width, height );
        this.timer = 0;
    }

    update(){
        this.moveShots();
    }

    moveShots() {
        this.y -= 10;
    }
}

