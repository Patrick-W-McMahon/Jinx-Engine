function Camera(canvas){
	this.gameEngine;
	this.displayDomId = document.getElementById(canvas);
	this.display = document.getElementById(canvas).getContext(this.context);
	this.getDisplayPixelDensity(canvas,this.display);this.

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
		  this.clearScreen(g);
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].draw)==='function'){
				this.objects[x].draw(this.display);
			}else if(typeof(this.objects[x].paint)==='function'){
				this.objects[x].paint(this.display);
			}else if(typeof(this.objects[x].render)==='function'){
				this.objects[x].render(this.display);
			}
		}
	}

  this.getObjectType = function(){
  	return "camera";
  }

};
