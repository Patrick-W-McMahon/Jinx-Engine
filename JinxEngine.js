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
	this.keys = new Array(400);
	//this.keysDown=[];//future depracation
	//this.keysUp=[];//future depracation
	//this.keysPressed=[];//future depracation
	this.engineMode="live";
	this.frameCount=0;
	this.eventStack=[];
	this.eventStackIndex=0;
	this.activeScene;
	this.mousePos={x:0,y:0,left:false,right:false};
	this.overrideScreenSizeAjustment=0;
	this.currentObjIndex=-1;
	
	window.requestAnimationFrame = window.requestAnimationFrame || function(callback) { window.setTimeout(callback,16) };
	document.addEventListener("keydown",function(e){
		console.log("key "+e.keyCode+" down.");
		gameEngineThis.keys[e.keyCode] = true;
	});
	document.addEventListener("keyup",function(e){
		console.log("key "+e.keyCode+" down.");
		gameEngineThis.keys[e.keyCode] = false;
	});
	
	this.init = function(){
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
		gameEngineThis.displayDomId.addEventListener("mousedown",function(){
			gameEngineThis.mousePos.left=true;
		},false);
	}
	
	this.PlaySound = function(src){
		var snd = new Audio(src); // buffers automatically when created
		snd.play();
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
			if(typeof(this.objects[x])!==undefined){
				obj = this.objects[x];
				if(typeof(obj.update)==='function'){
					this.currentObjIndex = x;
					obj.update(this);
				}
				if(this.inputActions()){
					if(typeof(obj.input)==='function'){
						//this.objects[x].input(this.keysDown,this.keysPressed,this.keysUp);
						obj.input(this.keys);
					}
				}
				gameEngineThis.engineLog("Event Stack Length: "+this.eventStack.length);
				if(this.eventStack.length>0){
					if(typeof(obj.EventLisener)==='function'){
						obj.EventLisener(this.eventStack);
					}
				}
			}else{
				console.log("Object "+x+" is undefined");
			}
		}
		for(var x=0;x<this.objects.length;x++){
			if(typeof(this.objects[x])!==undefined){
				obj = this.objects[x];
				if(typeof(obj.deleteObj)==='function'){
					if(obj.deleteObj()==true){
						this.removeObjectByIndex(x);
					}
				}
			}else{
				this.removeObjectByIndex(x);
			}
		}
		//this.clearKeys();
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
	*/
	this.getGameEngine = function(){
		return gameEngineThis;
	}
	
	this.collitionDetection = function(rect1,rect2){
		if(typeof(rect1)==="undefined"||typeof(rect2)==="undefined"){
			return false;
		}else{
			if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y){
				return true;
			}
		}
		return false;
	}
	
	this.setScene = function(sceneObject){
		gameEngineThis.stop();
		if(gameEngineThis.activeScene!=undefined){
			gameEngineThis.activeScene.destroy();
		}
		gameEngineThis.activeScene=sceneObject;
		gameEngineThis.activeScene.init(gameEngineThis);
		gameEngineThis.start();
	};
	
	this.getActiveScene = function(){
		return gameEngineThis.activeScene;
	}
	
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
	this.getPixelRatio = function () {//This function needs to be fixed should not be looking at "canvas" should be value of the set canvas
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
	
	this.getObjectByIndex = function(i){
		return this.objects[i];
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
		window.cancelAnimationFrame(gameEngineThis.requestID);
		gameEngineThis.requestID = undefined;
	}
	
	this.frame = function(){
		gameEngineThis.frameCount++;
		if(gameEngineThis.activeScene){
			gameEngineThis.activeScene.update();
		}
		gameEngineThis.update();
		if(gameEngineThis.activeScene){
			gameEngineThis.activeScene.render(gameEngineThis.display);
		}else{
			gameEngineThis.render(gameEngineThis.display);
		}
		if(gameEngineThis.loopState){
			window.cancelAnimationFrame(gameEngineThis.requestID);
			gameEngineThis.requestID = undefined;
			gameEngineThis.requestID = window.requestAnimationFrame(gameEngineThis.frame);
		}
	}
	
};

