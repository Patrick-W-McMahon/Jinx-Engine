// import Display from './Display';

export default class Engine {
    constructor(props) {
        console.log('props',props);
        this.state = {
            scenes: [],
            activeScene: null,
            gx: null,
            running: true,
            frameCount: 0
        };
        // this.loop = this.loop.bind(this);
        // this.registerScene = this.registerScene.bind(this);
        // this.loop();
    }

    /**
     * @param {String} name
     * @param {Scene} scene
     */
    registerScene(name, scene) {
        console.log("register");
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
        const { activeScene, scenes } = this.state;
        console.log("scenes", scenes);
        // const myScene = scenes.find(scene => scene.name === activeScene);
        // if(activeScene !== null && typeof myScene.scene.components === 'function') {
        //     const components = myScene.scene.components;
        //     console.log("hello?");
        //     components.forEach(cmp => {
        //         if(typeof cmp.update === 'function') {
        //             cmp.update();
        //         }
        //     });
        // } else {
        //     console.log("active scene missing components prop", activeScene);
        // }
    }
    
    render() {
        const { gx } = this.state;

    }

    loop() {
        const { running, frameCount } = this.state;
        console.log("loop", frameCount);
        this.state.frameCount++;

        this.update();

        if(running) {
            window.requestAnimationFrame(this.loop);
        }
    }
}