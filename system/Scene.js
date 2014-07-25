function Scene(){
	this.objects=[];
	this.cameraList=[];
	this.gameEngine;
  
	this.init = function(e){
		this.gameEngine = e;
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].init)==='function'){
				this.objects[x].init(this.gameEngine);
			}
		}
		this.updateCameraList();
	}

	this.update = function(){
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].update)==='function'){
				this.objects[x].update();
			}
			if(this.gameEngine.inputActions()){
				if(typeof(this.objects[x].input)==='function'){
					this.objects[x].input(this.gameEngine.keysDown,this.gameEngine.keysPressed,this.gameEngine.keysUp);
				}
			}
			this.gameEngine.engineLog("Event Stack Length: "+this.gameEngine.eventStack.length);
			if(this.gameEngine.eventStack.length>0){
				if(typeof(this.objects[x].EventLisener)==='function'){
					this.objects[x].EventLisener(this.gameEngine.eventStack);
				}
			}
		}
		this.gameEngine.clearKeys();	
	}
	
	this.render = function(g){
		if(this.cameraList.length<1){
			//inject all scene objects into engines object list and let the engine render with old render function
		}else{
			//pass render data to camera let camera handle it. Camera will not need g as it handles its own.
			this.camera[0].render();
		}
	}
	
	this.getObjects = function(){
		return this.objects;
	}
	
	this.updateCameraList = function(){
		this.cameraList=[];
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].getObjectType)==='function'){
				if(this.objects[x].getObjectType()=="camera"){
					 this.cameraList[this.cameraList.length-1]=x;
				}	
			}
		}
	}
	
	this.destroy = function(){
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].destroy)==='function'){
				this.objects[x].destroy();	
			}
		}
	}

};
