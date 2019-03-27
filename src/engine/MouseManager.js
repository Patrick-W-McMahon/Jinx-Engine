

class MouseManager {
    constructor(props) {
        super(props);
        this.display;
        this.mouseEvt;
    }

    update(mouseEvt) {

    }

    getMouse() {
        
    }

    ScreenPosition() {
        const { left, top } = this.display.getBoundingClientRect();
        const { clientX, clientY } = this.mouseEvt;
        return {
            x: clientX - left,
            y: clientY - top
        };
    }
}

export default MouseManager;