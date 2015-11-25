
function Note(octaveNum, keyNum){
    // Properties
      // Octave
  var oct = octaveNum;
      // Note
  var key = keyNum;
      // Frequency
  var freq = compFreq(oct,key);

    // Interface
      // Octave
  this.getOct = function(){
    return oct;
  };
      // Note
  this.getKey = function(){
    return key;
  };
      // Frequency
  this.getFreq = function(){
    return freq;
  };

    // Hand-Off
  return this;

  function compFreq(oct,note){
    var minN = 28;
    var numNotes = 12;
    var n = (oct * numNotes) + note + minN;
    var exp = (n - 49) / numNotes;
    var freqCo = Math.pow(2, exp);
    var middleA = 440;
    return freqCo * middleA;
  }
}
