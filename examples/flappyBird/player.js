function Player(c,n,s){
	this.color=c;
	this.score=0;
	this.radius=8;
	this.name=n;
	this.x;
	this.y=10;
	this.speed=s;
	this.gameEngine;
	this.upKey;
	this.movingUp=false;
	this.img;
	this.displayType="basic";//basic or image

	
	this.init = function(e){
		this.gameEngine = e;
		this.x = this.gameEngine.getDisplay("widthCenter");
		this.y = this.gameEngine.getDisplay("heightCenter"); 
		if(this.displayType=="image"){
			this.img  = new Image(); 
			this.img.src = "flappy_twitter.png";
		}
	}

	this.input = function(keys){
		var gameState = this.gameEngine.getEventInStack("gameover",false);
		if(gameState==false){
			this.upKey=32;
			if(keys[this.upKey]){//up key
				this.y-=this.speed;
				if(this.y<0){
					this.y=0;
				}
				this.movingUp=true;
			}else{
				this.movingUp=false;
			}
		}
	}
		
	this.update = function(){
		var gameState = this.gameEngine.getEventInStack("gameover",false);
		if(gameState==false){
			if(!this.movingUp){
				this.y+=this.speed;
			}
			if(this.y>this.gameEngine.getDisplayHeight()||this.y<0){
				this.gameEngine.addEvent({name:"gameover",score:this.score});//Game Over Trigger
			}
			this.gameEngine.getEventInStack("player",true);
			this.gameEngine.addEvent({name:"player",x:this.x,y:this.y,radius:this.radius});
		}
	}
	
	this.draw = function(g){		
		if(this.displayType=="image"){
			g.drawImage(this.img,this.x-10,this.y-10,20,20);
		}else{
			g.fillStyle = this.color;
			g.beginPath();
			g.arc(this.x,this.y,this.radius,0,2*Math.PI);
			g.fill();
		}
		g.fillStyle = "black";
		g.font="12px Verdana";
		g.fillText(""+this.name,this.x-20,this.y-10);
		
	}
};
