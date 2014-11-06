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
	this.keys=[];
	this.keysDown=[];//future depracation
	this.keysUp=[];//future depracation
	this.keysPressed=[];//future depracation
	this.engineMode="live";
	this.frameCount=0;
	this.eventStack=[];
	this.eventStackIndex=0;
	this.activeScene;
	this.mousePos={x:0,y:0};
	this.overrideScreenSizeAjustment=0;
	
	this.init = function(){
		window.requestAnimationFrame = window.requestAnimationFrame || function(callback) { window.setTimeout(callback,16) };
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x].init)==='function'){
				this.objects[x].init(gameEngineThis);
			}
		}
		try{//FF,webkit,opera,IE>8
			this.displayDomId.addEventListener('mousemove', function(e){
				gameEngineThis.mousePos = gameEngineThis.MousePositionToScreen(gameEngineThis.display, e);
			},false);
		}catch(e){//IE>6
			document.attachEvent('onmousemove',function(e){
				gameEngineThis.mousePos = gameEngineThis.MousePositionToScreen(gameEngineThis.display, e);
			});
		}finally{//unsupported browsers
			try{
				document.onmousemove = function(){};
			}catch(die){
				alert('Use a decent browser.');
				location.href = 'http://www.mosilla.org/en-US/firefox/new/';
			}
		}

	}
	
	this.MousePositionToScreen = function(elm,evt){
		var rect = this.displayDomId.getBoundingClientRect();
	        return {
	          x: evt.clientX - rect.left,
	          y: evt.clientY - rect.top
	        };
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
				this.objects[x].update(this);
			}
			if(this.inputActions()){
				if(typeof(this.objects[x].input)==='function'){
					//this.objects[x].input(this.keysDown,this.keysPressed,this.keysUp);
					this.objects[x].input(this.keys);
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
	
	this.getMouse = function(v){
		if(v==undefined){
			return this.mousePos;
		}else{
			switch(v){
				case 'x':
					return this.mousePos.x;
				break;
				case 'y':
					return this.mousePos.y;
				break;
				default:
					return this.mousePos;
				break;
			}
		}
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
		return true;//this will be fixed later this is temp
	}
	
	/* old copy
	this.inputActions = function(){
		if(this.keysDown.length>0||this.keysPressed.length>0||this.keysUp.length>0){
			return true;
		}else{
			return false;
		}
	}
	*/
	/*
	this.clearKeys = function(){
		this.keysDown.clear();
		this.keysPressed.clear();
		this.keysUp.clear();
	}
	*/
	
	document.addEventListener("keydown", function (e) {
    		keys[e.keyCode] = true;
	});
	document.addEventListener("keyup", function (e) {
    		keys[e.keyCode] = false;
	});
	
	/*
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
	*/
	
	
	this.setScene = function(sceneObject){
		this.activeScene.destroy();
		this.activeScene=sceneObject;
		this.activeScene.init();
	};
	
	this.overrideScreenResizer = function(){
		this.overrideScreenSizeAjustment=1;
	}
	/*
	this.getDisplayPixelDensity = function(canvas,context){
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
  		
		//return window.devicePixelRatio;
	}
	*/
	this.getPixelRatio = function () {
		var ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
				  ctx.mozBackingStorePixelRatio ||
				  ctx.msBackingStorePixelRatio ||
				  ctx.oBackingStorePixelRatio ||
				  ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	};
	

	
	this.setDisplay = function(canvas){
		this.displayDomId = document.getElementById(canvas);
		var ratio = this.getPixelRatio();
		var w = this.displayDomId.width;
		var h = this.displayDomId.height;
		this.displayDomId.width = w*ratio;
		this.displayDomId.height = h*ratio;
		this.displayDomId.style.width = w+"px";
		this.displayDomId.style.height = h+"px";
		this.display = document.getElementById(canvas).getContext(this.context);
		//this.getDisplayPixelDensity(canvas,this.display);

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
			}else if(typeof(this.objects[x].render)==='function'){
				this.objects[x].render(this.display);
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
		//this.activeScene.update();
		gameEngineThis.update();
		//this.activeScene.render(gameEngineThis.display);
		gameEngineThis.render(gameEngineThis.display);
		if(gameEngineThis.loopState){
			gameEngineThis.requestID = window.requestAnimationFrame(gameEngineThis.frame);
		}
	}
	
};
