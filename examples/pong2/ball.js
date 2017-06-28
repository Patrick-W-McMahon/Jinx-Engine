function Ball(){
	var gameEngine;
	this.radius=8;
	var x;
	var y;
	var direction;
	var speed=1;
	
	
	this.init = function(e){
		this.gameEngine = e;
		this.resetBall();
	}
	
	this.resetBall = function(){
		this.x = this.gameEngine.getDisplay("widthCenter");
		this.y = this.gameEngine.getDisplay("heightCenter"); 
		this.direction = Math.randomNumberRange(0,360);
	}
	
	this.setPosition = function(x,y){
		this.x = x;
		this.y = y;
	}
	
	this.getAngle = function(pt3, pt2, pt1) {
		var dx1 = pt1.x - pt2.x;
		var dy1 = pt1.y - pt2.y;
		var dx2 = pt3.x - pt2.x;
		var dy2 = pt3.y - pt2.y;
		var a1 = Math.atan2(dy1, dx1);
		var a2 = Math.atan2(dy2, dx2);
		return parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;
	}
	
	this.update = function(){
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
			/*
				this.y=0;
				var wallX = 0;
				var wallY = Math.findYofCircleByDegrees(this.y,speed,this.direction);
				this.direction = Math.AngleOfReflection(Math.angleOfTwoLines(this.x,this.y,wallX,wallY));*/
				this.direction+= this.direction;
			}
			if(this.y+this.radius>this.gameEngine.getDisplayHeight()){
				/*var v=this.direction;
				var n=90;
				var u = (v*n/n*n)*n;
				var w=v-u;
				this.direction=w;*/
				//this.direction = 2 * (90 - this.direction) + 180;
				this.direction+= this.direction;
			}
			var errorBuffer = 3;
			if(this.x<-errorBuffer||this.y<-errorBuffer||this.x>this.gameEngine.getDisplay("width")+errorBuffer||this.y>this.gameEngine.getDisplay("height")+errorBuffer){
				this.x = this.gameEngine.getDisplay("widthCenter");
				this.y = this.gameEngine.getDisplay("heightCenter"); 
				this.direction = Math.randomNumberRange(0,360);
			}
			
			var player1 = this.gameEngine.getEventInStack("player_Player One",false);
			var player2 = this.gameEngine.getEventInStack("player_Player Two",false);
			
			this.player1CollitionBox ={
				x:player1.x-9,
				y:player1.y-9,
				width:player1.width,
				height:player1.height
			}
			
			this.player2CollitionBox ={
				x:player2.x-9,
				y:player2.y-9,
				width:player2.width,
				height:player2.height
			}
			
			this.ballCollitionBox={
				x:this.x-9,
				y:this.y-9,
				width:8,
				height:8,
			}
			
			if(this.gameEngine.collitionDetection(this.player1CollitionBox,this.ballCollitionBox)){//player One
				this.direction+= this.direction;
			}
			
			if(this.gameEngine.collitionDetection(this.player2CollitionBox,this.ballCollitionBox)){//player Two
				this.direction+= this.direction;
			}
			
			this.gameEngine.getEventInStack("ball",true);
			this.gameEngine.addEvent({name:"ball",x:this.x,y:this.y});
		}
		
		

	}
	
	this.draw = function(g){
		g.fillStyle = "black";
		//g.fillRect(this.x,this.y,this.radius*2,this.radius*2);
		g.beginPath();
		g.arc(this.x,this.y,this.radius,0,2*Math.PI);
		g.fill();
	}
}