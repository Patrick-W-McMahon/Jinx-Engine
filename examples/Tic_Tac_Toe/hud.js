function HUD(){
	this.gameEngine;
	this.playerOneScore=0;
	this.playerTwoScore=0;
	this.mousePos;

	this.init = function(e){
		this.gameEngine = e;
	}
	
	this.update = function(){
		this.mousePos=this.gameEngine.getMouse();
		/*
		if(this.mousePos.left){
			//var scene = this.gameEngine.getActiveScene();
			var scene = this.gameEngine.activeScene;
			var ball = new Ball();
			ball.init(this.gameEngine);
			ball.setPosition(this.mousePos.x,this.mousePos.y);
			scene.addObject(ball);
		}*/
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
			}else{
				this.playerTwoScore++;
			}
		}
	}
	
	this.DrawMouseCursor = function(g){
		var crossSize = 10;
		if(this.mousePos.left){
			g.fillStyle = "red";
			g.strokeStyle="red";
		}else{
			g.fillStyle = "black";
			g.strokeStyle="black";
		}
		g.lineWidth = 2;
		g.beginPath();
		g.moveTo(this.mousePos.x-crossSize,this.mousePos.y);
		g.lineTo(this.mousePos.x+crossSize,this.mousePos.y);
		g.stroke();
		g.closePath();
		g.beginPath();
		g.moveTo(this.mousePos.x,this.mousePos.y-crossSize);
		g.lineTo(this.mousePos.x,this.mousePos.y+crossSize);
		g.stroke();
		g.closePath();
	}
	
	this.draw = function(g){
		g.fillStyle = "black";
		g.font="24px Verdana";
		if(this.gameEngine.frameCount<100){
			g.fillText("Ready ",this.gameEngine.getDisplayWidth()/2,this.gameEngine.getDisplayHeight()/2);
		}else if(this.gameEngine.frameCount>100&&this.gameEngine.frameCount<130){
			g.fillText("GO!! ",this.gameEngine.getDisplayWidth()/2,this.gameEngine.getDisplayHeight()/2);
		}else{
			g.font="20px Verdana";
			g.fillText(""+this.playerOneScore,10,18);
			g.fillText(""+this.playerTwoScore,this.gameEngine.getDisplayWidth()-15,18);
		}
		this.DrawMouseCursor(g);
		
	}

}