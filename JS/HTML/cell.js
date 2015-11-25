function Cell(rect, kushCo, color) {
  debug.enter('Cell');
  ////

  this.rect = rect;
  this.struct = {};
  this.struct.base = new Layer(0.875 * kushCo, color, this.rect);
  this.struct.brane = new Layer(0.75 * kushCo, color, this.struct.base);
  this.struct.core = new Layer(0.5 * kushCo, color, this.struct.brane);
  this.render = render;

  ////
  debug.exit('Cell');

  return this;

  function render() {
    debug.enter('Cell.render');
    ////
    this.rect.render();
    this.struct.base.render();
    this.struct.brane.render();
    this.struct.core.render();

    ////
    debug.exit('Cell.render');
  }
}
