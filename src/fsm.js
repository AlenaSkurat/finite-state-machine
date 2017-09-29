/*
    #trigger
      5) changes initial state according to event
      6) correctly changes states [3 in row]
      7) correctly changes states [circular]
      8) throws an exception if event in current state isn't exist
    #getStates
      10) returns all states if argument is empty
      11) returns correct states for event
      12) returns empty array for not valid array
    #undo
      13) returns false for initial FSM
      14) goes back to prev step after trigger
      15) goes back to prev after changeState
      16) returns true if transition was successful
      17) returns false if undo is not available
    #redo
      18) returns false for initial FSM
      19) cancels undo
      20) returns true if transition was successful
      21) returns false if redo is not available
      22) correct cancels multiple undos
      23) disables redo after trigger call
      24) disables redo after changeState call
    #clearHistory
      25) clears transition history
*/

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
        if (state != this.state && listState.indexOf(state) != -1 ) {
            this.state = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        var status = new Map();
        status.set("study","busy");
        status.set("get tired","sleeping");
        status.set("get up","normal");
        status.set("get hungry","hungry");
        status.set("eat","normal");

        var move = [
            ['normal','study'],
            ['busy','get tired'],
            ['busy','get hungry'],
            ['sleeping','get up'],
            ['sleeping','get hungry'],
            ['hungry','eat']
          ];
        
        var list = [];

        for (var i = 0; i< move.length; i++) {
            if (move[i][0] == this.state) {
                list.push(move[i][1]);
            }         
        }
        this.state = status.get(event);
        /*if (move.indexOf(event) != -1) {
            this.state = status.get(event);
        } else {
            throw new Error();
        }*/
        

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
        var listState = ['normal', 'busy', 'hungry', 'sleeping'];
        if (event == null) {
            return listState;
        } else {

        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
