function Button(args){
	this.gameEngine;
	this.mousePos;
	this.buttonHover=false;
	this.buttonText=args.text;
	this.buttionPos = {x:args.x,y:args.y,height:args.height,width:args.width};
	this.buttonColors = {base:args.baseColor,hover:args.hoverColor,font:args.fontColor,border:args.borderColor};
	this.cursorBox;
	this.buttonId = args.id;
	this.delay=30;
	this.delayCounter=0;
	this.fontStyle="24px Verdana";
	

	this.init = function(e){
		this.gameEngine = e;
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
			if(this.gameEngine.collitionDetection(this.cursorBox,this.buttionPos)){
				this.buttonHover=true;
				if(this.mousePos.left){
					this.gameEngine.addEvent({name:this.buttonId,clicked:true});
					this.delayCounter=this.delay;
				}
			}else{
				this.buttonHover=false;
			}
		}else{
			this.delayCounter--;
		}
	}
	
	this.draw = function(g){
		g.beginPath();
		g.strokeStyle=this.buttonColors.border;
		g.font=this.fontStyle;
		if(this.buttonHover){
			g.fillStyle=this.buttonColors.hover;
		}else{
			g.fillStyle=this.buttonColors.base;
		}
		g.rect(this.buttionPos.x,this.buttionPos.y,this.buttionPos.width,this.buttionPos.height);
		g.fill();
		g.stroke();
		g.closePath();
		g.fillStyle=this.buttonColors.font;
		g.fillText(""+this.buttonText,this.buttionPos.x+30,this.buttionPos.y+35);
	}

}