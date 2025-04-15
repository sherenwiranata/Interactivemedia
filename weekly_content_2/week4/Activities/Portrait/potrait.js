// Sketch for the hair drawing
var sketch1 = function(p) {
    var x = 100.0; 
    var y = 100; 
    var speed = 2.5; 
    
    p.setup = function() {
      p.createCanvas(400, 400); // Set canvas size
      p.background(255, 245, 230);
      p.fill(200, 100, 200);
      p.noStroke();
      
      p.fill(0);
      p.ellipse(p.width / 2, 400, 180, 230);
      // Draw an oval at center
      p.fill(242, 197, 187);
      p.ellipse(p.width / 2, p.height / 2, 200, 230);
      //ear
      p.arc(110, 200, 60, 50, p.HALF_PI, 3 * p.HALF_PI, p.PIE);
      p.arc(290, 200, 60, 50, 3 * p.HALF_PI, p.HALF_PI, p.PIE);
      p.fill(217, 4, 43);
      //lips
      p.ellipse(p.width / 2, 240, 18, 18);
      p.fill(217, 4, 43);
      p.ellipse(p.width / 2, 247, 15, 15);
      //eyes
      p.fill(13, 13, 13);
      p.arc(150, 180, 30, 30, 0, p.PI, p.PIE);
      p.arc(250, 180, 30, 30, 0, p.PI, p.PIE);
      p.triangle(190, 210, 200, 190, 210, 210);
      //blush
      p.fill(245, 145, 160);
      p.noStroke();
      p.ellipse(150, 220, 50, 30);
      p.ellipse(255, 220, 50, 30);
      //glasses
      p.stroke(0);
      p.strokeWeight(3);
      p.noFill();
      p.ellipse(150, 180, 80, 80);
      p.ellipse(250, 180, 80, 80);
      //eyelash
      p.rect(130, 180, 35, 1);
      p.rect(230, 180, 35, 1);
      //eyebrows
      p.rect(130, 155, 35, 1);
      p.rect(235, 155, 35, 1);
      
      p.textAlign(p.CENTER, p.TOP); // Align the text to the center and top
      p.strokeWeight(2);
      p.textSize(35); // Set the text size
      p.fill(0); // Set text color to black (or any other color)
      p.text("Draw My Hair!", p.width / 2, 10); // Draw text at the top middle of the canvas
    };
  
    p.draw = function() {
      p.noFill();
      // Set the stroke color to a random RGB value for the rectangle
      p.stroke(p.random(255), p.random(255), p.random(255));
      p.rect(p.mouseX, p.mouseY, 20);
    };
  };
  
  // Create an instance of the sketch and attach it to a container div
  var myp5 = new p5(sketch1, 'sketch1-container');  