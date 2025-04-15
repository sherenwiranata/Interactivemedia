// Sketch Three
var sketch3 = function(p) {
    var x = 100.0;
    var y = 100;
    var speed = 2.5;
  
    p.setup = function() {
      let cnv = p.createCanvas(400, 400); 
      cnv.parent('sketch3-container'); 
      p.background(255, 200, 0);
      p.frameRate(5);
    };
  
    p.draw = function() {
      p.background(255, 200, 0);  // Refresh background
      p.fill(0);
      p.rect(p.mouseX, p.mouseY, 100, 200); // Rectangle at mouse position
      
      p.stroke(255);
      p.strokeWeight(4);
      p.textSize(36);
    };
  };
  
  var myp5 = new p5(sketch3, 'sketch3-container'); // Attach to 'sketch3-container' div
  