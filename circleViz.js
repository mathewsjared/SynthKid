
function CircViz(canvas){
    // Properties
      // Root
  var root = 512;
        // Device Multiplier
  var devMult = 4;
      // Canvas
  var vas = canvas;
        // Context
  var text = vas.getContext("2d");
      // Modulus
  var mod = 12;
      // Colors
        // Background
  var backCol = 'rgb(41,41,41)';
        // Core
  var coreCol = 'rgb(241,241,241)';

  var keyOnCols = ['rgb(72,197,133)','rgb(41,41,41)','rgb(183,58,122)'];

    // Interface
  this.setColors = function(base,core){
    keyOnCols[0] = base;
    keyOnCols[2] = core;
  };
      // Render
  this.render = function(actives, canvasRoot){
      // Set Canvas
    vas.style.width = canvasRoot * devMult + 'px';
    vas.style.height = canvasRoot * devMult + 'px';
    var pixRoot = devMult * root;
    vas.width = pixRoot;
    vas.height = pixRoot;
      // Fill Background
    fillBackground();
      // Core Circle
    var core = {
      center: {
        x: pixRoot / 2,
        y: pixRoot / 2
      },

      radius: pixRoot / 3,

      strokeColor: 'rgb(213,213,213)',

      lineWidth: devMult * 7,

      render: function() {
        text.strokeStyle = this.strokeColor;
        text.lineWidth = this.lineWidth;
        text.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        text.stroke();
      }
    };
    core.render();
      // Iterate Through Points
    var thetaStep = 2 * Math.PI / mod;
    var keyOffCols = [core.strokeColor,'rgb(41,41,41)','rgb(41,41,41)']

    // Render Base
    drawInitState();
    // Render Actives
    drawActives();

    ////
    function fillBackground(){
      text.fillStyle = backCol;
      text.fillRect(0,0,vas.width,vas.height);
    }

    function fillCircle(color, center, radius){
      text.beginPath();
      text.fillStyle = color; //circle.strokeColor;
      text.arc(center.x, center.y, radius, 0, 2 * Math.PI);
      text.closePath();
      text.fill();
    }

    function strokePath(start,end,color,lineWidth){
      text.beginPath();
      text.strokeStyle = color;
      text.lineWidth = lineWidth;
      text.moveTo(start.x, start.y);
      text.lineTo(end.x, end.y);
      text.closePath();
      text.stroke();
    }

    function compCircPoint(circle, thetaStep, keyInd){
      var curTheta = thetaStep * keyInd;
      var x = circle.radius * Math.cos(curTheta);
      var y = circle.radius * Math.sin(curTheta);

      return {
        x: circle.center.x + x,
        y: circle.center.y + y
      };
    }

    function drawNode(point, colors){
        // Point Base
      fillCircle(colors[0], point, 1.5 * core.lineWidth);
        // Point Brane
      fillCircle(colors[1], point, core.lineWidth);
        // Point Core
      fillCircle(colors[2], point, core.lineWidth / 2);
    }

    function drawInitState(){
      for (var i = 0; i < mod; i++) {
        var curPoint = compCircPoint(core, thetaStep, i);
        drawNode(curPoint, keyOffCols);
      }
    }

    function drawActives(){
      var actPath = [];
      actives.forEach(function(octs,keyInd){
        if(octs.length > 0){
          var curPoint = compCircPoint(core,thetaStep,keyInd);
          actPath.push(curPoint);

          if(actPath.length > 1){
            // Draw Points From Last Point To Current Point
            var ori = actPath[actPath.length - 2];
            var end = actPath[actPath.length - 1];

            strokePath(ori,end,keyOnCols[0],core.lineWidth / 2);
            if(actPath.length - 2 != 0){
              drawNode(ori,keyOnCols);
            }
          }
        }

        if(keyInd == (mod - 1) && actPath.length > 1){
          var ori = actPath[actPath.length - 1];
          var end = actPath[0];

          strokePath(ori,end,keyOnCols[0],core.lineWidth / 2);
          drawNode(ori,keyOnCols);
          drawNode(end,keyOnCols);
        }

        if(keyInd == (mod - 1) && actPath.length == 1){
          var curPoint = actPath[0];
          drawNode(curPoint,keyOnCols);
        }
      });
    }
  };

    // Hand-Off
  return this;
}
