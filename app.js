var debug = new Perspective();

window.onload = function() {
  debug.enter('window.onload');
  ////

  var rootColor = new Color(41, 41, 41, 1);

  document.body.style.backgroundColor = new Color(141,141,141,1);

  var rootRect = new Rect(0, 0, window.innerWidth, window.innerHeight, new Color(128,128,128,0));

  document.body.appendChild(rootRect.html);

  var ractColor = new Color(241, 241, 241, 1);

  var ract = new Ract(rootRect, 1 / 23, { num: 3, den: 8 }, ractColor, rootColor);

  ract.display.struct.base.color = new Color(41, 41, 41, 1);
  ract.display.struct.brane.color = new Color(241, 241, 241, 1);
  ract.display.struct.core.color = new Color(41, 41, 41, 1);

  ract.hub.struct.base.color = ractColor;
  ract.hub.struct.brane.color =  new Color(41, 41, 41, 1);
  ract.hub.struct.core.color = ractColor;

  ract.zero.struct.base.color = new Color(41, 41, 41, 1);
  ract.zero.struct.brane.color = new Color(51, 105, 232, 0.75); // rgb(51,105,232)
  ract.zero.struct.core.color = new Color(241, 241, 241, 0.75);

  ract.one.struct.base.color =  new Color(41, 41, 41, 1);
  ract.one.struct.brane.color = new Color(223, 15, 37, 0.75); // rgb(223,15,37)
  ract.one.struct.core.color = new Color(241, 241, 241, 0);

  ract.two.struct.base.color =  new Color(41, 41, 41, 1);
  ract.two.struct.brane.color = new Color(238, 178, 17, 0.75); // rgb(238,178,17)
  ract.two.struct.core.color = new Color(241, 241, 241, 0);

  ract.three.struct.base.color =  new Color(41, 41, 41, 1);
  ract.three.struct.brane.color = new Color(0, 153, 37, 0.75); // rgb(0,153,37)
  ract.three.struct.core.color = new Color(241, 241, 241, 0);

  ract.seq0.struct.base.color = new Color(41, 41, 41, 0);
  ract.seq0.struct.brane.color = new Color(51, 105, 232, 0.75);
  ract.seq0.struct.core.color = new Color(41, 41, 41, 0);

  ract.seq1.struct.base.color = new Color(41, 41, 41, 1);
  ract.seq1.struct.brane.color = new Color(241, 241, 241, 1);
  ract.seq1.struct.core.color = new Color(41, 41, 41, 0);

  ract.seq2.struct.base.color = new Color(41, 41, 41, 1);
  ract.seq2.struct.brane.color = new Color(241, 241, 241, 1);
  ract.seq2.struct.core.color = new Color(241, 241, 241, 0);

  ract.render(function(){});

  /////////////////////////

  var sine = new Wave('sine', 'rgb(51,105,232)', 'rgb(204,150,23)');
  var tri = new Wave('triangle', 'rgb(223,15,37)', 'rgb(32,240,218)');
  var square = new Wave('square', 'rgb(238,178,17)', 'rgb(17,77,238)');
  var saw = new Wave('saw', 'rgb(0,153,37)', 'rgb(255,102,218)');

  //// Style

  var canvasHTML = document.querySelector("#canvas");
  ract.display.struct.core.html.appendChild(canvasHTML);

  var circViz = new CircViz(canvasHTML);

  circViz.setColors(sine.baseCol, sine.coreCol);
  circViz.render([], ract.display.struct.core.html.style.width);
  canvasHTML.style.width = ract.display.struct.core.html.style.width;
  canvasHTML.style.height = ract.display.struct.core.html.style.height;
  canvasHTML.style.borderRadius = ract.display.struct.core.html.style.borderRadius;

  //// Synth & Sequence
  var notes = new Grid(4, 12, function(oct,key){
    return new Note(oct,key);
  });

  var context = new AudioContext();

  var synth = new Synth(context, 4, 'sine');

  var seq = buildSeqZero(notes);

  var time = 12 * 240;

  // var play = compPlaySeq(seq,synth,circViz,time);
  var play = compSeqParts(time, seq, synth, circViz, ract);

  ////////////////////////

  ////
  debug.exit('window.onload');

  window.onresize = function() {
    debug.enter('window.onresize');
    ////

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    ract.rect.width = windowWidth;
    ract.rect.height = windowHeight;

    ract.render(circViz.render);

    canvasHTML.style.width = ract.display.struct.core.html.style.width;
    canvasHTML.style.height = ract.display.struct.core.html.style.width;
    canvasHTML.style.borderRadius = ract.display.struct.core.html.style.borderRadius;

    ////
    debug.exit('window.onresize');
  }

  canvasHTML.addEventListener('click', function(){
    play[curInd]();
    curInd = ++curInd % play.length;
  });

  ract.zero.struct.base.html.addEventListener('click',function(){
    ract.clickedButton(0);

    curWave = 0;
    synth.setType(curWave);

    circViz.setColors(sine.baseCol,sine.coreCol);
    circViz.render(synth.getActives())
  });

  ract.one.struct.base.html.addEventListener('click',function(){
    ract.clickedButton(1);

    curWave = 1;
    synth.setType(curWave);

    circViz.setColors(tri.baseCol,tri.coreCol);
    circViz.render(synth.getActives())
  });

  ract.two.struct.base.html.addEventListener('click',function(){
    ract.clickedButton(2);

    curWave = 2;
    synth.setType(curWave);

    circViz.setColors(square.baseCol,square.coreCol);
    circViz.render(synth.getActives())
  });

  ract.three.struct.base.html.addEventListener('click',function(){
    ract.clickedButton(3);

    curWave = 3;
    synth.setType(curWave);

    circViz.setColors(saw.baseCol,saw.coreCol);
    circViz.render(synth.getActives())
  });

  ract.seq0.struct.base.html.addEventListener('click', function(){
    ract.clickedSeq(0);
    seq = buildSeqZero(notes);
    curInd = 0;
    play = compSeqParts(time, seq, synth, circViz, ract);
  });

  ract.seq1.struct.base.html.addEventListener('click', function(){
    ract.clickedSeq(1);
    seq = buildSeqOne(notes);
    curInd = 0;
    play = compSeqParts(time, seq, synth, circViz, ract);
  });

  ract.seq2.struct.base.html.addEventListener('click', function(){
    ract.clickedSeq(2);
    seq = buildSeqTwo(notes);
    curInd = 0;
    play = compSeqParts(time, seq, synth, circViz, ract);
  });

  var curWave = 0;
  var curInd = 0;
  window.addEventListener('keydown',function(event){
    var key = event.keyCode;

    ract.keyPressed(key);

    if(key == 49){ // 0
      curWave = 0;
      synth.setType(curWave);

      circViz.setColors(sine.baseCol,sine.coreCol);
      circViz.render(synth.getActives())
      // play = compSeqParts(time, seq, synth, circViz);
    }
    else if(key == 50){ // 1
      curWave = 1;
      synth.setType(curWave);

      circViz.setColors(tri.baseCol,tri.coreCol);
      circViz.render(synth.getActives())
      // play = compSeqParts(time, seq, synth, circViz);
    }
    else if(key == 51){ // 2
      curWave = 2;
      synth.setType(curWave);

      circViz.setColors(square.baseCol,square.coreCol);
      circViz.render(synth.getActives())
    }
    else if(key == 52){ // 3
      curWave = 3;
      synth.setType(curWave);

      circViz.setColors(saw.baseCol,saw.coreCol);
      circViz.render(synth.getActives())
    }
    else if (key == 56) {
      seq = buildSeqZero(notes);
      curInd = 0;
      play = compSeqParts(time, seq, synth, circViz, ract);
    }
    else if (key == 57) {
      seq = buildSeqOne(notes);
      curInd = 0;
      play = compSeqParts(time, seq, synth, circViz, ract);
    }
    else if(key == 48){
      seq = buildSeqTwo(notes);
      curInd = 0;
      play = compSeqParts(time, seq, synth, circViz, ract);
    }
    else if(key == 32){
      play[curInd]();
      curInd = ++curInd % play.length;
    }

  });
};

