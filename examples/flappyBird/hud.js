function HUD(){
	this.gameEngine;
	this.playerOneScore=0;
	this.mousePos;
	this.gameState;

	this.init = function(e){
		this.gameEngine = e;
	}
	
	this.update = function(){
		this.mousePos = this.gameEngine.getEventInStack("cursor",false);
		this.gameState = this.gameEngine.getEventInStack("gameover",false);
	}
	
	this.input = function(keyDown,keyPress,KeyUp){
		if(keyDown.indexOf(19)>-1){//pause button
			console.log("pause button");
			this.gameEngine.addEvent({name:"GameEngine",message:"pause"});
		}
	}
	
	this.EventLisener = function(e){
		var pointEvent = this.gameEngine.getEventInStack("point",true);
		if(pointEvent){
			if(pointEvent.player==1){
				this.playerOneScore++;
			}
		}
	}
	
	this.draw = function(g){
		g.fillStyle = "black";
		g.font="20px Verdana";
		g.fillText("Score: "+this.playerOneScore,10,18);
		if(this.gameState){
			g.font="32px Verdana";
			g.fillStyle = "black";
			g.fillRect((this.gameEngine.getDisplayWidth()/2)-100,(this.gameEngine.getDisplayHeight()/2)-40,(this.gameEngine.getDisplayWidth()/2)-180,(this.gameEngine.getDisplayHeight()/2)-100);
			g.fillStyle = "white";
			g.fillText("Game Over",(this.gameEngine.getDisplayWidth()/2)-80,this.gameEngine.getDisplayHeight()/2);
			g.font="24px Verdana";
			g.fillText("Score: "+this.playerOneScore,(this.gameEngine.getDisplayWidth()/2)-80,(this.gameEngine.getDisplayHeight()/2)+40);
		}
	}
}
