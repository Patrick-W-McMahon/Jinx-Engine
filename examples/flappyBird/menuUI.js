function MenuUI(){
	this.gameEngine;
	this.levels={
		lvl1:{speed:0.2,max:4000,iterate:900,playerSpeed:0.5},
		lvl2:{speed:0.45,max:1800,iterate:600,playerSpeed:0.65},
		lvl3:{speed:0.7,max:1000,iterate:300,playerSpeed:0.85}
	}
	this.cursorBox;
	this.buttons=[];
	

	this.init = function(e){
		this.gameEngine = e;
		
		this.buttons.push(new Button({
			id:"levelOneButton",
			x:(this.gameEngine.getDisplayWidth()/2)-100,
			y:100,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Level One"
		}));
		
		this.buttons.push(new Button({
			id:"levelTwoButton",
			x:(this.gameEngine.getDisplayWidth()/2)-100,
			y:160,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Level Two"
		}));
		
		this.buttons.push(new Button({
			id:"levelThreeButton",
			x:(this.gameEngine.getDisplayWidth()/2)-100,
			y:220,
			height:50,
			width:200,
			baseColor:"darkGreen",
			hoverColor:"green",
			fontColor:"white",
			borderColor:"black",
			text:"Level Three"
		}));
		
		console.log(this.buttons.length);
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].init(e);
		}
	}
	
	this.update = function(){
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].update();
		}
		var levelSelect = false;
		var maxVal;
		var iterate;
		var speed;
		var playerSpeed;
		
		if(this.gameEngine.getEventInStack("levelOneButton",true)){
			maxVal = this.levels.lvl1.max;
			iterate = this.levels.lvl1.iterate;
			speed = this.levels.lvl1.speed;
			playerSpeed = this.levels.lvl1.playerSpeed;
			levelSelect=true;
		}
		
		if(this.gameEngine.getEventInStack("levelTwoButton",true)){
			maxVal = this.levels.lvl2.max;
			iterate = this.levels.lvl2.iterate;
			speed = this.levels.lvl2.speed;
			playerSpeed = this.levels.lvl2.playerSpeed;
			levelSelect=true;
		}
		
		if(this.gameEngine.getEventInStack("levelThreeButton",true)){
			maxVal = this.levels.lvl3.max;
			iterate = this.levels.lvl3.iterate;
			speed = this.levels.lvl3.speed;
			playerSpeed = this.levels.lvl3.playerSpeed;
			levelSelect=true;
		}
		
		if(levelSelect){
			var gameScene = new Scene();
			for(x=0;x<maxVal;x=x+iterate){
				var testwall = gameScene.addObject(new Wall("blue",speed,x));
			}
			var player = gameScene.addObject(new Player("red","Player",playerSpeed));
			var hudId = gameScene.addObject(new HUD());
			var cursor = gameScene.addObject(new Cursor("crosshair"));
			this.gameEngine.setScene(gameScene); 
			this.gameEngine.init();
		}
	}
	
	this.draw = function(g){
		g.font="34px Verdana";
		g.fillStyle="black";
		g.fillText("Flappy Bird Example",(this.gameEngine.getDisplayWidth()/2)-180,60);
		for(x=0;x<this.buttons.length;x++){
			this.buttons[x].draw(g);
		}
	}

}
