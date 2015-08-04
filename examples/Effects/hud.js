function HUD(){
	this.gameEngine;
	this.objCount=0;

	this.init = function(e){
		this.gameEngine = e;
	}
	
	this.update = function(){
		this.objCount = this.gameEngine.objects.length;
	}
	
	this.draw = function(g){
		g.fillStyle = "black";
		g.font="24px Verdana";
		g.fillText(""+this.objCount,10,18);
	}

}
