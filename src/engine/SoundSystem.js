

class SoundSystem {
    constructor(props) {
        super(props);
    }
    
    play(src) {
        const snd = new Audio(src);
        snd.play();
    }
}

export default SoundSystem;