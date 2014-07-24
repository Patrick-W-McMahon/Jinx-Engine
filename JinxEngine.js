function GameEngine(){
	this.objects=[];
	this.loopState;
	this.loopId;
	this.objectIndexCounter=0;
	this.display;
	this.context='2d';
	gameEngineThis = this;
	this.displayDomId;
	this.requestID;
	this.keysDown=[];
	this.keysUp=[];
	this.keysPressed=[];
	this.engineMode="live";
	this.frameCount=0;
	this.eventStack=[];
	this.eventStackIndex=0;
	
	this.init = function(){
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].init)==='function'){
				this.objects[x].init(gameEngineThis);
			}
		}
	}
	
	this.update = function(){
		if(this.eventStack.length>0){
			var event = this.getEventInStack("GameEngine",true);
			if(event){
				gameEngineThis.engineLog("Game Engine Message Received ("+event.message+")");
				switch(event.message){
					case "start":
						this.start();
					break;
					case "pause":
						this.pause();
					break;
					case "stop":
						this.stop();
					break;
				}
			}
		}
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].update)==='function'){
				this.objects[x].update();
			}
			if(this.inputActions()){
				if(typeof(this.objects[x].input)==='function'){
					this.objects[x].input(this.keysDown,this.keysPressed,this.keysUp);
				}
			}
			gameEngineThis.engineLog("Event Stack Length: "+this.eventStack.length);
			if(this.eventStack.length>0){
				if(typeof(this.objects[x].EventLisener)==='function'){
					this.objects[x].EventLisener(this.eventStack);
				}
			}
		}
		this.clearKeys();
	}
	
	this.Event = function(){
		this.id;
		this.name;
		this.data=[];
		return this;
	}
	
	this.getEventInStack = function(name,consume){
		var index = this.getIndexOfEventByName(name);
		if(index>-1){
			var event = this.eventStack[index];
			if(consume){
				this.removeEventByIndex(index);
			}
			return event;
		}else{
			return false;
		}
	}
	
	this.addEvent = function(e){
		this.eventStack.push(e);
		if(this.eventStack.lenth<=this.eventStackIndex){
			this.eventStack[this.eventStack.length-1].id=this.eventStackIndex;
		}else{
			this.eventStack[this.eventStack.length-1].id=this.eventStack.length;
		}
		this.eventStackIndex++;
		return this.eventStack[this.eventStack.length-1].id;//return the event id
	}
	
	this.removeEvent = function(id){//pass id of event
		this.removeEventByIndex(this.getIndexOfEvent(id));
	}
	
	this.purgeEvents = function(){
		this.eventStack.clear();
	}
	
	this.getIndexOfEventByName = function(name){
		var index = -1;
		for(var i=0;i<this.eventStack.length;i++){
			if(this.eventStack[i].name === name){
				index = i;
				break;
			}
		}
		return index;
	}
	
	this.getIndexOfEvent = function(v){//pass id of event
		var index = -1;
		for(var i=0;i<this.eventStack.length;i++){
			if(this.eventStack[i].id === v){
				index = i;
				break;
			}
		}
		return index;
	}
	
	this.removeEventByIndex = function(i){//pass index of event
		this.eventStack.splice(i,1);
	}
	
	this.engineLog = function(message){
		if(this.engineMode=="test"){
			console.log("Game Engine: "+message);
		}
	}
	
	this.inputActions = function(){
		if(this.keysDown.length>0||this.keysPressed.length>0||this.keysUp.length>0){
			return true;
		}else{
			return false;
		}
	}
	
	this.clearKeys = function(){
		this.keysDown.clear();
		this.keysPressed.clear();
		this.keysUp.clear();
	}
	
	window.onkeydown = function(e){
		if(gameEngineThis.loopState){
			gameEngineThis.engineLog("Key Down "+e.keyCode);
			gameEngineThis.engineLog("key index "+gameEngineThis.keysDown.indexOf(e.keyCode));
			if(gameEngineThis.keysDown.indexOf(e.keyCode)==-1){
				gameEngineThis.engineLog("key code added");
				gameEngineThis.keysDown.push(e.keyCode);
			}
		}
		
	};
	
	this.setDisplay = function(canvas){
		this.displayDomId = document.getElementById(canvas);
		this.display = document.getElementById(canvas).getContext(this.context);
	}
	
	this.addObject = function(o){//pass object
		this.objects.push(o);
		if(this.objects.lenth<=this.objectIndexCounter){
			this.objects[this.objects.length-1].id=this.objectIndexCounter;
		}else{
			this.objects[this.objects.length-1].id=this.objects.length;
		}
		this.objectIndexCounter++;
		return this.objects[this.objects.length-1].id;//return the objects id
	}
	
	this.purgeObjects = function(){
		this.objects.clear();
	}
	
	this.removeObject = function(id){//pass id of object
		this.removeObjectByIndex(this.getIndexOfObject(id));
	}
	
	this.getIndexOfObject = function(v){//pass id of object
		var index = -1;
		for(var i=0;i<this.objects.length;i++){
			if(this.objects[i].id === v){
				index = i;
				break;
			}
		}
		return index;
	}
	
	this.removeObjectByIndex = function(i){//pass index of object
		this.objects.splice(i,1);
	}
	
	this.getDisplayHeight = function(){
		return this.displayDomId.height;
	}
	
	this.getDisplayWidth = function(){
		return this.displayDomId.width;
	}
	
	this.getDisplay = function(t){
		switch(t){
			case "heightCenter":
				return this.displayDomId.height/2;
			break;
			case "widthCenter":
				return this.displayDomId.width/2;
			break;
			case "height":
				return this.displayDomId.height;
			break;
			case "width":
				return this.displayDomId.width;
			break;
		}
	}
	
	this.clearScreen = function(g){
		g.clearRect(0,0,g.canvas.width,g.canvas.height);
		//g.clearRect (0,0,this.getDisplayWidth(),this.getDisplayHeight());
	}
	
	this.render =  function(g){
		this.clearScreen(g);
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].draw)==='function'){
				this.objects[x].draw(this.display);
			}else if(typeof(this.objects[x].paint)==='function'){
				this.objects[x].paint(this.display);
			}
		}
	}
	
	this.start = function(){
		this.loopState=1;
		this.frame();
	}
	
	this.pause = function(){
		this.loopState=0;
	}
	
	this.stop = function(){
		this.loopState=0;
		this.purgeEvents();
		this.purgeObjects();
		this.frameCount=0;
		this.render(this.display);
	}
	
	this.frame = function(){
		gameEngineThis.frameCount++;
		gameEngineThis.update();	
		gameEngineThis.render(gameEngineThis.display);
		if(gameEngineThis.loopState){
			gameEngineThis.requestID = window.requestAnimationFrame(gameEngineThis.frame);
		}
	}
	
};