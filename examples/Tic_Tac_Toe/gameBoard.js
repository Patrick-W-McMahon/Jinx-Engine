function GameBoard(){
	this.gameEngine;
	this.playerTurn;
	this.mousePos;
	this.boardDrawPoints=[];
	this.boardRec;
	this.boardSlots=[];
	this.delay=30;
	this.delayCounter=0;
	this.buttonHover=false;
	this.mousePos;
	this.cursorBox;

	this.init = function(e){
		this.gameEngine = e;
		this.playerTurn=Math.randomNumberRange(0,1);
		this.boardRec={
			x:50,
			y:50,
			height:300,
			width:300
		};
		this.boardDrawPoints.push({
			x1:this.boardRec.x+(this.boardRec.width/3),
			y1:this.boardRec.y,
			x2:this.boardRec.x+(this.boardRec.width/3),
			y2:this.boardRec.y+this.boardRec.height
		});
		this.boardDrawPoints.push({
			x1:this.boardRec.x+((this.boardRec.width/3)*2),
			y1:this.boardRec.y,
			x2:this.boardRec.x+((this.boardRec.width/3)*2),
			y2:this.boardRec.y+this.boardRec.height
		});
		this.boardDrawPoints.push({
			x1:this.boardRec.x,
			y1:this.boardRec.y+(this.boardRec.height/3),
			x2:this.boardRec.x+this.boardRec.width,
			y2:this.boardRec.y+(this.boardRec.height/3)
		});
		this.boardDrawPoints.push({
			x1:this.boardRec.x,
			y1:this.boardRec.y+((this.boardRec.height/3)*2),
			x2:this.boardRec.x+this.boardRec.width,
			y2:this.boardRec.y+((this.boardRec.height/3)*2)
		});
		
		this.boardSlots.push({
			id:"r1c1",
			x:this.boardRec.x+30,
			y:this.boardRec.y+70,
			text:"",
			clickArea:{
				x:this.boardRec.x,
				y:this.boardRec.y,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r1c2",
			x:this.boardRec.x+30+(this.boardRec.width/3),
			y:this.boardRec.y+70,
			text:"",
			clickArea:{
				x:this.boardRec.x+((this.boardRec.width/3)),
				y:this.boardRec.y,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r1c3",
			x:this.boardRec.x+30+((this.boardRec.width/3)*2),
			y:this.boardRec.y+70,
			text:"",
			clickArea:{
				x:this.boardRec.x+(this.boardRec.width/3)+100,
				y:this.boardRec.y,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		
		this.boardSlots.push({
			id:"r2c1",
			x:this.boardRec.x+30,
			y:this.boardRec.y+70+(this.boardRec.height/3),
			text:"",
			clickArea:{
				x:this.boardRec.x,
				y:this.boardRec.y+(this.boardRec.height/3),
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r2c2",
			x:this.boardRec.x+30+(this.boardRec.width/3),
			y:this.boardRec.y+70+(this.boardRec.height/3),
			text:"",
			clickArea:{
				x:this.boardRec.x+((this.boardRec.width/3)),
				y:this.boardRec.y+(this.boardRec.height/3),
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r2c3",
			x:this.boardRec.x+30+((this.boardRec.width/3)*2),
			y:this.boardRec.y+70+(this.boardRec.height/3),
			text:"",
			clickArea:{
				x:this.boardRec.x+(this.boardRec.width/3)+100,
				y:this.boardRec.y+(this.boardRec.height/3),
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		
		this.boardSlots.push({
			id:"r2c1",
			x:this.boardRec.x+30,
			y:this.boardRec.y+70+((this.boardRec.height/3)*2),
			text:"",
			clickArea:{
				x:this.boardRec.x,
				y:this.boardRec.y+(this.boardRec.height/3)*2,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r2c2",
			x:this.boardRec.x+30+(this.boardRec.width/3),
			y:this.boardRec.y+70+((this.boardRec.height/3)*2),
			text:"",
			clickArea:{
				x:this.boardRec.x+((this.boardRec.width/3)),
				y:this.boardRec.y+(this.boardRec.height/3)*2,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
		this.boardSlots.push({
			id:"r2c3",
			x:this.boardRec.x+30+((this.boardRec.width/3)*2),
			y:this.boardRec.y+70+((this.boardRec.height/3)*2),
			text:"",
			clickArea:{
				x:this.boardRec.x+(this.boardRec.width/3)+100,
				y:this.boardRec.y+(this.boardRec.height/3)*2,
				height:this.boardRec.y+((this.boardRec.height/3)-50),
				width:this.boardRec.x+((this.boardRec.width/3)-50)
			}
		});
	}
	
	this.update = function(){
		if(this.delayCounter==0){
			this.mousePos = this.gameEngine.getEventInStack("cursor",false);
			this.cursorBox={
				x:this.mousePos.x,
				y:this.mousePos.y,
				height:2,
				width:2
			}
			for(x=0;x<this.boardSlots.length;x++){
				var slot = this.boardSlots[x];
				var clickArea = this.boardSlots[x].clickArea;
				if(this.gameEngine.collitionDetection(this.cursorBox,clickArea)){
					this.buttonHover=true;
					if(this.mousePos.left){
						this.gameEngine.addEvent({name:this.buttonId,clicked:true});
						this.delayCounter=this.delay;
						if(slot.text==""){
							if(this.playerTurn==0){
								slot.text="X";
								this.playerTurn=1;
							}else{
								slot.text="O";
								this.playerTurn=0;
							}
						}
					}
				}else{
					this.buttonHover=false;
				}
			}
		}else{
			this.delayCounter--;
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
		g.strokeStyle = "black";
		g.strokeRect(this.boardRec.x,this.boardRec.y,this.boardRec.width,this.boardRec.height);
		g.fillStyle = "black";
		g.font="24px Verdana";
		for(x=0;x<this.boardDrawPoints.length;x++){
			g.lineWidth = 2;
			g.beginPath();
			g.moveTo(this.boardDrawPoints[x]['x1'],this.boardDrawPoints[x]['y1']);
			g.lineTo(this.boardDrawPoints[x]['x2'],this.boardDrawPoints[x]['y2']);
			g.stroke();
		}
		for(x=0;x<this.boardSlots.length;x++){
			//g.rect(this.boardSlots[x].clickArea.x,this.boardSlots[x].clickArea.y,this.boardSlots[x].clickArea.width,this.boardSlots[x].clickArea.height);
			//g.fill();
			g.font="54px Verdana";
			g.fillText(""+this.boardSlots[x].text,this.boardSlots[x].x,this.boardSlots[x].y);
		}
		
		
	}

}