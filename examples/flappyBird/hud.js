function HUD(){
	this.gameEngine;
	this.playerOneScore=0;
	this.mousePos;
	this.gameState;
	var screenHeight;
	var screenWidth;
	var screenHeightHalf;
	var screenWidthHalf;
	var game_over_sign, score_board;

	this.init = function(e){
		this.gameEngine = e;
	}
	
	this.update = function(){
		this.mousePos = this.gameEngine.getEventInStack("cursor",false);
		this.gameState = this.gameEngine.getEventInStack("gameover",false);
		screenHeight = this.gameEngine.getDisplayHeight();
		screenWidth = this.gameEngine.getDisplayWidth();
		screenHeightHalf = screenHeight/2;
		screenWidthHalf = screenWidth/2;
		game_over_sign={
			x:screenWidthHalf-100,
			y:screenHeightHalf-40,
			width:screenWidthHalf-180,
			height:screenHeightHalf-100,
			textX:screenWidthHalf-80,
			textY:screenHeightHalf
		}
		score_board={
			x:screenWidthHalf-80,
			y:screenHeightHalf+40
		}
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
			g.fillRect(game_over_sign.x,game_over_sign.y,game_over_sign.width,game_over_sign.height);
			g.fillStyle = "white";
			g.fillText("Game Over",game_over_sign.textX,game_over_sign.textY);
			g.font="24px Verdana";
			g.fillText("Score: "+this.playerOneScore,score_board.x,score_board.y);
		}
	}
}
