function Partical(){
	var gameEngine;
	this.radius=2;
	this.x_spawn;
	this.y_spawn;
	this.x;
	this.y;
	this.direction;
	this.speed=1;
	this.life=0;
	this.screenWidth;
	this.screenHeight;
	this.gravityDirection=55;
	this.gravityStrength=1;
	this.useGravity=true;
	
	
	this.init = function(e){
		this.gameEngine = e;
		this.screenWidth =  e.getDisplayWidth();
		this.screenHeight = e.getDisplayHeight();
		this.radius = Math.randomNumberRange(1,15);
		this.life = Math.randomNumberRange(10,160);
		this.direction = Math.randomNumberRange(0,360);
		this.x_spawn=this.x;
		this.y_spawn=this.y;
	}
	
	this.InScreenViewTest = function(){
		if(this.x<0||this.x>this.screenWidth){
			return false;
		}
		if(this.y<0||this.y>this.screenHeight){
			return false;
		}
		return true;
	}
	
	this.update = function(){
		this.life--;
		if(this.InScreenViewTest()){
			var oldX=this.x;
			var oldY=this.y;
			this.y = Math.findYofCircleByDegrees(this.y,this.speed,this.direction);
			this.x = Math.findXofCircleByDegrees(this.x,this.speed,this.direction);
			if(this.useGravity){
				this.y = Math.findYofCircleByDegrees(this.y,this.gravityStrength,this.gravityDirection);
				this.x = Math.findXofCircleByDegrees(this.x,this.gravityStrength,this.gravityDirection);
			}
		}else{
			this.life=0;
		}
		this.radius = this.radius-0.1;
		if(this.radius<.01){
			this.radius=.01;
		}
		

	}
	
	this.deleteObj = function(){
		if(this.life<0||this.life==0){
			return true;
		}
		return false;
	}
	
	this.draw = function(g){
		if(this.life>50){
			g.fillStyle = "red";
		}
		if(this.life<=30){
			g.fillStyle = "orange";
		}
		if(this.life<=20){
			g.fillStyle = "yellow";
		}
		if(this.life<=10){
			g.fillStyle = "gray";
		}
		if(this.life<=0){
			g.fillStyle = "black";
		}
		
		//g.fillRect(this.x,this.y,this.radius*2,this.radius*2);
		g.beginPath();
		g.arc(this.x,this.y,this.radius,0,2*Math.PI);
		g.fill();
	}
}
