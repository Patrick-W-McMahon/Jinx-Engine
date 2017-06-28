function AI(){
	this.gameEngine;
	this.ai_perams;
	this.ball;
	this.player;
	this.side;

	this.init = function(e,p){
		this.gameEngine=e;
		this.ai_perams={
			distance_detect:100,
			accuracy:10
		}
		this.ball = this.gameEngine.getEventInStack("ball",false);
		this.player = p;
		/*
		if(typeof(this.player)!=="undefined"){
			if(this.player.x-this.ball.x<0){//left side player
				this.side="left";
			}else{//right side player
				this.side="right";
			}
		}*/
	}

	this.update = function(){
		this.ball = this.gameEngine.getEventInStack("ball",false);
		
	}
	
	this.getMove = function(){
		if(this.getDistanceFromBall()<=this.ai_perams.distance_detect){
			if(this.player.y>this.ball.y){
				return "up";
			}
			if(this.player.y+this.player.paddleLength<this.ball.y){
				return "down";
			}
		}
		return "dont move";
	}
	
	this.getDistanceFromBall = function(){
		dis =0;
		switch(this.side){
			case "left":
				dis = this.ball.x -(this.player.x+this.player.paddleThickness);
			break;
			case "right":
				dis = this.player.x-this.ball.x;
			break;
		}
		return dis;
	}
	

}