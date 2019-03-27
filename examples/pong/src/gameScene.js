// import { Scene } from '../../../dist/jinx';
import Hud from './Hud';

export default class GameScene {
    constructor() {
        this.components = this.components.bind(this);
    }

    components() {
        return [ Hud ]
    }
}