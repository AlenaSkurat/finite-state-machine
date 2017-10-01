class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if(config == null) {
            throw new Error();
        } else {
            this.config = config;
            this.state = 'normal';
            this.redoState = [];
            this.redoFlag = false;
            this.history = [];
            return this;
        }          
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var listState = ['normal', 'busy', 'hungry', 'sleeping'];    
        if (listState.indexOf(state) != -1 ) {
            this.history.push(this.state);
            this.state = state;
            this.redoState = [];
            this.redoFlag = false;
        } else {
            throw new Error();
        }
    }
    eat() {
        if (this.state == 'hungry') {
            this.history.push(this.state);
            this.state = 'normal';            
        } else {
            throw new Error();
        }
    }
    study() {
        if (this.state == 'normal') {
            this.history.push(this.state);
            this.state = 'busy';
        } else {
            throw new Error();
        }
    }
    getUp() {
        if (this.state == 'sleeping') {
            this.history.push(this.state);
            this.state = 'normal';
        } else {
            throw new Error();
        }
    }
    getTired() {
        if (this.state == 'busy') {
            this.history.push(this.state);
            this.state = 'sleeping';
        } else {
            throw new Error();
        }
    }
    getHungry() {
        if (this.state == 'sleeping' || this.state == 'busy') {
            this.history.push(this.state);
            this.state = 'hungry';
        } else {
            throw new Error();
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     * 
     */
    
    trigger(event) {

        var status = new Map();
        status.set("study","busy");
        status.set("get_tired","sleeping");
        status.set("get_up","normal");
        status.set("get_hungry","hungry");
        status.set("eat","normal");
        
        this.redoState = [];
        this.redoFlag = false;

        switch(event) {
            case 'eat':  
                return this.eat();
            case 'study': 
                return this.study();
            case 'get_tired': 
                return this.getTired();
            case 'get_up': 
                return this.getUp();
            case 'get_hungry': 
                return this.getHungry();
            default:
                throw new Error();
        }
    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var listState = ['normal', 'busy', 'hungry', 'sleeping'],
            states = [];

        if (event == null) {
            return listState;
        } else {
            switch(event) {
                case 'eat':  
                    return ['hungry'];
                case 'study': 
                    return ['normal'];
                case 'get_tired': 
                    return ['busy'];
                case 'get_up': 
                    return ['sleeping'];
                case 'get_hungry': 
                    return ['busy','sleeping'];
                default:
                    return [];
              }
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length != 0) {
            this.redoState.push(this.state);
            var prevState = this.history.pop();
            this.history.pop();
            this.state = prevState;
            this.redoFlag = true;
        } else{
            return false;
        }
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     *   
     */
    redo() {
        if ((this.history.length != 0 || this.redoState.length != 0) && this.redoFlag) {
            this.state = this.redoState.pop();
            this.redoState.pop();
            return true;
        } else{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
