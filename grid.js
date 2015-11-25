
function Grid(height, width, initCell){
    // Properties
      // Height
  var hei = height;
      // Width
  var wid = width;
      // Grid
  var grid = initGrid(initCell);

    // Interface
      // Height
  this.getH = function(){
    return hei;
  };
      // Width
  this.getW = function(){
    return wid;
  };
      // Cell
  this.getCell = function(y, x){
    return grid[y][x];
  }

    // Hand-Off
  return this;

  function initGrid(initCell){
    var result = [];
    for (var j = 0; j < hei; j++) {
      var row = [];
      for (var i = 0; i < wid; i++) {
        row.push(initCell(j,i));
      }
      result.push(row);
    }
    return result;
  }
}
