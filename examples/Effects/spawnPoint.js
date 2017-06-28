function SpawnPoint(){
	var gameEngine;
	this.radius=2;
	this.x;
	this.y;
	this.sticks = [];
	this.mouseSize=40;
	this.buttonHover=false;
	this.spawnGen=4;
	this.mousePos;
	this.img;
	this.displayType="image";
	
	
	this.init = function(e){
		this.gameEngine = e;
		this.x = this.gameEngine.getDisplay("widthCenter");
		this.y = this.gameEngine.getDisplay("heightCenter")+100; 
		if(this.displayType=="image"){
			this.img  = new Image(); 
			this.img.src = "textures/logs.png";
		}else{
			for(x=0;x<15;x++){
				this.genStick();
			}
		}
	}
	
	this.update = function(){
		this.mousePos=this.gameEngine.getMouse();
		if(this.mousePos.x>this.x-this.mouseSize&&this.mousePos.x<this.x+this.mouseSize&&this.mousePos.y>this.y-this.mouseSize&&this.mousePos.y<this.y+this.mouseSize){
			this.buttonHover=true;
		}else{
			this.buttonHover=false;
		}
		if(this.buttonHover){
			var width = 50;
			this.spawnGen=14;
		}else{
			var width = 16;
			this.spawnGen=3;
		}
		for(x=0;x<this.spawnGen;x++){
			var partical = new Partical();
			partical.x=Math.randomNumberRange(this.x-width,this.x+width);
			partical.y=Math.randomNumberRange(this.y-40,this.y+40);
			partical.init(this.gameEngine);
			this.gameEngine.addObject(partical);
		}

	}
	
	this.genStick = function(){
		if(Math.randomNumberRange(0,1)){
			this.sticks.push({
				'px1':this.x+Math.randomNumberRange(0,40),
				'py1':this.y-Math.randomNumberRange(0,40),
				'px2':this.x-Math.randomNumberRange(0,80),
				'py2':this.y+Math.randomNumberRange(0,40),
				'px3':this.x-Math.randomNumberRange(0,80),
				'py3':this.y+Math.randomNumberRange(0,40)
			});
		}else{
			this.sticks.push({
				'px1':this.x-Math.randomNumberRange(0,40),
				'py1':this.y-Math.randomNumberRange(0,40),
				'px2':this.x+Math.randomNumberRange(0,80),
				'py2':this.y+Math.randomNumberRange(0,40),
				'px3':this.x+Math.randomNumberRange(0,80),
				'py3':this.y+Math.randomNumberRange(0,40)
			});
		}
	}
	
	this.drawStick = function(g,i){
		g.beginPath();
		g.moveTo(this.sticks[i]['px1'],this.sticks[i]['py1']);
		g.lineTo(this.sticks[i]['px2'],this.sticks[i]['py2']);
		g.lineTo(this.sticks[i]['px3'],this.sticks[i]['py3']);
		g.fill();
	/*
		if(Math.randomNumberRange(0,1)){
			g.beginPath();
			g.moveTo(this.x+Math.randomNumberRange(0,40),this.y-Math.randomNumberRange(0,40));
			g.lineTo(this.x-Math.randomNumberRange(0,80),this.y+Math.randomNumberRange(0,40));
			g.lineTo(this.x-Math.randomNumberRange(0,80),this.y+Math.randomNumberRange(0,40));
			g.fill();
		}else{
			g.beginPath();
			g.moveTo(this.x-Math.randomNumberRange(0,40),this.y-Math.randomNumberRange(0,40));
			g.lineTo(this.x+Math.randomNumberRange(0,80),this.y+Math.randomNumberRange(0,40));
			g.lineTo(this.x+Math.randomNumberRange(0,80),this.y+Math.randomNumberRange(0,40));
			g.fill();
		}
		*/
	}
	
	this.draw = function(g){
		if(this.displayType=="image"){
			g.drawImage(this.img,this.x-80,this.y-10,200,100);
		}else{
			g.fillStyle = "black";
			//g.fillRect(this.x,this.y,this.radius*2,this.radius*2);
			g.beginPath();
			g.arc(this.x,this.y,this.radius,0,2*Math.PI);
			g.fill();
			for(x=0;x<15;x++){
				this.drawStick(g,x);
			}
			/*
			g.beginPath();
			g.moveTo(this.x-40,this.y-20);
			g.lineTo(this.x+60,this.y+20);
			g.lineTo(this.x+67,this.y+28);
			g.fill();
			g.beginPath();
			g.moveTo(this.x+40,this.y-20);
			g.lineTo(this.x-60,this.y+20);
			g.lineTo(this.x-67,this.y+28);
			g.fill();
			g.beginPath();
			g.moveTo(this.x+40,this.y-20);
			g.lineTo(this.x-60,this.y+20);
			g.lineTo(this.x-67,this.y+28);
			g.fill();
			*/
		}
	}
}