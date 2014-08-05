var myDom = new DOM();
var myEngine = new GameEngine();
myEngine.engineMode="live";
var gamePaused=0;
myDom.OnReady(function(){
	myEngine.setDisplay("chart");
	myDom.getId("startLineButton").addEventListener("click", function(){
		myEngine.stop();
		var chartId = myEngine.addObject(new LineChart());
		myEngine.init();
		myEngine.start();
	}, false);
	myDom.getId("startBarButton").addEventListener("click", function(){
		myEngine.stop();
		var chartId = myEngine.addObject(new BarChart());
		myEngine.init();
		myEngine.start();
	}, false);
	myDom.getId("startPieButton").addEventListener("click", function(){
		myEngine.stop();
		var chartId = myEngine.addObject(new PieChart());
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