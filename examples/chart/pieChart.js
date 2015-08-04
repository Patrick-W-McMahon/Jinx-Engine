function PieChart(){
	this.gameEngine;
	this.data;
	this.dataProcessed;
	this.dataPointsOne=[];
	this.dataPointsTwo=[];
	this.colors;
	this.center;
	this.radius;
	this.lastPosition = 0;
	this.dataTotal = 0;

	this.init = function(e){
		this.gameEngine = e;
		this.data = [75,68,32,95,20,51];
		this.colors = ["#7E3817", "#C35817", "#EE9A4D", "#A0C544", "#348017", "#307D7E"];
		this.center = [this.gameEngine.getDisplayWidth() / 2, this.gameEngine.getDisplayHeight() / 2];
		this.radius = Math.min(this.gameEngine.getDisplayWidth(), this.gameEngine.getDisplayHeight()) / 2;
		for(var i=0;i<this.data.length;i++){
			this.dataTotal += this.data[i];
		}
		for(var i=0;i<this.data.length;i++){
			this.dataProcessed=Math.PI*2*(this.data[i]/this.dataTotal);
			this.dataPointsOne.push(this.lastPosition);
			this.dataPointsTwo.push(this.lastPosition+this.dataProcessed);
			this.lastPosition += this.dataProcessed;
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
	
	this.draw = function(g){		
		for (var i = 0; i < this.data.length; i++) {
			g.fillText(i+"="+this.data[i],this.gameEngine.getDisplayWidth()-30,9*i);
			g.fillStyle = this.colors[i];
			g.beginPath();
			g.moveTo(this.center[0],this.center[1]);
			g.arc(this.center[0],this.center[1],this.radius,this.dataPointsOne[i],this.dataPointsTwo[i],false);
			g.lineTo(this.center[0],this.center[1]);
			g.fill();
			g.strokeStyle="black";
			g.stroke();
		}		
	}

}