function Scene(){
	this.objects=[];
	this.cameraList=[];
	this.gameEngine;
	this.objectIndexCounter=0;
  
	this.init = function(e){
		this.gameEngine = e;
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].init)==='function'){
				this.objects[x].init(this.gameEngine);
			}
		}
		//this.updateCameraList();
	}

	this.update = function(){
		
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x])!==undefined){
				obj = this.objects[x];
				if(typeof(obj.update)==='function'){
					obj.update();
				}
				if(this.gameEngine.inputActions()){
					if(typeof(obj.input)==='function'){
						//this.objects[x].input(this.keysDown,this.keysPressed,this.keysUp);
						obj.input(this.gameEngine.keys);
					}
				}
				/*
				if(this.gameEngine.inputActions()){
					if(typeof(this.objects[x].input)==='function'){
						this.objects[x].input(this.gameEngine.keysDown,this.gameEngine.keysPressed,this.gameEngine.keysUp);
					}
				}*/
				this.gameEngine.engineLog("Event Stack Length: "+this.gameEngine.eventStack.length);
				if(this.gameEngine.eventStack.length>0){
					if(typeof(obj.EventLisener)==='function'){
						obj.EventLisener(this.gameEngine.eventStack);
					}
				}
			}
		}
		
		//this.gameEngine.clearKeys();	
	}
	
	this.render = function(g){
		this.gameEngine.clearScreen(g);
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].draw)==='function'){
				this.objects[x].draw(this.gameEngine.display);
			}else if(typeof(this.objects[x].paint)==='function'){
				this.objects[x].paint(this.gameEngine.display);
			}else if(typeof(this.objects[x].render)==='function'){
				this.objects[x].render(this.gameEngine.display);
			}
		}
	/*
		if(this.cameraList.length<1){
			//inject all scene objects into engines object list and let the engine render with old render function
		}else{
			//pass render data to camera let camera handle it. Camera will not need g as it handles its own.
			this.camera[0].render();
		}
	*/
	}
	
	this.changeScene = function(scene){
		this.gameEngine.setScene(scene);
	}
	
	this.addObject = function(o){
		this.objects.push(o);
		if(this.objects.lenth<=this.objectIndexCounter){
			this.objects[this.objects.length-1].id=this.objectIndexCounter;
		}else{
			this.objects[this.objects.length-1].id=this.objects.length;
		}
		this.objectIndexCounter++;
		return this.objects[this.objects.length-1].id;//return the objects id
	}
	
	this.getObjects = function(){
		return this.objects;
	}
	
	this.purgeObjects = function(){
		this.objects.clear();
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
