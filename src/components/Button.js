// import GameObject from '../GameObject';

class Button {
    constructor(props) {
        const { x, y, h, w, hoverColor, baseColor, borderColor } = props;
        this.state = {
            x, y, h, w,
            style: {
                hover: hoverColor,
                base: baseColor,
                border: borderColor,
                font: `24px Verdana`
            },
            hover: false,
            delay: 30,
            delayCounter: 0,
            id: props.id,
            text: props.text,
            cursorBox: null
        };
    }
	
	init() {
		
	}
	
	update() {
        const {} = this.state;
        if(delayCounter > 0) {
            this.state.delayCounter--;
            return;
        }
        this.mousePos = this.gameEngine.getEventInStack("cursor",false);
        this.cursorBox={
            x:this.mousePos.x,
            y:this.mousePos.y,
            height:2,
            width:2
        }
        if(this.gameEngine.collitionDetection(this.cursorBox,this.buttionPos)){
            this.buttonHover=true;
            if(this.mousePos.left){
                this.gameEngine.addEvent({name:this.buttonId,clicked:true});
                this.delayCounter=this.delay;
            }
        } else {
            this.buttonHover=false;
        }
		
	}
	
	render() {
        const { x, y, h, w, style, text } = this.state;
        const { border, hover, base, font } = style;
        const { g } = this.props;
		g.beginPath();
		g.strokeStyle=border;
        g.font=font;
        g.fillStyle = hover ? hover : base;
		g.rect(x,y,w,h);
		g.fill();
		g.stroke();
		g.closePath();
		g.fillStyle=font;
		g.fillText(`${text}`,x+30,y+35);
	}

}

export default Button;