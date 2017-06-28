function Background(){
	//this.gameEngine;
	var mySprite;

	this.init = function(e){
		//this.gameEngine = e;
		var mySpriteSheet = new SpriteSheet("textures/coin-sprite-animation-sprite-sheet.png");
		mySpriteSheet.addAnimation(
			{
				name:"spin",
				matrix:[
					{x:0,y:0,h:44,w:44},
					{x:44*2,y:0,h:44,w:44},
					{x:44*3,y:0,h:44,w:44},
					{x:44*4,y:0,h:44,w:44},
					{x:44*5,y:0,h:44,w:44},
					{x:44*6,y:0,h:44,w:44},
					{x:44*7,y:0,h:44,w:44},
					{x:44*8,y:0,h:44,w:44},
					{x:44*9,y:0,h:44,w:44}
				],
				loop:true,
				delay:2
			}
		);
		mySprite = new Sprite("coin");
		mySprite.init(e);
		mySprite.setPos(100,100,30,30);
		mySprite.setAnimation("spin");
		mySprite.isSpriteSheet=true;
		mySprite.spriteSheet = mySpriteSheet;
		//mySprite.texture = new Texture("textures/coin-sprite-animation-sprite-sheet.png",0,0,50,50);
	}
	
	this.update = function(){
		mySprite.update();
		//var pos = this.mySprite.getPos();
		//this.mySprite.setPos(pos.x+1,pos.y+1,pos.h,pos.w);
	}
	
	this.draw = function(g){
		mySprite.draw(g);
	}
}
