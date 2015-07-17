function Player(s,c,n){
	this.side=s;
	this.color=c;
	this.score=0;
	this.name=n;
	this.type;
	this.count=50;
	this.defaultPaddleLength=50;
	this.paddleLength=this.defaultPaddleLength;
	this.paddleThickness=8;
	this.x;
	this.y=10;
	this.speed=2;
	this.gameEngine;
	this.paddingFromWall=3;
	this.upKey;
	this.downKey;
	
	//this.prototype.ObjectType = "Player";
	
	this.setPlayerType = function(t){
		this.type=t;
	};
	
	this.init = function(e){
		this.gameEngine = e;
		if(this.side=="left"){
			this.x=this.paddingFromWall;
		}else{
			this.x=this.gameEngine.getDisplayWidth()-(this.paddingFromWall+this.paddleThickness);
		}
	}

	this.input = function(keys){
		//console.log(keyDown[0]);
		if(this.side=="right"){
			this.upKey=38;
			this.downKey=40;
		}else if(this.side=="left"){
			this.upKey=87;
			this.downKey=83;	
		}
		if(keys[this.upKey]){//up key
			this.y-=this.speed;
			if(this.y<0){
				this.y=0;
			}
		}
		if(keys[this.downKey]){//down key
			this.y+=this.speed;
			if(this.y+this.paddleLength>this.gameEngine.getDisplayHeight()){
				this.y=this.gameEngine.getDisplayHeight()-this.paddleLength;
			}
		}
	}
		
	//this.update = function(){
	//	window.onkeydown = function(){
	//		x++;
	//	};
	//}
	
	this.draw = function(g){
		g.fillStyle = this.color;
		g.fillRect(this.x,this.y,this.paddleThickness,this.paddleLength);
	}
	
	

};
