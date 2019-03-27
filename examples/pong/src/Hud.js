class HUD {
	constructor(props) {
		this.state = {
			players: [0, 0]
		};
	}
	
	update() {}
	
	// input(keyDown,keyPress,KeyUp) {
	// 	if(keyDown.indexOf(19)>-1){//pause button
	// 		console.log("pause button");
	// 		this.gameEngine.addEvent({name:"GameEngine",message:"pause"});
	// 	}
	// }
	
	// this.EventLisener = function(e){
	// 	var pointEvent = this.gameEngine.getEventInStack("point",true);
	// 	if(pointEvent){
	// 		if(pointEvent.player==1){
	// 			this.playerOneScore++;
	// 		}else{
	// 			this.playerTwoScore++;
	// 		}
	// 	}
	// }
	
	render() {
		const { g } = this.props;
		return () => {
			g.fillStyle = 'black';
			g.font='24px Verdana';
			g.fillText('Test',200,140);
		}

		// g.fillStyle = "black";
		// g.font="24px Verdana";
		// if(this.gameEngine.frameCount<100){
		// 	g.fillText("Ready ",this.gameEngine.getDisplayWidth()/2,this.gameEngine.getDisplayHeight()/2);
		// }else if(this.gameEngine.frameCount>100&&this.gameEngine.frameCount<130){
		// 	g.fillText("GO!! ",this.gameEngine.getDisplayWidth()/2,this.gameEngine.getDisplayHeight()/2);
		// }else{
		// 	g.font="20px Verdana";
		// 	g.fillText(""+this.playerOneScore,10,18);
		// 	g.fillText(""+this.playerTwoScore,this.gameEngine.getDisplayWidth()-15,18);
		// }
	}
}

export default HUD;