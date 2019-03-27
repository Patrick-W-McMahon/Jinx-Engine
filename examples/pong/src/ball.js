class Ball {
	constructor(props) {
		super(props);
		this.state = {
			radius: 8,
			x: props.x,
			y: props.y,
			direction: props.direction,
			speed: props.speed
		};
		this.resetBall();
	}
	
	resetBall() {
		// this.state.x = this.gameEngine.getDisplay("widthCenter");
		// this.state.y = this.gameEngine.getDisplay("heightCenter"); 
		// this.state.direction = Math.randomNumberRange(0,360);
	}
	
	getAngle(pt3, pt2, pt1) {
		var dx1 = pt1.x - pt2.x;
		var dy1 = pt1.y - pt2.y;
		var dx2 = pt3.x - pt2.x;
		var dy2 = pt3.y - pt2.y;
		var a1 = Math.atan2(dy1, dx1);
		var a2 = Math.atan2(dy2, dx2);
		return parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;
	}
	
	update() {
		if(this.gameEngine.frameCount>100){
			var oldX=this.x;
			var oldY=this.y;
			this.y = Math.findYofCircleByDegrees(this.y,speed,this.direction);
			this.x = Math.findXofCircleByDegrees(this.x,speed,this.direction);
			if(this.x<0){
				this.gameEngine.addEvent({name:"point",player:2});
				this.resetBall();
				/*
				this.x=0;
				var wallX = 0;
				var wallY = Math.findYofCircleByDegrees(this.y,speed,this.direction);
				this.direction = Math.AngleOfReflection(Math.angleOfTwoLines(this.x,this.y,wallX,wallY));
				*/
			}
			if(this.x+this.radius>this.gameEngine.getDisplayWidth()){
				this.gameEngine.addEvent({name:"point",player:1});
				this.resetBall();
				/*
				var v=this.direction;
				var n=90;
				var u = (v*n/n*n)*n;
				var w=v-u;
				this.direction=w;
				*/
				//this.direction = 2 * (90 - this.direction) + 180;
			}
			if(this.y<0){
				this.y=0;
				var wallX = 0;
				var wallY = Math.findYofCircleByDegrees(this.y,speed,this.direction);
				this.direction = Math.AngleOfReflection(Math.angleOfTwoLines(this.x,this.y,wallX,wallY));
			}
			if(this.y+this.radius>this.gameEngine.getDisplayHeight()){
				var v=this.direction;
				var n=90;
				var u = (v*n/n*n)*n;
				var w=v-u;
				this.direction=w;
				//this.direction = 2 * (90 - this.direction) + 180;
			}
			var errorBuffer = 3;
			if(this.x<-errorBuffer||this.y<-errorBuffer||this.x>this.gameEngine.getDisplay("width")+errorBuffer||this.y>this.gameEngine.getDisplay("height")+errorBuffer){
				this.x = this.gameEngine.getDisplay("widthCenter");
				this.y = this.gameEngine.getDisplay("heightCenter"); 
				this.direction = Math.randomNumberRange(0,360);
			}
		}
		
	}
	
	render() {
		const { g } = this.props;
		const { x, y, radius } = this.state;
		g.fillStyle = "black";
		g.beginPath();
		g.arc(x, y, radius, 0, 2 * Math.PI);
		g.fill();
	}
}