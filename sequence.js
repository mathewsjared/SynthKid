
function Sequence(resolution){
    // Properties
      // Resolution
  var res = resolution;
      // Sequence
  var seq = initSeq(res + 1); // Added One For Terminal Event

    // Interface
      // Resolution
  this.getRes = function(){
    return res;
  }
      // Add High
  this.addHigh = function(note,origin,length){
    // Add Terminate
    seq[origin + length].off.push(note);
    // Add Fire
    seq[origin].on.push(note);
  }
      // Read Sequence
  this.readSeq = function(callback){
    seq.forEach(callback);
  }

    // Hand-Off
  return this;

  function initSeq(resolution){
    var result = [];
    for (var i = 0; i < resolution; i++) {
      result.push({
        off: [],
        on: []
      });
    }
    return result;
  }
}
