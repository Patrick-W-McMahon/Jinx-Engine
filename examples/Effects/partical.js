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
	this.img;
	this.displayType="image";
	this.imgSize;
	
	
	this.init = function(e){
		this.gameEngine = e;
		this.screenWidth =  e.getDisplayWidth();
		this.screenHeight = e.getDisplayHeight();
		this.radius = Math.randomNumberRange(1,15);
		this.life = Math.randomNumberRange(10,160);
		this.direction = Math.randomNumberRange(0,360);
		this.x_spawn=this.x;
		this.y_spawn=this.y;
		if(this.displayType=="image"){
			this.img  = new Image();
			this.imgSize = Math.randomNumberRange(1,40);
		}
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
		
		if(this.displayType=="image"){
			if(this.life>50){
				this.img.src = "fire"+Math.randomNumberRange(1,3)+".png";
			}else if(this.life>40){
				this.img.src = "dark_smoke1.png";
				this.imgSize=40;
			}else{
				this.img.src = "smoke"+Math.randomNumberRange(1,3)+".png";
				this.imgSize=40;
			}
		}
	}
	
	this.deleteObj = function(){
		if(this.life<0||this.life==0){
			return true;
		}
		return false;
	}
	
	this.draw = function(g){
		if(this.displayType=="image"){
			g.drawImage(this.img,this.x-10,this.y-10,this.imgSize,this.imgSize);
		}else{
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
}