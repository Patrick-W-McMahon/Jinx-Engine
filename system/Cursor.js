function Cursor(t){
	this.gameEngine;
	this.mousePos;
	this.type=t;
	this.img;
	this.imgSrc;

	this.init = function(e){
		this.gameEngine = e;
		if(this.type==false){
			this.type="crosshair";
		}
	}
	
	this.update = function(){
		this.mousePos=this.gameEngine.getMouse();
		this.gameEngine.getEventInStack("cursor",true);
		this.gameEngine.addEvent({name:"cursor",x:this.mousePos.x,y:this.mousePos.y,left:this.mousePos.left});
		if(this.type=="image"){
			this.img  = new Image();
			this.img.src = this.imgSrc;
		}
	}
	
	this.drawCrossHair = function(g){
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
	
	this.drawDefault = function(g){
		g.fillStyle = "white";
		g.strokeStyle="black";
		g.lineWidth = 1.5;
		g.beginPath();
		g.moveTo(this.mousePos.x,this.mousePos.y);
		g.lineTo(this.mousePos.x+13,this.mousePos.y);
		g.lineTo(this.mousePos.x+8,this.mousePos.y+5);
		g.lineTo(this.mousePos.x+15,this.mousePos.y+10);
		g.lineTo(this.mousePos.x+12,this.mousePos.y+13);
		g.lineTo(this.mousePos.x+5,this.mousePos.y+7);
		g.lineTo(this.mousePos.x,this.mousePos.y+12);
		g.closePath();
		g.fill();
		g.stroke();
	}
	
	this.draw = function(g){
		switch(this.type){
			case "crosshair":
				this.drawCrossHair(g);
			break;
			case "image":
				g.drawImage(this.img,this.mousePos.x,this.mousePos.y,40,40);
			break;
			default:
				this.drawDefault(g);
			break;
		}
	}

}