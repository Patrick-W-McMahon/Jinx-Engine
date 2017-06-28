function Wall(c,s,d){
	this.color=c;
	this.x;
	this.gapY;
	this.speed=s;
	this.gameEngine;
	this.gapSize=80;
	this.wallDepth=60;
	this.screenHeight;
	this.screenWidth;
	this.wallDrawVals;
	this.delay=d;
	this.wallOneCollitionBox;
	this.wallTwoCollitionBox;
	this.playerCollitionBox;

	this.init = function(e){
		this.gameEngine = e;
		this.screenHeight = e.getDisplayHeight();
		this.screenWidth = e.getDisplayWidth();
		this.resetWall();
	}
	
	this.resetWall = function(){
		this.x = this.screenWidth
		this.gapY = Math.randomNumberRange(0,this.screenHeight-this.gapSize);
	}
		
	this.update = function(){
		var gameState = this.gameEngine.getEventInStack("gameover",false);
		if(this.gameEngine.frameCount>this.delay&&gameState==false){
			this.x-=this.speed;
		}
		if(this.x+this.gapSize<0){
			this.gameEngine.addEvent({name:"point",player:1});
			this.resetWall();
		}
		var player = this.gameEngine.getEventInStack("player",false);
		this.playerCollitionBox ={
			x:player.x-9,
			y:player.y-9,
			width:18,
			height:18
		}
		this.wallOneCollitionBox={
			x:this.x,
			y:0,
			width:this.wallDepth,
			height:this.gapY,
		}
		this.wallTwoCollitionBox={
			x:this.x,
			y:this.gapY+this.gapSize,
			width:this.wallDepth,
			height:this.screenHeight
		}
		if(this.gameEngine.collitionDetection(this.playerCollitionBox,this.wallOneCollitionBox)||this.gameEngine.collitionDetection(this.playerCollitionBox,this.wallTwoCollitionBox)){
			this.gameEngine.addEvent({name:"gameover",score:this.score});//Game Over Trigger
		}
	}
	
	this.draw = function(g){		
		g.fillStyle = this.color;
		g.fillRect(this.wallOneCollitionBox.x,this.wallOneCollitionBox.y,this.wallOneCollitionBox.width,this.wallOneCollitionBox.height);
		g.fillRect(this.wallTwoCollitionBox.x,this.wallTwoCollitionBox.y,this.wallTwoCollitionBox.width,this.wallTwoCollitionBox.height);
		//g.fillStyle = "green";
		//g.fillRect(this.playerCollitionBox.x,this.playerCollitionBox.y,this.playerCollitionBox.width,this.playerCollitionBox.height);
	}
	
	

};
