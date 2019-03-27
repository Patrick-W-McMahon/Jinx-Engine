// import Jinx, { Display, Scene } from '../../../dist/jinx';
import GameScene from './gameScene';

console.log("pong");
// const myEngine = new Jinx();

class Game {
	constructor() {
		// myEngine.registerScene('game', new GameScene() );
	}

}

/*
var myDom = new DOM();
var myEngine = new GameEngine();
myEngine.engineMode="live";
var gamePaused=0;
myDom.OnReady(function(){
	myEngine.setDisplay("screen");
	myDom.getId("newGameButton").addEventListener("click", function(){
		myEngine.stop();
		var hudId = myEngine.addObject(new HUD());
		var playerOneId = myEngine.addObject(new Player("left","red","Player One"));
		var playerTwoId = myEngine.addObject(new Player("right","blue","Player Two"));
		var ballId = myEngine.addObject(new Ball());
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
*/