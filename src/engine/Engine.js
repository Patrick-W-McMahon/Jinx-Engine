

class Engine {
    constructor(props) {
        this.state = {
            scenes: [],
            activeScene: null,
            gx: null
        };
    }

    /**
     * @param {String} name
     * @param {Scene} scene
     */
    registerScene(name, scene) {
        this.state.scenes.push({ name, scene });
    }

    /**
     * @param {String} name
     */
    scene(name) {
        const { scenes, activeScene } = this.state;
        this.state.activeScene = scenes.find(scene => scene.name === name) || activeScene;
    }

    update() {
        
    }
    
    render() {
        const { gx } = this.state;
    }
}