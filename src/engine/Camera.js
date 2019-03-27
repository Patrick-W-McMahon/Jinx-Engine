function Camera(canvas){
	this.gameEngine;
	this.displayDomId = document.getElementById(canvas);
	this.display = document.getElementById(canvas).getContext(this.context);
	this.getDisplayPixelDensity(canvas,this.display);
	this.viewArea;

	this.inti = function(e){
		this.gameEngine = e;
		var ratio = 1;
			if(context.webkitBackingStorePixelRatio < 2){
				// default to 1 if property not set //
				ratio = window.devicePixelRatio || 1;
			};
			// resize canvas' logical size (ensure CSS maintains original size)//
			var w = context.canvas.width;
			var h = context.canvas.height;
			canvas.attr('width', w*ratio).attr('height', h*ratio);
		  	context.save();
			context.scale(ratio, ratio);
			context.beginPath();
			context.rect(10,10,100,20);
			context.fillStyle = '#CC0000';
			context.strokeStyle = '#000000';
			context.fill();
			context.stroke();
			context.restore();
		}
		
		this.render = function(objects){
			this.clearScreen(this.display);
			for(var x=0;x<objects.length;x++){
				if(typeof(objects[x].isVisable)==='function'){
					if(objects[x].isVisable(this.viewArea)){
						if(typeof(objects[x].draw)==='function'){
							objects[x].draw(this.display);
						}else if(typeof(objects[x].paint)==='function'){
							objects[x].paint(this.display);
						}else if(typeof(objects[x].render)==='function'){
							objects[x].render(this.display);
						}
					}
				}else{
					if(typeof(objects[x].draw)==='function'){
						objects[x].draw(this.display);
					}else if(typeof(objects[x].paint)==='function'){
						objects[x].paint(this.display);
					}else if(typeof(objects[x].render)==='function'){
						objects[x].render(this.display);
					}	
				}
			}
	}
	
	this.clearScreen = function(g){
		g.clearRect(0,0,g.canvas.width,g.canvas.height);
	}

	this.getObjectType = function(){
	  return "camera";
	}

};
