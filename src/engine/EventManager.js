

class EventManager {
    constructor(props) {
        super(props);
        this.state = {
            stack: []
        };
    }

    getNewEvent() {
        return {
            id:'',
            name: '',
            data: []
        };
    }

    add(event) {

    }

    removeByIndex(index) {

    }

    purge(event) {

    }
}

export default EventManager;