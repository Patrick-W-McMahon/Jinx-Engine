function Scene(){
  this.objects=[];
  this.cameraList=[];
  
	this.init = function(){
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].init)==='function'){
				this.objects[x].init(gameEngineThis);
			}
		}
		this.updateCameraList();
	}

  this.update = function(){
    
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

};
