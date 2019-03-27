function BarChart(data){
	this.gameEngine;
	this.data=data;
	this.mousePos;
	this.barWidth=10;
	this.barSpacing=10;

	this.init = function(e){
		this.gameEngine = e;
		//this.getChartData();
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
	
	this.drawChartBox = function(g,area,data){
		g.strokeStyle="black";
		g.fillStyle="black";
		g.lineWidth = 2;
		g.rect(area.x,area.y,area.w,area.h);
		g.stroke();
		g.save();
		var rotate = -1.55;
		g.rotate(rotate);
		g.translate(-335, -10);
		var fontSize = Math.floor(area.h / 25);
		g.font=fontSize + "pt Helvetica";
		g.fillText(data.yAxis_label,area.x-20,area.y);
		g.restore();
		for(var i=0;i<data.markers.length;i++){
			this.drawMarkLine(g,area,data.markers[i]);
		}
		this.drawKey(g,area,data);
	}
	
	this.drawMarkLine = function(g,area,mark){
		var value = (area.y+area.h)-((area.h/this.getBiggest())*mark);//(((mark/20)*area.h)+area.y);
		g.beginPath();
		g.strokeStyle="black";
		g.lineWidth = 1.5;
		g.moveTo(area.x,value);
		g.lineTo(area.x+area.w,value);
		g.stroke();
		var str = "$"+mark;
		g.fillText(str,area.x-20,value);
		g.closePath();
	}
	
	this.drawKey = function(g,area,data){
		
		for(var i=0;i<data.itemLabels.length;i++){
			var color = data.itemLabels[i].color;
			var keyData={
				x:area.x+area.w+20,
				y:area.y*i+60,
				w:20,
				h:20,
				color:data.itemLabels[i].color,
				label:data.itemLabels[i].label
			}
			g.fillStyle = color;
			g.beginPath();
			g.rect(keyData.x,keyData.y,keyData.h,keyData.w);
			g.closePath();
			g.fill();
			g.strokeStyle="#242425";
			g.stroke();
			g.fillStyle = "black";
			g.fillText(keyData.label,keyData.x+keyData.w+5,keyData.y+(keyData.h/2)+2);
		}
		
		
	}
	
	this.getBiggest = function(){
		var biggest=0;
		var data = this.data;
		data.markers.forEach(function(num){
			if(num>biggest){
				biggest=num;
			}
		});
		for(var x=0;x<data.data.length;x++){
			for(var y=0;y<data.data[x].length;y++){
				if(data.data[x][y]>biggest){
					biggest=data.data[x][y];
				}
			}
		}
		return biggest;
	}
	
	this.drawBarGroup = function(g,area,data){
		for(var i=0;i<data.itemLabels.length;i++){
			var bar ={
				x:area.x+((area.w/data.itemLabels.length)*i),//(area.w/data.itemLabels.length)*i,
				y:area.y,
				w:(area.w/data.itemLabels.length)-2,
				h:area.h,
				color:data.itemLabels[i].color,
				display:"vertical",
				value:data.data[i],
				max:this.getBiggest()
			}
			this.drawBar(g,bar);
		}
	}
	
	this.drawBar = function(g,barData){
		g.beginPath();
		var value = (barData.value/barData.max)*barData.h;
		var drawRec={
			x:barData.x,
			y:barData.y+value,
			w:barData.w,
			h:barData.h-value
		};
		var grd = g.createLinearGradient(barData.x, 0, barData.x+barData.w, 0);
		grd.addColorStop(0, barData.color);
		grd.addColorStop(0.5, "#D8D8D8");
		grd.addColorStop(1, barData.color);
		g.fillStyle = grd;
		//g.fillStyle=barData.color;
		g.strokeStyle="black";
		g.rect(drawRec.x,drawRec.y,drawRec.w,drawRec.h);
		g.fill();
		g.stroke();
		g.closePath();
	}
	
	this.draw = function(g){
		//g.font="8px Verdana";
		var chartArea = {x:100,y:50,h:300,w:500};
		this.drawChartBox(g,chartArea,this.data);
		var padding=3;
		var spacePerGroup = chartArea.w/data.groupLabels.length;
		var groupWidth = spacePerGroup-(padding);
		var padMult = 8;
		for(var i=0;i<data.groupLabels.length;i++){
			var groupArea = {
				x:chartArea.x+(i*groupWidth)+(padding*padMult),
				y:chartArea.y,
				h:chartArea.h,
				w:groupWidth-(padding*padMult),
			}
			var groupData ={
				itemLabels:data.itemLabels,
				data:data.data[i]
			}
			this.drawBarGroup(g,groupArea,groupData);
			g.beginPath();
			g.save();
			g.strokeStyle="black";
			g.fillStyle="black";
			var rotate = 0.17;
			g.translate(60, (i*15)*-1);
			g.rotate(rotate);
			
			g.fillText(data.groupLabels[i],groupArea.x,groupArea.y+groupArea.h);
			g.restore();
			g.closePath();
		}
		
		
		//for(var x=0;x<this.data.groupLabels.length;x++){
			//var heightPoint = this.gameEngine.getDisplayHeight()-this.data.groupLabels[x];
			//var heightPointData = this.chartData[x];
			//this.drawBar(g,x,heightPoint);
		//}
		//g.fillText(""+this.chartData.length+" data points",this.gameEngine.getDisplayWidth()-60,9);
	}

}
