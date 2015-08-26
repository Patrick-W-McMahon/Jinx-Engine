function PieChart(data){
	this.gameEngine;
	this.data = data;
	this.dataPoints=[];
	this.center;
	this.radius;
	this.lastPosition = 0;
	this.dataTotal = 0;
	this.animated=false;
	this.animatedData=[];
	this.animationSpeed=0.01;
	this.displayedPoints=1;
	this.animating=false;
	//this.pieSections=[];

	this.init = function(e){
		this.gameEngine = e;
		this.center = [(this.gameEngine.getDisplayWidth() / 2)-200, (this.gameEngine.getDisplayHeight() / 2)];
		this.radius = (Math.min(this.gameEngine.getDisplayWidth(), this.gameEngine.getDisplayHeight()) / 2)-40;
		for(var i=0;i<this.data.length;i++){
			this.dataTotal += this.data[i].value;
		}
		for(var i=0;i<this.data.length;i++){
			if(this.animated){
				this.animatedData.push({value:0});
				this.animating=true;
			}else{
				var dataProcessed=Math.PI*2*(this.data[i].value/this.dataTotal);
				this.dataPoints.push({
					p1:this.lastPosition,
					p2:this.lastPosition+dataProcessed
				});
				this.lastPosition += dataProcessed;
				//var pieSlice = new ArcObject(this.center[0],this.center[1],this.radius,this.dataPoints.p1,this.dataPoints.p2,false);
				//this.pieSections.push(pieSlice);
			}
		}
	}
	
	this.setAnimation = function(animation,speed){
		this.animated=animation;
		this.animationSpeed=speed;
	}
	
	this.update = function(){
		if(this.animated&&this.animating){
			this.dataPoints=[];
			for(var i=0;i<this.data.length;i++){
				if(this.animatedData[i].value<this.data[i].value){
					if(i==0||this.animatedData[i-1].value==this.data[i-1].value){
						var speed;
						if(this.animatedData[i].value<(this.data[i].value/2)){
							speed = (this.data[i].value-this.animatedData[i].value)/10;
						}else{
							speed=(this.data[i].value-this.animatedData[i].value)/3;
						}
						if(speed<this.animationSpeed){
							speed=this.animationSpeed;
						}
						this.animatedData[i].value+=speed;
					}
				}
				if(this.animatedData[i].value>this.data[i].value){
					this.animatedData[i].value=this.data[i].value;
				}
				if(this.animatedData[i].value==this.data[i].value){
					if(i>this.displayedPoints){
						this.displayedPoints=i;
					}
				}
				var dataProcessed=Math.PI*2*(this.data[i].value/this.dataTotal);
				var animatedDataProcessed=Math.PI*2*(this.animatedData[i].value/this.dataTotal);
				var finalValue;
				if(animatedDataProcessed<dataProcessed){
					finalValue=animatedDataProcessed;
				}else{
					finalValue=dataProcessed;
				}
				this.dataPoints.push({
					p1:this.lastPosition,
					p2:this.lastPosition+finalValue
				});
				this.lastPosition += dataProcessed;
				if(this.displayedPoints+1==this.data.length){
					this.animating=false;
				}
			}
		}
		//this.mousePos=this.gameEngine.getMouse();
		//for(i=0;i<this.dataTotal.length;i++){
			
		//}
		
	}
	
	this.draw = function(g){	
		g.font="12px Arial";
		g.beginPath();
		g.fillStyle="white";
		g.strokeStyle="black";
		var rect = {
			x:this.gameEngine.getDisplayWidth()-280,
			y:60,
			w:250,
			h:this.data.length*25
		}
		g.rect(rect.x,rect.y,rect.w,rect.h);
		g.fill();
		g.stroke();
		g.closePath();
		for (var i = 0; i < this.data.length; i++) {
			var value;
			var realVal = this.data[i].value;
			if(this.animated&&this.animating){
				value=this.animatedData[i].value;
			}else{
				value=this.data[i].value;
			}
			var keyData={
				x:this.gameEngine.getDisplayWidth()-260,
				y:24*i+65,
				h:20,
				w:20,
				color:this.data[i].color,
				label:this.data[i].label,
				value:value,
				chart:{
					c1:this.center[0],
					c2:this.center[1],
					r:this.radius,
					p1:this.dataPoints[i].p1,
					p2:this.dataPoints[i].p2
				}
			}
			g.fillStyle = keyData.color;
			g.beginPath();
			if((this.animated&&i<=this.displayedPoints)||!this.animated){
				g.moveTo(keyData.chart.c1,keyData.chart.c2);
				//g.fill(this.pieSections[i].getPath(g));
				//g.stroke(this.pieSections[i].getPath(g));
				g.arc(keyData.chart.c1,keyData.chart.c2,keyData.chart.r,keyData.chart.p1,keyData.chart.p2,false);
			}
			g.closePath();
			g.rect(keyData.x,keyData.y,keyData.h,keyData.w);
			g.fill();
			g.strokeStyle="white";
			g.stroke();
			g.fillStyle = "black";
			g.fillText("[ "+realVal+"% ] "+keyData.label,keyData.x+keyData.w+5,keyData.y+(keyData.h/2)+2);
		}		
	}
}
