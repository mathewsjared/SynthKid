function Perspective() {
    // Should Debug
  this.awake = true;

    // Current State
  var state = [];

    // Console Spacer
  var preSpace = '';

    // Return Blank Perspective
  return {
    awake: this.awake,
    enter: enterScope,
    exit: exitScope,
    print: print
  }

  // Functionality
    // Enter Scope
  function enterScope(scope) {
    state.push(scope);

    if(this.awake) {
      printState();
    }

    preSpace += '\t';
  };
    // Exit Scope
  function exitScope(scope) {
    preSpace = preSpace.substring(0, preSpace.length - 1);
    
    if(this.awake) {
      printState();
    }

    state.pop(scope);
  }
    // Print In Scope
  function print(object) {
    if(this.awake) {
      printState();
      for(var key in object) {
        console.log(preSpace + '\t' + key + ': ' + object[key]);
        console.log('');
      }
    }
  }
    // Convert State to String
  function stateToString() {
    var depth = state.length - 1;
    return preSpace + '(' + state[depth] + ', ' + (depth) + ')';
  }
    // Print State
  function printState() {
    console.log(stateToString());
    console.log('');
  }
}
