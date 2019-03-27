import Jinx, { Scene } from '../../../dist/jinx';
import HUD from './Hud';

class GameScene extends Scene {
    constructor(props) {
        super(props);
    }

    components() {
        return [
            new HUD()
        ]
    }
}