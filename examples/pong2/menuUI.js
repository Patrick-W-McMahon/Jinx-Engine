function MenuUI(){
	this.gameEngine;
	this.mousePos;
	this.buttonHover=false;
	//this.buttionPos = {x:0,y:100,height:50,width:200}
	this.buttons=[];
	var buttonXPos;

	this.init = function(e){
		this.gameEngine = e;
		//this.buttionPos.x = (this.gameEngine.getDisplayWidth()/2)-100;
		buttonXPos = (this.gameEngine.getDisplayWidth()/2)-100;
		this.buttons.push(new Button({
			id:"PvP",
			x:buttonXPos,
			y:100,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Play PvP"
		}));
		
		this.buttons.push(new Button({
			id:"PvC",
			x:buttonXPos,
			y:160,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Play PvC"
		}));
		
		this.buttons.push(new Button({
			id:"CvP",
			x:buttonXPos,
			y:220,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Play CvP"
		}));
		this.buttons.push(new Button({
			id:"CvC",
			x:buttonXPos,
			y:280,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Play CvC"
		}));
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].init(e);
		}
	}
	
	this.update = function(){
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].update();
		}
		var player1,player2;
		var levelSelect = false;
		if(this.gameEngine.getEventInStack("PvP",true)){
			player1=0;
			player2=0;
			levelSelect=true;
		}
		if(this.gameEngine.getEventInStack("PvC",true)){
			player1=0;
			player2=1;
			levelSelect=true;
		}
		if(this.gameEngine.getEventInStack("CvP",true)){
			player1=1;
			player2=0;
			levelSelect=true;
		}
		if(this.gameEngine.getEventInStack("CvC",true)){
			player1=1;
			player2=1;
			levelSelect=true;
		}
		
		if(levelSelect){
			var gameScene = new Scene();
			var hudId = gameScene.addObject(new HUD());
			var playerOneId = gameScene.addObject(new Player("left","red","Player One",player1));
			var playerTwoId = gameScene.addObject(new Player("right","blue","Player Two",player2));
			var ballId = gameScene.addObject(new Ball());
			this.gameEngine.setScene(gameScene); 
			this.gameEngine.init();
		}
		
		//this.mousePos=this.gameEngine.getMouse();
		/*
		if(this.mousePos.left){
			//var scene = this.gameEngine.getActiveScene();
			var scene = this.gameEngine.activeScene;
			var ball = new Ball();
			ball.init(this.gameEngine);
			ball.setPosition(this.mousePos.x,this.mousePos.y);
			scene.addObject(ball);
			
		}*/
		/*
		if(this.mousePos.x>this.buttionPos.x&&this.mousePos.x<this.buttionPos.x+this.buttionPos.width&&this.mousePos.y>this.buttionPos.y&&this.mousePos.y<this.buttionPos.y+this.buttionPos.height){
			this.buttonHover=true;
		}else{
			this.buttonHover=false;
		}
		if(this.mousePos.left){
			if(this.buttonHover){
				var gameScene = new Scene();
				var hudId = gameScene.addObject(new HUD());
				var playerOneId = gameScene.addObject(new Player("left","red","Player One",1));
				var playerTwoId = gameScene.addObject(new Player("right","blue","Player Two",1));
				var ballId = gameScene.addObject(new Ball());
				this.gameEngine.setScene(gameScene); 
				this.gameEngine.init();
			}
		}*/
		
	}
	/*
	this.input = function(keyDown,keyPress,KeyUp){

	}
	
	this.EventLisener = function(e){

	}*/
	/*
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
	
	this.DrawPlayButton = function(g){
		g.beginPath();
		g.fillStyle = "black";
		g.strokeStyle="black";
		g.font="24px Verdana";
		if(this.buttonHover){
			g.fillStyle="green";
		}else{
			g.fillStyle="darkgreen";
		}
		g.rect(this.buttionPos.x,this.buttionPos.y,this.buttionPos.width,this.buttionPos.height);
		g.fill();
		g.stroke();
		g.closePath();
		g.fillStyle="black";
		g.fillText("Start Game",this.buttionPos.x+30,this.buttionPos.y+35);
	}*/
	
	this.draw = function(g){
		g.font="34px Verdana";
		g.fillStyle="black";
		g.fillText("Pong Example Using Scenes",(this.gameEngine.getDisplayWidth()/2)-220,60);
		//this.DrawPlayButton(g);
		//this.DrawMouseCursor(g);
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].draw(g);
		}
	}

}