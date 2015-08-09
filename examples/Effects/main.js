var myDom = new DOM();
var myEngine = new GameEngine();
myEngine.engineMode="live";
var gamePaused=0;
myDom.OnReady(function(){
	myEngine.setDisplay("screen");
	myDom.getId("newFireButton").addEventListener("click", function(){
		myEngine.stop();
		var particalId = myEngine.addObject(new SpawnPoint());
		var hudId = myEngine.addObject(new HUD());
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