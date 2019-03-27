import SubSystem from './SubSystem';

class Cursor extends SubSystem {
	constructor(props) {
		super(props);
		this.state = {
			displayType: 'crosshair'
		};
	}

	// this.gameEngine;
	// this.mousePos;
	// this.type=t;
	// this.img;
	// this.imgSrc;
	
	update() {
		this.mousePos=this.gameEngine.getMouse();
		this.gameEngine.getEventInStack('cursor',true);
		this.gameEngine.addEvent({name:'cursor',x:this.mousePos.x,y:this.mousePos.y,left:this.mousePos.left});
		if(this.type==='image'){
			this.img  = new Image();
			this.img.src = this.imgSrc;
		}
	}
	
	drawCrossHair() {
		const { g } = this.props;
		const { mouse } = this.props;
		const { x, y, left } = mouse;
		var crossSize = 10;
		const dColor = left ? 'red' : 'black';
		g.fillStyle = dColor;
		g.strokeStyle = dColor;
		g.lineWidth = 2;
		g.beginPath();
		g.moveTo(x - crossSize, y);
		g.lineTo(x + crossSize, y);
		g.stroke();
		g.closePath();
		g.beginPath();
		g.moveTo(x, y - crossSize);
		g.lineTo(x, y + crossSize);
		g.stroke();
		g.closePath();
	}
	
	drawDefault(){
		const { g } = this.props;
		g.fillStyle = "white";
		g.strokeStyle="black";
		g.lineWidth = 1.5;
		g.beginPath();
		g.moveTo(this.mousePos.x,this.mousePos.y);
		g.lineTo(this.mousePos.x+13,this.mousePos.y);
		g.lineTo(this.mousePos.x+8,this.mousePos.y+5);
		g.lineTo(this.mousePos.x+15,this.mousePos.y+10);
		g.lineTo(this.mousePos.x+12,this.mousePos.y+13);
		g.lineTo(this.mousePos.x+5,this.mousePos.y+7);
		g.lineTo(this.mousePos.x,this.mousePos.y+12);
		g.closePath();
		g.fill();
		g.stroke();
	}
	
	render() {
		const { g } = this.props;
		switch(this.type){
			case "crosshair":
				this.drawCrossHair();
			break;
			case "image":
				g.drawImage(this.img,this.mousePos.x,this.mousePos.y,40,40);
			break;
			default:
				this.drawDefault();
			break;
		}
	}

}