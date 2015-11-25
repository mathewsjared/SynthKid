
function compSeqParts(time, seq, synth, circViz, ract){
  var actions = [];

  seq.readSeq(function(moment, momInd){
    if(moment.off.length > 0 || moment.on.length > 0){
      actions.push(function(){
          moment.off.forEach(function(note, numInd){
            synth.termNote(note);
          });

          moment.on.forEach(function(note, numInd){
            synth.fireNote(note);
          });

          circViz.render(synth.getActives(), ract.display.struct.core.html.style.width);
      });
    }
  });

  synth.reset();

  circViz.render(synth.getActives(), ract.display.struct.core.html.style.width);

  return actions
}