function ArcObject(x,y,radius,startAngle,endAngle,anticlockwise){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.startAngle=startAngle;
	this.endAngle=endAngle;
	this.anticlockwise=anticlockwise;
	this.path = new Path2D();
	this.path.arc(x,y,radius,startAngle,endAngle,anticlockwise);
	this.path.closePath();
	this.g=false;
	
	this.getObjType = function(){
		return "Arc";
	}
	
	this.pointIntersects = function(x,y){
		var ranges={
			x1:this.x-this.radius,
			x2:this.x+this.radius,
			y1:this.y-this.radius,
			y2:this.y+this.radius
		}
		if(point.x>=ranges.x1&&point.x<=ranges.x2&&point.y>=ranges.y1&&point.y<=ranges.y2){
			//work on this
		}
		return false;
	}
	
	this.pointIn = function(x,y){
		if(this.g){
			return this.g.isPointInPath(this.path,x,y);
		}
	}
	
	this.rectIntersects = function(rect){
		//work on this
	}
	
	this.getPath = function(g){
		this.g=g;
		return this.path;
	}
}

function Rectangle(x,y,h,w){
	this.x=x;
	this.y=y;
	this.height=h;
	this.width=w;
	this.path = new Path2D();
	this.path.rect(x,y,h,w);
	this.path.closePath();
	this.g=false;
	this.roundedSides={tl:0,tr:0,bl:0,br:0};
	
	this.getObjType = function(){
		return "Rectangle";
	}
	
	this.rounding = function(side,radius){
		switch(side){
			case "tl":
				this.roundedSides.tl=radius;
			break;
			case "tr":
				this.roundedSides.tr=radius;
			break;
			case "bl":
				this.roundedSides.bl=radius;
			break;
			case "br":
				this.roundedSides.br=radius;
			break;
			case "all":
			default:
				this.roundedSides.tl=radius;
				this.roundedSides.tr=radius;
				this.roundedSides.bl=radius;
				this.roundedSides.br=radius;
		}
		if(this.hasRoundedCorners()){
			this.path.moveTo(x,y+radius);
			this.path.lineTo(x,y+height-radius);
			this.path.quadraticCurveTo(x,y+height,x+radius,y+height);
			this.path.lineTo(x+width-radius,y+height);
			this.path.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
			this.path.lineTo(x+width,y+radius);
			this.path.quadraticCurveTo(x+width,y,x+width-radius,y);
			this.path.lineTo(x+radius,y);
			this.path.quadraticCurveTo(x,y,x,y+radius);
			this.path.closePath();
		}else{
			this.path.rect(this.x,this.y,this.h,this.w);
		}
	}
	
	this.hasRoundedCorners = function(){
		if(this.roundedSides.tl>0||this.roundedSides.tr>0||this.roundedSides.bl>0||this.roundedSides.br>0){
			return true;
		}
		return false;
	}
	
	this.RectIntersects = function(rect){
		if(typeof(rect)==="undefined"){
			return false;
		}else{
			if(this.x < rect.x + rect.width && this.x + this.width > rect.x && this.y < rect.y + rect.height && this.height + this.y > rect.y){
				return true;
			}
		}
		return false;
	}
	
	this.pointIn = function(x,y){
		if(this.g){
			return this.g.isPointInPath(this.path,x,y);
		}
	}
	
	this.getPath = function(g){
		this.g=g;
		return this.path;
	}	
}

/*
*Basic Texture object that is used to define a texture that will be drawn by a sprite
*/
function Texture(src,x,y,h,w){
	var img  = new Image(); 
	img.src=src;
	this.img = img;
	this.x=x;
	this.y=y;
	this.h=h;
	this.w=w;
}

