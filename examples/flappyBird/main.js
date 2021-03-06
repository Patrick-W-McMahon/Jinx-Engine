var myDom = new DOM();
var myEngine = new GameEngine();
myEngine.engineMode="live";
var gamePaused=0;
myDom.OnReady(function(){
	myEngine.setDisplay("screen");
	myDom.getId("newGameButton").addEventListener("click", function(){
		myEngine.stop();
		var mainMenu = new Scene();
		var menuUI = mainMenu.addObject(new MenuUI());
		var tmpCur = new Cursor("image");
		tmpCur.imgSrc="cursor.png";
		var cursor = mainMenu.addObject(tmpCur);
		//var cursor = mainMenu.addObject(new Cursor());
		myEngine.setScene(mainMenu); 
		myEngine.init();
		myEngine.start();
	}, false);
	myDom.getId("PauseButton").addEventListener("click", function(){
		if(gamePaused){
			myEngine.start();
			gamePaused=0;
		}else{
			myEngine.pause();
			gamePaused=1;
		}
		
	}, false);
	myDom.getId("quitButton").addEventListener("click", function(){
		myEngine.stop();
	}, false);
});