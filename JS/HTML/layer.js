
function Layer(kushCo, color, parent) {
  debug.enter('Layer');
  ////

  this.kushCo = kushCo;
  this.color = color;
  this.parent = parent;
  this.html = html();
  this.render = render;

  this.render();

  return this;

  ////
  debug.exit('Layer');

  function html() {
    debug.enter('Layer.html');
    ////

    var html = document.createElement('div');

    parent.html.appendChild(html);

    ////
    debug.exit('Layer.html');

    return html;
  }

  function render() {
    debug.enter('Layer.render');
    ////

    var parentWidth = this.parent.html.clientWidth;
    parentWidth -= parentWidth % 2;

    var parentHeight = this.parent.html.clientHeight;
    parentHeight -= parentHeight % 2;

    var horizontal = true;
    if(parentHeight > parentWidth) {
      horizontal = false;
    }

    var kush;
    if(horizontal) {
      kush = Math.floor(kushCo * parentHeight);
    }
    else {
      kush = Math.floor(kushCo * parentWidth);
    }

    this.html.style.position = 'absolute';
    this.html.style.left = kush + 'px';
    this.html.style.top = kush + 'px';
    this.html.style.width = (parentWidth - 2 * kush) + 'px';
    this.html.style.height = (parentHeight - 2 * kush) + 'px';
    this.html.style.backgroundColor = this.color.toString();
    this.html.style.borderRadius = kush + 'px';

    ////
    debug.exit('Layer.render')
  }
};
