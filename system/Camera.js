function Camera(canvas){
  this.displayDomId = document.getElementById(canvas);
  this.display = document.getElementById(canvas).getContext(this.context);
  this.getDisplayPixelDensity(canvas,this.display);this.

  this.inti = function(){
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

};
