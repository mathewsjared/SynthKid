
function Synth(context, numberOfVoices, waveType){
    // Properties
      // Context
  var text = context;
      // Number of Voices
  var numVoices = numberOfVoices;
      // Max Gain
  var maxG = 1 / numVoices;
      // Type
  var type = waveType;
      // Graph
        // Master Gain
  var mastGain = text.createGain();
        // Voices
  var voices = initVoices(text, numVoices);
          // Free
  var freeVoices = initFree(numVoices);
          // Active Notes
  var activeNotes = [];

    // Build & Start Graph
  buildAndStartGraph();

    // Interface
      // Add Active Note
  this.fireNote = function(note){
    if(noteIsActive(note,activeNotes).length != 0) { return };

    var voiceInd;
    var voice;

    if(freeVoices.length != 0){
      voiceInd = freeVoices.shift();
      voice = voices[voiceInd];

      voice.gain.gain.value = maxG;
    }
    else {
      var lastNote = activeNotes.shift();

      voiceInd = lastNote.voiceInd;
      voice = voices[voiceInd];
    }

    voice.osc.frequency.value = note.getFreq();

    activeNotes.push({note: note, voiceInd: voiceInd});
  }
      // Remove Active Note
  this.termNote = function(note){
    var noteState = noteIsActive(note,activeNotes);
    if(noteState.length == 0) { return };

    var voiceInd = noteState[0];
    var ageInd = noteState[1];

    var voice = voices[voiceInd];

    voice.gain.gain.value = 0;

    activeNotes.splice(ageInd, 1);
    freeVoices.push(voiceInd);
  }
      // Active Notes
  this.getActives = function(){
    var numKeys = 12;
    var result = [[],[],[],[],[],[],[],[],[],[],[],[]];
    activeNotes.forEach(function(act){
      var note = act.note;
      var key = note.getKey();
      var oct = note.getOct()
      result[key].push(oct);
    });
    return result;
  };

  this.reset = function(){
    activeNotes = [];
    freeVoices = initFree(numVoices);
    voices.forEach(function(voice){
      voice.gain.gain.value = 0;
    });
  };

    // Set Type
  this.setType = function(type){
    if(type == 0){
      type = 'sine';
      updateVoices();
    }
    else if(type == 1){
      type = 'triangle';
      updateVoices();
    }
    else if(type == 2){
      type = 'square';
      updateVoices();
    }
    else if(type == 3){
      type = 'sawtooth';
      updateVoices();
    }

    function updateVoices(){
      voices.forEach(function(voice){
        voice.osc.type = type;
      });
    }
  }

    // Hand-Off
  return this;

  function initVoices(context, numberOfVoices){
    var result = [];
    for (var i = 0; i < numberOfVoices; i++) {
      result.push({
        osc: context.createOscillator(),
        gain: context.createGain()
      });
    }
    return result;
  };

  function initFree(numberOfVoices){
    var result = [];
    for (var i = 0; i < numberOfVoices; i++) {
      result.push(i);
    }
    return result;
  }

  function buildAndStartGraph(){
    mastGain.connect(text.destination);
    mastGain.gain.value = maxG;

    voices.forEach(function(voice){
      voice.osc.connect(voice.gain);
      voice.gain.connect(mastGain);

      voice.gain.gain.value = 0;

      voice.osc.type = type;
      voice.osc.start();
    });
  }

  function noteIsActive(note, activeNotes){
    var result = [];

    for (var i = 0; i < activeNotes.length; i++) {
      if(activeNotes[i].note === note){
        result.push(activeNotes[i].voiceInd);
        result.push(i);
        break;
      };
    }

    return result;
  }
}