/*
*Sprite sheet that is a more complex texture that holds many small textures that are used by a sprite for animation
*/
function SpriteSheet(src){
	var img  = new Image(); 
	img.src=src;
	this.texture=img;
	this.spriteGroups=[];
	this.sheetItems=[];
	
	this.addAnimation = function(obj){//{name:,matrix:[{x,y,h,w}...,],loop,delay}
		this.spriteGroups.push(obj);
	}
	
	this.getAnimation = function(name){
		for(x=0;x<this.spriteGroups.length;x++){
			if(this.spriteGroups[x].name==name){
				return this.spriteGroups[x];
			}
		}
	}
	
	this.addItem = function(obj){//{name,x,y,h,w}
		this.sheetItems.push(obj);
	}
	
	this.getItem = function(name){
		for(x=0;x<this.sheetItems.length;x++){
			if(this.sheetItems[x].name==name){
				return this.sheetItems[x];
			}
		}
	}
	
}

/*
*The Sprite object defines the most basic drawing element. It uses textures to draw an object onto the screen.
*/
function Sprite(eId){
	this.gameEngine;
	this.texture;
	this.curTexPos;
	this.canvasPos;
	this.isSpriteSheet;
	this.spriteSheet;
	this.timelaps;
	this.frameCount=0;
	this.currentAnimation;
	this.firstRun=1;
	this.animation;
	this.clickDelay=30;
	this.delayCounter=0;
	this.eventId=eId;
	this.cursorHover=false;
	
	this.init = function(e){
		this.gameEngine = e;
	}
	
	this.update = function(){
		var mousePos = this.gameEngine.getEventInStack("cursor",false);
		var cursorBox={
			x:mousePos.x,
			y:mousePos.y,
			height:2,
			width:2
		}
		if(this.gameEngine.collitionDetection(cursorBox,this.canvasPos)){
			this.cursorHover=true;
			if(this.mousePos.left){
				if(this.delayCounter==0){
					this.gameEngine.addEvent({name:this.eventId,clicked:true});
					this.delayCounter=this.clickDelay;
				}else{
					this.delayCounter--;
				}
			}
		}else{
			this.buttonHover=false;
		}
		var currentAnimation = this.spriteSheet.getAnimation(this.animation);
		this.timelaps++;
		if(this.timelaps>currentAnimation.delay||this.firstRun==1){
			this.firstRun=0;
			this.timelaps=0;
			var curMa = currentAnimation.matrix;
			var curAnSize = curMa.length-1;
			if(this.frameCount>curAnSize){
				if(currentAnimation.loop==true){
					this.frameCount=0;
				}else{
					this.frameCount=curAnSize;
				}
			}
			var crm = curMa[this.frameCount];
			this.curTexPos={
				x:crm.x,
				y:crm.y,
				h:crm.h,
				w:crm.w
			}
			this.frameCount++;
		}
	}
	
	this.setAnimation = function(animation){
		this.animation = animation;
	}
	
	this.setPos = function(x,y,h,w){
		this.canvasPos={x:x,y:y,h:h,w:w}
	}
	
	this.getPos = function(){
		return this.canvasPos;
	}
	
	//this.isHover
	
	this.draw = function(g){
		var texture,tx,ty,tw,th,cx,cy,cw,ch;
		cx = this.canvasPos.x;
		cy = this.canvasPos.y
		cw = this.canvasPos.w;
		ch = this.canvasPos.h;
		if(this.isSpriteSheet){
			tx = this.curTexPos.x;
			ty = this.curTexPos.y;
			tw = this.curTexPos.w;
			th = this.curTexPos.h;
			texture = this.spriteSheet.texture;
		}else{
			tx = this.texture.x;
			ty = this.texture.y;
			tw = this.texture.w;
			th = this.texture.h;
			texture = this.texture.img;
		}
		g.drawImage(texture,tx,ty,tw,th,cx,cy,cw,ch);
	}
}
