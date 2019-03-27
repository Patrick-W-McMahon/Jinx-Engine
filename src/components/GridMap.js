function GridMap(){
	this.gameEngine;
	this.spriteSheet;
	this.gridData;
	this.drawables = [];
	this.totalTiles;
	this.tiles = [];
	this.collisionRects=[];
	
	this.init = function(e,arg){
		this.gameEngine = e;
		this.spriteSheet = arg.spriteSheet;
		this.gridData=arg.grid;
		var rows = this.gridData.data[0].length;
		var cols = this.gridData.data.length;
		for(x=0;x<rows;x++){
			for(y=0;y<cols;y++){
				var grid_data="";
				var mapRow = this.gridData.data[y];
				var map = mapRow[x];
				this.gridData.key.forEach(function(key){
					if(key.name == map){
						var clRc=false;
						if(key.collisionBox){
							clRc=true;
						}
						grid_data={
							x:key.x,
							y:key.y,
							h:key.h,
							w:key.w,
							colRec:clRc
						};
					}
				});
				if(grid_data.colRec){
					this.collisionRects.push({
						x:this.gridData.perams.w*x,
						y:this.gridData.perams.h*y,
						w:this.gridData.perams.w,
						h:this.gridData.perams.h
					});
				}
				this.tiles.push({
					pos:{
						x:this.gridData.perams.w*x,
						y:this.gridData.perams.h*y,
						w:this.gridData.perams.w,
						h:this.gridData.perams.h
					},
					texture:{
						x:grid_data.x,
						y:grid_data.y,
						w:grid_data.w,
						h:grid_data.h
					}
				});
			}
		}
	}
	
	this.update = function(){
		
	}
	
	this.collisionCheck = function(testRect){//{x,y,h,w}
		var tempEng = this.gameEngine;
		//console.log("Rec Count "+this.collisionRects.length);
		this.collisionRects.forEach(function(rec){
			//console.log("test");
			//console.log(rec);
			//console.log("player");
			//console.log(testRect);
			if(tempEng.collitionDetection(testRect,rec)){
				//console.log("HIT");
				return true;
			}
		});
		return false;
	}
	
	this.draw = function(g){
		var texture = this.spriteSheet.texture;
		this.tiles.forEach(function(tile){
			var tx,ty,tw,th,cx,cy,cw,ch;
			cx = tile.pos.x;
			cy = tile.pos.y
			cw = tile.pos.w;
			ch = tile.pos.h;
			tx = tile.texture.x;
			ty = tile.texture.y;
			tw = tile.texture.w;
			th = tile.texture.h;
			g.drawImage(texture,tx,ty,tw,th,cx,cy,cw,ch);
		});
	}


}
