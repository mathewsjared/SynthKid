
function Ract(rect, kushCo, navFrac, baseColor, rootColor) {
  debug.enter('Ract');
  ////

  var clearColor = new Color(0,0,0,0);

    this.rect = rect;

  this.root = new Rect(0,0,0,0,clearColor)

  this.rect.html.appendChild(this.root.html);

    this.base = new Layer(kushCo, baseColor, this.root);

    this.navFrac = navFrac;

      this.base.ploys = {};

      this.base.ploys.play = new Rect(0, 0, this.base.html.clientWidth, this.base.html.clientHeight, clearColor);
      this.base.html.appendChild(this.base.ploys.play.html);

      this.display = new Cell(this.base.ploys.play, kushCo, rootColor)

      this.base.ploys.nav = {}
      this.base.ploys.nav.hubRect = new Rect(0, 0, 0, 0, clearColor);
      this.base.html.appendChild(this.base.ploys.nav.hubRect.html);

      this.hub = new Cell(this.base.ploys.nav.hubRect, 2.625 * kushCo, rootColor);

        this.base.ploys.nav.hubRect.buttons = {};

        this.base.ploys.nav.hubRect.buttons.zeroRect = new Rect(0, 0, 0, 0, clearColor);
        this.hub.struct.core.html.appendChild(this.base.ploys.nav.hubRect.buttons.zeroRect.html);

        this.base.ploys.nav.hubRect.buttons.oneRect = new Rect(0, 0, 0, 0, clearColor);
        this.hub.struct.core.html.appendChild(this.base.ploys.nav.hubRect.buttons.oneRect.html);

        this.base.ploys.nav.hubRect.buttons.twoRect = new Rect(0, 0, 0, 0, clearColor);
        this.hub.struct.core.html.appendChild(this.base.ploys.nav.hubRect.buttons.twoRect.html);

        this.base.ploys.nav.hubRect.buttons.threeRect = new Rect(0, 0, 0, 0, clearColor);
        this.hub.struct.core.html.appendChild(this.base.ploys.nav.hubRect.buttons.threeRect.html);

        this.zero = new Cell(this.base.ploys.nav.hubRect.buttons.zeroRect, 2.625 * kushCo, rootColor);
        this.one = new Cell(this.base.ploys.nav.hubRect.buttons.oneRect, 2.625 * kushCo, rootColor);
        this.two = new Cell(this.base.ploys.nav.hubRect.buttons.twoRect, 2.625 * kushCo, rootColor);
        this.three = new Cell(this.base.ploys.nav.hubRect.buttons.threeRect, 2.625 * kushCo, rootColor);


      this.base.ploys.nav.seq0Rect = new Rect(0, 0, 0, 0, clearColor);
      this.base.html.appendChild(this.base.ploys.nav.seq0Rect.html);

      this.base.ploys.nav.seq1Rect = new Rect(0, 0, 0, 0, clearColor);
      this.base.html.appendChild(this.base.ploys.nav.seq1Rect.html);

      this.base.ploys.nav.seq2Rect = new Rect(0, 0, 0, 0, clearColor);
      this.base.html.appendChild(this.base.ploys.nav.seq2Rect.html);

      this.seq0 = new Cell(this.base.ploys.nav.seq0Rect, 3 * 2.625 * kushCo, rootColor);
      this.seq1 = new Cell(this.base.ploys.nav.seq1Rect, 3 * 2.625 * kushCo, rootColor)
      this.seq2 = new Cell(this.base.ploys.nav.seq2Rect, 3 * 2.625 * kushCo, rootColor)


      // this.hub = new Rect(0, 0, 25, 25, rootColor); // (left, top, width, height, color)

  this.render = render;

  this.render(function(){});

  //// Interaction Stuff
  var currButt = 0;
  var currSeq = 0;

  this.clickedButton = buttClicked;

  this.clickedSeq = seqClicked;

  this.keyPressed = pressedKey;

  ////
  debug.exit('Ract');

  return this;

  function render(callback) {
    debug.enter('Ract.render');
    ////

      this.rect.render();

    var num = this.navFrac.num;
    var den = this.navFrac.den;
    var abs = num / den;

    if(this.rect.height > this.rect.width) {
      this.root.width = this.rect.width
      this.root.height = this.rect.width + this.rect.width * abs;
    }
    else {
      this.root.height = this.rect.height;
      this.root.width = this.rect.height + this.rect.height * abs;
    }

    this.root.render();

      this.base.render();

        if(this.rect.height > this.rect.width) {
          this.base.ploys.play.width = this.base.html.clientWidth;
          this.base.ploys.play.height = this.base.html.clientWidth;

          this.base.ploys.play.left = 0;

          this.base.ploys.nav.hubRect.width =  this.base.html.clientHeight - this.base.html.clientWidth;
          this.base.ploys.nav.hubRect.height = this.base.html.clientHeight - this.base.html.clientWidth;

          this.base.ploys.nav.hubRect.top = this.base.html.clientWidth;

          this.base.ploys.nav.seq0Rect.width = (this.base.html.clientWidth - (this.base.html.clientHeight - this.base.html.clientWidth)) / 3;
          this.base.ploys.nav.seq0Rect.height = this.base.html.clientHeight - this.base.html.clientWidth;
          this.base.ploys.nav.seq0Rect.top = this.base.html.clientWidth;
          this.base.ploys.nav.seq0Rect.left = this.base.html.clientHeight - this.base.html.clientWidth;

          this.base.ploys.nav.seq1Rect.width = (this.base.html.clientWidth - (this.base.html.clientHeight - this.base.html.clientWidth)) / 3;
          this.base.ploys.nav.seq1Rect.height = this.base.html.clientHeight - this.base.html.clientWidth;
          this.base.ploys.nav.seq1Rect.top = this.base.html.clientWidth;
          this.base.ploys.nav.seq1Rect.left = this.base.html.clientHeight - this.base.html.clientWidth + this.base.ploys.nav.seq0Rect.width;

          this.base.ploys.nav.seq2Rect.width = (this.base.html.clientWidth - (this.base.html.clientHeight - this.base.html.clientWidth)) / 3;
          this.base.ploys.nav.seq2Rect.height = this.base.html.clientHeight - this.base.html.clientWidth;
          this.base.ploys.nav.seq2Rect.top = this.base.html.clientWidth;
          this.base.ploys.nav.seq2Rect.left = this.base.html.clientHeight - this.base.html.clientWidth + 2 * this.base.ploys.nav.seq0Rect.width;
        }
        else {
          this.base.ploys.play.width = this.base.html.clientHeight;
          this.base.ploys.play.height = this.base.html.clientHeight;

          this.base.ploys.play.left = this.base.html.clientWidth - this.base.html.clientHeight;

            this.base.ploys.nav.hubRect.width = this.base.html.clientWidth - this.base.html.clientHeight;
            this.base.ploys.nav.hubRect.height = this.base.html.clientWidth - this.base.html.clientHeight;

            this.base.ploys.nav.hubRect.top = 0;

            this.base.ploys.nav.seq0Rect.width = this.base.html.clientWidth - this.base.html.clientHeight;
            this.base.ploys.nav.seq0Rect.height = (this.base.html.clientHeight - (this.base.html.clientWidth - this.base.html.clientHeight)) / 3;
            this.base.ploys.nav.seq0Rect.top = (this.base.html.clientWidth - this.base.html.clientHeight);
            this.base.ploys.nav.seq0Rect.left = 0;

            this.base.ploys.nav.seq1Rect.width = this.base.html.clientWidth - this.base.html.clientHeight;
            this.base.ploys.nav.seq1Rect.height = (this.base.html.clientHeight - (this.base.html.clientWidth - this.base.html.clientHeight)) / 3;
            this.base.ploys.nav.seq1Rect.top = (this.base.html.clientWidth - this.base.html.clientHeight) + this.base.ploys.nav.seq0Rect.height;
            this.base.ploys.nav.seq1Rect.left = 0;

            this.base.ploys.nav.seq2Rect.width = this.base.html.clientWidth - this.base.html.clientHeight;
            this.base.ploys.nav.seq2Rect.height = (this.base.html.clientHeight - (this.base.html.clientWidth - this.base.html.clientHeight)) / 3;
            this.base.ploys.nav.seq2Rect.top = (this.base.html.clientWidth - this.base.html.clientHeight) + 2 * this.base.ploys.nav.seq0Rect.height;
            this.base.ploys.nav.seq2Rect.left = 0;
        }

        this.base.ploys.play.render();

        this.display.render();

          this.base.ploys.nav.hubRect.render();

          this.hub.render();

          //// Button Shit
          var buttonRootRect = this.hub.struct.core.html.clientWidth / 2;

            this.base.ploys.nav.hubRect.buttons.zeroRect.width = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.zeroRect.height = buttonRootRect + (buttonRootRect % 2);

            this.base.ploys.nav.hubRect.buttons.oneRect.width = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.oneRect.height = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.oneRect.left = buttonRootRect - (buttonRootRect % 2);

            this.base.ploys.nav.hubRect.buttons.twoRect.width = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.twoRect.height = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.twoRect.left = buttonRootRect - (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.twoRect.top = buttonRootRect - (buttonRootRect % 2);

            this.base.ploys.nav.hubRect.buttons.threeRect.width = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.threeRect.height = buttonRootRect + (buttonRootRect % 2);
            this.base.ploys.nav.hubRect.buttons.threeRect.top = buttonRootRect - (buttonRootRect % 2);


            this.base.ploys.nav.hubRect.buttons.zeroRect.render();
            this.base.ploys.nav.hubRect.buttons.oneRect.render();
            this.base.ploys.nav.hubRect.buttons.twoRect.render();
            this.base.ploys.nav.hubRect.buttons.threeRect.render();

            this.zero.render();
            this.one.render();
            this.two.render();
            this.three.render();

        //// Seq Shit
        this.base.ploys.nav.seq0Rect.render();
        this.base.ploys.nav.seq1Rect.render();
        this.base.ploys.nav.seq2Rect.render();

        this.seq0.render();
        this.seq1.render();
        this.seq2.render();

        callback([],this.display.struct.core.html.style.width);
    ////
    debug.exit('Ract.render');
  }

  function buttClicked(buttNum){
    if(buttNum == 0){
      currButt = 0;

      this.zero.struct.core.color.alpha = 0.75;
      this.one.struct.core.color.alpha = 0;
      this.two.struct.core.color.alpha = 0;
      this.three.struct.core.color.alpha = 0;

      if(currSeq == 0){
        this.seq0.struct.brane.color = getCurCol();
        this.seq0.render();
      }
      else if(currSeq == 1){
        this.seq1.struct.brane.color = getCurCol();
        this.seq1.render();
      }
      else if(currSeq == 2){
        this.seq2.struct.brane.color = getCurCol();
        this.seq2.render();
      }
    }
    else if(buttNum == 1){
      currButt = 1;

      this.zero.struct.core.color.alpha = 0;
      this.one.struct.core.color.alpha = 0.75;
      this.two.struct.core.color.alpha = 0;
      this.three.struct.core.color.alpha = 0;

      this.clickedSeq(currSeq);
    }
    else if(buttNum == 2){
      currButt = 2;

      this.zero.struct.core.color.alpha = 0;
      this.one.struct.core.color.alpha = 0;
      this.two.struct.core.color.alpha = 0.75;
      this.three.struct.core.color.alpha = 0;

      this.clickedSeq(currSeq);
    }
    else if(buttNum == 3){
      currButt = 3;

      this.zero.struct.core.color.alpha = 0;
      this.one.struct.core.color.alpha = 0;
      this.two.struct.core.color.alpha = 0;
      this.three.struct.core.color.alpha = 0.75;

      this.clickedSeq(currSeq);
    }

    this.zero.render();
    this.one.render();
    this.two.render();
    this.three.render();
  }

  function seqClicked(seqNum){
    var white = new Color(241,241,241,1);
    var grey = new Color(41,41,41,1);

    if(seqNum == 0){
      currSeq = 0;

      this.seq0.struct.brane.color = getCurCol();
      this.seq0.struct.base.color = white;

      this.seq1.struct.brane.color = white;
      this.seq1.struct.base.color = grey;

      this.seq2.struct.brane.color = white;
      this.seq2.struct.base.color = grey;
    }
    else if(seqNum == 1){
      currSeq = 1;

      this.seq0.struct.brane.color = white;
      this.seq0.struct.base.color = grey;

      this.seq1.struct.brane.color = getCurCol();
      this.seq1.struct.base.color = white;

      this.seq2.struct.brane.color = white;
      this.seq2.struct.base.color = grey;
    }
    else if(seqNum == 2){
      currSeq = 2;

      this.seq0.struct.brane.color = white;
      this.seq0.struct.base.color = grey;

      this.seq1.struct.brane.color = white;
      this.seq1.struct.base.color = grey;

      this.seq2.struct.brane.color = getCurCol();
      this.seq2.struct.base.color = white;
    }

    this.seq0.render();
    this.seq1.render();
    this.seq2.render();
  }

  function getCurCol(){
    if(currButt == 0){
      return new Color(51, 105, 232, 0.75);
    }
    else if(currButt == 1){
      return new Color(223, 15, 37, 0.75);
    }
    else if(currButt == 2){
      return new Color(238, 178, 17, 0.75);
    }
    else if(currButt == 3){
      return new Color(0, 153, 37, 0.75);
    }
  }

  function pressedKey(keyCode){3
    if(keyCode == 49){ // 0
      this.clickedButton(0);
    }
    else if(keyCode == 50){ // 1
      this.clickedButton(1);
    }
    else if(keyCode == 51){ // 2
      this.clickedButton(2);
    }
    else if(keyCode == 52){ // 3
      this.clickedButton(3);
    }
    else if(keyCode == 56){ // 8
      this.clickedSeq(0);
    }
    else if(keyCode == 57){ // 9
      this.clickedSeq(1);
    }
    else if(keyCode == 48){ // 0
      this.clickedSeq(2);
    }
  }
}
