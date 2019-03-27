
/*
*The Sprite object defines the most basic drawing element. It uses textures to draw an object onto the screen.
*/

class Sprite {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            texture: null,
            animation: null,
            canvasPos: { x: 0, y: 0, h: 0, w: 0 },
            texPos:  { x: 0, y: 0, h: 0, w: 0 },
            isSpriteSheet: false,
            spriteSheet: null
        };
    }

    update() {

    }

    setAnimation(animation) {
        this.state.animation = animation;
    }

    setPos(x,y,h,w) {
		this.state.canvasPos={ x, y, h, w }
	}
	
	getPos() {
		return this.state.canvasPos;
    }
    
    render(){
        const { g } = this.props;
        const { canvasPos, isSpriteSheet, texPos, img, texture } = this.state;
        const { x: cx, y: cy, w: cw, h: ch } = canvasPos;
		if(isSpriteSheet){
            const { src } = this.state.spriteSheet;
            const { x: tx, y: ty, w: tw, h: th } = texPos;
            g.drawImage(src,tx,ty,tw,th,cx,cy,cw,ch);
		}else{
            const { x: tx, y: ty, w: tw, h: th, src } = texture;
			g.drawImage(src,tx,ty,tw,th,cx,cy,cw,ch);
		}
	}
}

export default Sprite;