function BarChart(){
	this.gameEngine;
	this.chartData=[];
	this.mousePos;
	this.barWidth=10;
	this.barSpacing=10;

	this.init = function(e){
		this.gameEngine = e;
		this.getChartData();
	}
	
	this.update = function(){
		//this.getChartData();
		this.mousePos=this.gameEngine.getMouse();
	}
	
	this.getChartData = function(){
		this.chartData=[];
		for(var x=10;x<this.gameEngine.getDisplayWidth();x=x+(this.barWidth+this.barSpacing)){
			if(x+this.barWidth<this.gameEngine.getDisplayWidth()){
				this.chartData.push(Math.randomNumberRange(10,this.gameEngine.getDisplayHeight()-10));
			}
		}
	}
	
	this.input = function(keyDown,keyPress,KeyUp){
		if(keyDown.indexOf(19)>-1){//pause button
			console.log("pause button");
			this.gameEngine.addEvent({name:"GameEngine",message:"pause"});
		}
	}
	
	this.EventLisener = function(e){
		var pointEvent = this.gameEngine.getEventInStack("point",true);
		if(pointEvent){
			if(pointEvent.player==1){
				this.playerOneScore++;
			}else{
				this.playerTwoScore++;
			}
		}
	}
	
	this.drawChartArea = function(g){
		g.fillStyle = "black";
		g.lineWidth = 2;
		g.beginPath();
		g.moveTo(10,0);
		g.lineTo(10,this.gameEngine.getDisplayHeight()-10);
		g.lineTo(this.gameEngine.getDisplayWidth()-10,this.gameEngine.getDisplayHeight()-10);
		g.lineTo(10,this.gameEngine.getDisplayHeight()-10);
		g.stroke();
		g.closePath();
		g.lineWidth = 1;
		g.strokeStyle="black";
	}
	
	this.drawBar = function(g,x,val){
		g.beginPath();
		var barX = (x+1)*(this.barSpacing+this.barWidth);
		var barY = (this.gameEngine.getDisplayHeight()-val)-10;
		if(this.mousePos.x>barX&&this.mousePos.x<barX+this.barWidth){
			g.fillStyle="yellow";
		}else{
			g.fillStyle="green";
		}
		g.strokeStyle="black";
		
		g.rect(barX,val,this.barWidth,barY);
		g.fill();
		g.stroke();
		g.closePath()
		g.fillStyle="black";
		g.fillText(""+this.gameEngine.getDisplayHeight()-val,barX,val-3);
	}
	
	this.draw = function(g){
		g.font="8px Verdana";
		this.drawChartArea(g);
		for(var x=0;x<this.chartData.length;x++){
			var heightPoint = this.gameEngine.getDisplayHeight()-this.chartData[x];
			var heightPointData = this.chartData[x];
			this.drawBar(g,x,heightPoint);
		}
		g.fillText(""+this.chartData.length+" data points",this.gameEngine.getDisplayWidth()-60,9);
	}

}