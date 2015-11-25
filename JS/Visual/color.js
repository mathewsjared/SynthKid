
function Color(red, green, blue, alpha) {
  debug.enter('Color');
  ////

  this.on = true;
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha = alpha;
  this.toString = toString;

  ////
  debug.exit('Color');

  return this

  function toString() {
    debug.enter('Color.toString');
    ////

    var currentAlpha = this.alpha;
    if(!this.on) {
      currentAlpha = 0;
    }

    ////
    debug.exit('Color.toString');

    return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + currentAlpha + ')';
  }
}

function randomColor(alpha) {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  if(alpha == undefined) {
    alpha = Math.random();
  }
  return new Color(red, green, blue, alpha);
}
