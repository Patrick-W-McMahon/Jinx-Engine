

class SpriteSheet {
    constructor(props) {
        super(props);
        this.state = {
            img: new Image(),
            src: props.src,
            texture: null,
            groups: [],
            items: []
        };
    }

    //matrix:[{x,y,h,w}...,]
    //{name,matrix,loop,delay}
    newAnimation(props) {
        const { name, matrix, loop, delay } = props;
        return { name: name || '', matrix: matrix || [], loop: loop || false, delay: delay || 0 };
    }
    
    addAnimation(obj) {
		this.state.groups.push(obj);
	}
    
    getAnimation(name) {
        return this.state.groups.find(grp => grp.name === name);
	}

    newItem(props) {
        const { name, x, y, h, w } = props;
        return { name: name || '', x: x || 0, y: y || 0, h: h || 0, w: w || 0 };
    }

    addItem(obj) {
        this.state.items.push(obj);
    }

    getItem(name) {
        return this.state.items.find(item => item.name === name);
	}

}