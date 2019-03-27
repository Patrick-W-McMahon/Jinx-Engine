
export default class Display {
    constructor(props) {
        this.state = {
            displayElm: null,
            contextType: '2d',
            ctx: null,
            dpr: window.devicePixelRatio || 1,
            bsr: this.getBSR(),
            gfx: null
        };

        this.init = this.init.bind(this);
        this.getPixelRatio = this.getPixelRatio.bind(this);
        this.init(props);
    }

    init(props) {

    }

    setDisplay(canvasId) {
        const displayDomId = document.getElementById(canvasId);
		const ratio = this.getPixelRatio();
		const { width: w, height: h } = displayDomId.width;
		displayDomId.width = w*ratio;
		displayDomId.height = h*ratio;
		displayDomId.style.width = w+"px";
		displayDomId.style.height = h+"px";
        this.state.displayElm = displayDomId;
        this.state.ctx = displayDomId.getContext(this.state.contextType);
    }

    getBSR() {
        return ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    }

    createDisplay(targetElmId) {
        if(targetElmId) {
            this.state.displayElm = document.getElementById(targetElmId).createElement("canvas");
        } else {
            this.state.displayElm = document.createElement("canvas");
        }
        this.state.ctx = this.state.displayElm.getContext(this.state.contextType);
    }

    getPixelRatio() {
        const { dpr, bsr } = this.state;
		return dpr / bsr;
    }

    getDisplayData(){
        const { height, width } = this.state.displayElm;
        return {
            heightCenter: height/2,
            widthCenter: width/2,
            height,
            width
        };
    }
    
    clear(g) {
		g.clearRect(0,0,g.canvas.width,g.canvas.height);
		//g.clearRect (0,0,this.getDisplayWidth(),this.getDisplayHeight());
    }
    
    render(g) {
        this.clear(g);
    }

}