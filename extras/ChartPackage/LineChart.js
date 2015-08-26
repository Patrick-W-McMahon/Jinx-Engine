function LineChart(){
	this.gameEngine;
	this.chartData=[];
	this.mousePos;
	var tempThis=this;
	this.mousePos;
	this.mouseOverValue;
	

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
		for(var x=10;x<this.gameEngine.getDisplayWidth();x=x+10){
			this.chartData.push(Math.randomNumberRange(10,this.gameEngine.getDisplayHeight()-10));
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
		g.strokeStyle="black";
		g.lineWidth = 2;
		g.beginPath();
		g.moveTo(10,0);
		g.lineTo(10,this.gameEngine.getDisplayHeight()-10);
		g.lineTo(this.gameEngine.getDisplayWidth()-10,this.gameEngine.getDisplayHeight()-10);
		g.lineTo(10,this.gameEngine.getDisplayHeight()-10);
		g.stroke();
		g.closePath();
		g.lineWidth = 1;
		g.fillText(""+this.chartData.length+" data points",this.gameEngine.getDisplayWidth()-60,9);
		g.fillText("X:"+this.mousePos.x+" Y:"+this.mousePos.y,this.gameEngine.getDisplayWidth()-60,20);
	}
	
	this.drawChartedLine = function(g,x,oldVal,newVal){
		g.beginPath();
		g.strokeStyle="black";
		g.fillStyle="black";
		g.fillText(""+newVal,x*10,newVal);
		if(((x-1)*10)<this.mousePos.x&&this.mousePos.x<((x+3)*10)){
			g.strokeStyle="blue";
		}else{
			g.strokeStyle="green";
		}
		g.lineWidth = 2;
		g.moveTo(x*10,oldVal);
		g.lineTo((x+1)*10,newVal);
		g.stroke();
		g.closePath();
	}
	
	this.drawChartedArea = function(g,data){
		g.beginPath();
		g.strokeStyle="lightblue";
		g.fillStyle = "lightblue";
		for(var x=0;x<this.chartData.length;x++){
			g.lineWidth = 1;
			g.lineTo((x+1)*10,this.gameEngine.getDisplayHeight()-this.chartData[x]);
		}
		g.lineTo(this.gameEngine.getDisplayWidth(),this.gameEngine.getDisplayHeight());
		g.lineTo((x+1)*10,this.gameEngine.getDisplayHeight()-10);
		g.lineTo(10,this.gameEngine.getDisplayHeight()-10);
		g.fill();
		g.stroke();
		g.closePath();
	}
	
	this.drawMouseCourser=function(g){
		g.beginPath();
		g.beginPath();
		g.strokeStyle="red";
		g.moveTo(this.mousePos.x,0);
		g.lineTo(this.mousePos.x,this.gameEngine.getDisplayHeight()-10);
		g.stroke();
		g.closePath();
	}
	
	this.draw = function(g){
		g.fillStyle = "black";
		g.font="8px Verdana";
		
			
		this.drawChartArea(g)
		this.drawChartedArea(g,this.chartData);
		
		for(var x=0;x<this.chartData.length;x++){
			var heightPoint = this.gameEngine.getDisplayHeight()-this.chartData[x];
			var heightPointData = this.chartData[x];
			this.drawChartedLine(g,x,this.gameEngine.getDisplayHeight()-this.chartData[x-1],this.gameEngine.getDisplayHeight()-this.chartData[x]);
		}
		this.drawMouseCourser(g);
	}

}