////
function buildSeqZero(notes){
  var seq = new Sequence(11);

  seq.addHigh(notes.getCell(3,7), 0, 3);
  seq.addHigh(notes.getCell(3,4), 0, 3);
  seq.addHigh(notes.getCell(3,0), 0, 3);

  seq.addHigh(notes.getCell(3,7), 4, 1);

  seq.addHigh(notes.getCell(2,4), 5, 1);

  seq.addHigh(notes.getCell(1,0), 6, 1);

  seq.addHigh(notes.getCell(3,7), 7, 4);
  seq.addHigh(notes.getCell(3,11), 7, 4);
  seq.addHigh(notes.getCell(3,2), 7, 4);

  return seq;
}

function buildSeqOne(notes){
  var seq = new Sequence(7);

  seq.addHigh(notes.getCell(1,3), 0, 1);
  seq.addHigh(notes.getCell(2,3), 0, 1);

  seq.addHigh(notes.getCell(1,3), 1, 1);
  seq.addHigh(notes.getCell(2,3), 1, 1);

  seq.addHigh(notes.getCell(1,10), 2, 1);
  seq.addHigh(notes.getCell(2,10), 2, 1);

  seq.addHigh(notes.getCell(1,10), 3, 1);
  seq.addHigh(notes.getCell(2,10), 3, 1);

  seq.addHigh(notes.getCell(2,0), 4, 1);
  seq.addHigh(notes.getCell(3,0), 4, 1);

  seq.addHigh(notes.getCell(2,0), 5, 1);
  seq.addHigh(notes.getCell(3,0), 5, 1);

  seq.addHigh(notes.getCell(1,10), 6, 1);
  seq.addHigh(notes.getCell(2,10), 6, 1);

  return seq;
}

function buildSeqTwo(notes){
  var seq = new Sequence(5);

  seq.addHigh(notes.getCell(3,10), 0, 1);
  seq.addHigh(notes.getCell(3,7), 0, 1);
  seq.addHigh(notes.getCell(3,4), 0, 1);
  seq.addHigh(notes.getCell(3,0), 0, 1);

  seq.addHigh(notes.getCell(3,5), 1, 1);
  seq.addHigh(notes.getCell(3,9), 1, 1);
  seq.addHigh(notes.getCell(3,0), 1, 1);

  seq.addHigh(notes.getCell(3,10), 2, 1);
  seq.addHigh(notes.getCell(3,7), 2, 1);
  seq.addHigh(notes.getCell(3,4), 2, 1);
  seq.addHigh(notes.getCell(3,0), 2, 1);

  seq.addHigh(notes.getCell(3,7), 3, 1);
  seq.addHigh(notes.getCell(3,10), 3, 1);
  seq.addHigh(notes.getCell(3,2), 3, 1);

  seq.addHigh(notes.getCell(3,7), 4, 1);
  seq.addHigh(notes.getCell(3,4), 4, 1);
  seq.addHigh(notes.getCell(3,0), 4, 1);

  return seq;

}

function Wave(type,baseColor,coreCol){
  this.type = type;
  this.baseCol = baseColor;
  this.coreCol = coreCol;
}
