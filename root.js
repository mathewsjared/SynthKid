
window.onload = function(){
  document.body.style.backgroundColor = 'rgb(241,241,241)';

  var sine = new Wave('sine', 'rgb(211,127,172)', 'rgb(44,128,83)');
  var tri = new Wave('triangle', 'rgb(91,149,137)', 'rgb(164,106,118)');
  var square = new Wave('square', 'rgb(73,127,191)', 'rgb(182,128,64)');
  var saw = new Wave('saw', 'rgb(157,192,73)', 'rgb(158,63,182)');

  //// Style
  waveStyles(sine,tri,square,saw);

  var canvasHTML = document.querySelector("#canvas");
  canvasHTML.style.borderRadius = '48px';

  var circViz = new CircViz(canvasHTML);

  circViz.setColors(sine.baseCol, sine.coreCol);
  circViz.render([]);

  //// Synth & Sequence
  var notes = new Grid(4, 12, function(oct,key){
    return new Note(oct,key);
  });

  var context = new AudioContext();

  var synth = new Synth(context, 4, 'sine');

  var seq = new Sequence(12);

  buildSeqZero(seq,notes);

  var time = 12 * 240;

  // var play = compPlaySeq(seq,synth,circViz,time);
  var play = compSeqParts(time, seq, synth, circViz);

  var curInd = 0;
  canvasHTML.addEventListener('click', function(){
    play[curInd]();
    curInd = ++curInd % play.length;
  });

  var curWave = 0;
  window.addEventListener('keydown', function(event){
    var key = event.keyCode;
    if(key == 49){ // 0
      curWave = 0;
      synth.setType(curWave);

      var coreSine = document.querySelector('#coreSine');
      coreSine.style.backgroundColor = sine.coreCol;
      var coreTri = document.querySelector('#coreTri');
      coreTri.style.backgroundColor = 'transparent';
      var coreSqu = document.querySelector('#coreSqu');
      coreSqu.style.backgroundColor = 'transparent';
      var coreSaw = document.querySelector('#coreSaw');
      coreSaw.style.backgroundColor = 'transparent';

      circViz.setColors(sine.baseCol,sine.coreCol);
      circViz.render(synth.getActives())
      // play = compSeqParts(time, seq, synth, circViz);
    }
    else if(key == 50){ // 1
      curWave = 1;
      synth.setType(curWave);

      var coreSine = document.querySelector('#coreSine');
      coreSine.style.backgroundColor = 'transparent';
      var coreTri = document.querySelector('#coreTri');
      coreTri.style.backgroundColor = tri.coreCol;
      var coreSqu = document.querySelector('#coreSqu');
      coreSqu.style.backgroundColor = 'transparent';
      var coreSaw = document.querySelector('#coreSaw');
      coreSaw.style.backgroundColor = 'transparent';

      circViz.setColors(tri.baseCol,tri.coreCol);
      circViz.render(synth.getActives())
      // play = compSeqParts(time, seq, synth, circViz);
    }
    else if(key == 51){ // 2
      curWave = 2;
      synth.setType(curWave);

      var coreSine = document.querySelector('#coreSine');
      coreSine.style.backgroundColor = 'transparent';
      var coreTri = document.querySelector('#coreTri');
      coreTri.style.backgroundColor = 'transparent';
      var coreSqu = document.querySelector('#coreSqu');
      coreSqu.style.backgroundColor = square.coreCol;
      var coreSaw = document.querySelector('#coreSaw');
      coreSaw.style.backgroundColor = 'transparent';

      circViz.setColors(square.baseCol,square.coreCol);
      circViz.render(synth.getActives())
    }
    else if(key == 52){ // 3
      curWave = 3;
      synth.setType(curWave);
      var coreSine = document.querySelector('#coreSine');
      coreSine.style.backgroundColor = 'transparent';
      var coreTri = document.querySelector('#coreTri');
      coreTri.style.backgroundColor = 'transparent';
      var coreSqu = document.querySelector('#coreSqu');
      coreSqu.style.backgroundColor = 'transparent';
      var coreSaw = document.querySelector('#coreSaw');
      coreSaw.style.backgroundColor = saw.coreCol;

      circViz.setColors(saw.baseCol,saw.coreCol);
      circViz.render(synth.getActives())
    }
  });
};


////
function buildSeqZero(seq,notes){
  seq.addHigh(notes.getCell(3,7), 0, 4);
  seq.addHigh(notes.getCell(3,4), 0, 4);
  seq.addHigh(notes.getCell(3,0), 0, 4);

  seq.addHigh(notes.getCell(3,7), 4, 1);

  seq.addHigh(notes.getCell(3,4), 5, 1);

  seq.addHigh(notes.getCell(3,0), 6, 1);

  seq.addHigh(notes.getCell(3,7), 7, 4);
  seq.addHigh(notes.getCell(3,11), 7, 4);
  seq.addHigh(notes.getCell(3,2), 7, 4);
}

