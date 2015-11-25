
function Rect(left, top, width, height, color) {
  debug.enter('Rect');
  ////

  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  this.color = color;
  this.html = html();
  this.render = render;

  this.render();

  ////
  debug.exit('Rect');

  return this;

  function html() {
    debug.enter('Rect.html');
    ////

    var html = document.createElement('div');

    ////
    debug.exit('Rect.html');

    return html;
  }

  function render(borderRadius) {
    debug.enter('Rect.render');
    ////

    this.html.style.position = 'absolute';
    this.html.style.left = this.left + 'px';
    this.html.style.top = this.top + 'px';
    this.html.style.width = this.width + 'px';
    this.html.style.height = this.height + 'px';
    this.html.style.backgroundColor = this.color.toString();

    ////
    debug.exit('Rect.render');
  }
}
