
function compPlaySeq(seq,synth,circViz,time){
  var actions = [];
  var timeStep = time / seq.getRes();

  seq.readSeq(function(moment, momInd){
    var currentTime = momInd * timeStep;

    actions.push(function(){
      window.setTimeout(function(){
        moment.off.forEach(function(note, numInd){
          synth.termNote(note);
        });
      },currentTime);
    });

    actions.push(function(){
      window.setTimeout(function(){
        moment.on.forEach(function(note, numInd){
          synth.fireNote(note);
        });
        circViz.render(synth.getActives());
      },currentTime);
    });
  });

  return function(){
    actions.forEach(function(action){
      action();
    });
  };
}