function Wave(type,baseColor,coreCol){
  this.type = type;
  this.baseCol = baseColor;
  this.coreCol = coreCol;
}

function waveStyles(sine,tri,square,saw){
  var wavesHTML = document.querySelector('#waves');

    var boxSize = '48px';

    var baseSine = document.querySelector('#baseSine');
    baseSine.style.width = boxSize;
    baseSine.style.height = boxSize;
    baseSine.style.backgroundColor = sine.baseCol;
    baseSine.style.borderRadius = '12px';
    baseSine.style.margin = '12px';
    baseSine.style.float = 'left';

      var braneSine = document.querySelector('#braneSine');
      braneSine.style.width = '36px';
      braneSine.style.height = '36px';
      braneSine.style.backgroundColor = 'rgb(41,41,41)';
      braneSine.style.borderRadius = '9px';
      braneSine.style.marginLeft = '6px';
      braneSine.style.marginTop = '6px';

        var coreSine = document.querySelector('#coreSine');
        coreSine.style.width = '24px';
        coreSine.style.height = '24px';
        coreSine.style.backgroundColor = sine.coreCol;
        coreSine.style.borderRadius = '6px';
        coreSine.style.position = 'absolute';
        coreSine.style.marginLeft = '6px';
        coreSine.style.marginTop = '6px';

    var baseTri = document.querySelector('#baseTri');
    baseTri.style.width = boxSize;
    baseTri.style.height = boxSize;
    baseTri.style.backgroundColor = tri.baseCol;
    baseTri.style.borderRadius = '12px';
    baseTri.style.margin = '12px';
    baseTri.style.float = 'left';

      var braneTri = document.querySelector('#braneTri');
      braneTri.style.width = '36px';
      braneTri.style.height = '36px';
      braneTri.style.backgroundColor = 'rgb(41,41,41)';
      braneTri.style.borderRadius = '9px';
      braneTri.style.marginLeft = '6px';
      braneTri.style.marginTop = '6px';

        var coreTri = document.querySelector('#coreTri');
        coreTri.style.width = '24px';
        coreTri.style.height = '24px';
        coreTri.style.backgroundColor = 'transparent';
        coreTri.style.borderRadius = '6px';
        coreTri.style.position = 'absolute';
        coreTri.style.marginLeft = '6px';
        coreTri.style.marginTop = '6px';

    var baseSqu = document.querySelector('#baseSqu');
    baseSqu.style.width = boxSize;
    baseSqu.style.height = boxSize;
    baseSqu.style.backgroundColor = square.baseCol;
    baseSqu.style.borderRadius = '12px';
    baseSqu.style.margin = '12px';
    baseSqu.style.float = 'left';

      var braneSqu = document.querySelector('#braneSqu');
      braneSqu.style.width = '36px';
      braneSqu.style.height = '36px';
      braneSqu.style.backgroundColor = 'rgb(41,41,41)';
      braneSqu.style.borderRadius = '9px';
      braneSqu.style.marginLeft = '6px';
      braneSqu.style.marginTop = '6px';

        var coreSqu = document.querySelector('#coreSqu');
        coreSqu.style.width = '24px';
        coreSqu.style.height = '24px';
        coreSqu.style.backgroundColor = 'transparent';
        coreSqu.style.borderRadius = '6px';
        coreSqu.style.position = 'absolute';
        coreSqu.style.marginLeft = '6px';
        coreSqu.style.marginTop = '6px';

    var baseSaw = document.querySelector('#baseSaw');
    baseSaw.style.width = boxSize;
    baseSaw.style.height = boxSize;
    baseSaw.style.backgroundColor = saw.baseCol;
    baseSaw.style.margin = '12px';
    baseSaw.style.borderRadius = '12px';
    baseSaw.style.float = 'left';

      var braneSaw = document.querySelector('#braneSaw');
      braneSaw.style.width = '36px';
      braneSaw.style.height = '36px';
      braneSaw.style.backgroundColor = 'rgb(41,41,41)';
      braneSaw.style.borderRadius = '9px';
      braneSaw.style.marginLeft = '6px';
      braneSaw.style.marginTop = '6px';

        var coreSaw = document.querySelector('#coreSaw');
        coreSaw.style.width = '24px';
        coreSaw.style.height = '24px';
        coreSaw.style.backgroundColor = 'transparent';
        coreSaw.style.borderRadius = '6px';
        coreSaw.style.position = 'absolute';
        coreSaw.style.marginLeft = '6px';
        coreSaw.style.marginTop = '6px';
}
