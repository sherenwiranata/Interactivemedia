var numCircles = 50;  // Number of circles
let kusumaColours = [[255, 205, 0], "green", "purple", "blue", "red"];
let circles = [];

var s = function( p ) { 
  // This is the p5 instance, 'p' is used for all p5 functions
  p.setup = function() {
    p.createCanvas(400, 400);
    p.noStroke();  // No stroke for the circles

    // Create random circles within the instance setup
    for (let i = 0; i < numCircles; i++) {
      circles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(20, 100),
        color: p.random(kusumaColours),
      });
    }
  }

  p.draw = function() {
    p.background(0);

    // Draw the circles inside the instance draw loop
    for (let i = 0; i < circles.length; i++) {
      let c = circles[i];

      if (Array.isArray(c.color)) {
        p.fill(...c.color);
      } else {
        p.fill(c.color);
      }

      p.circle(c.x, c.y, c.size);
    }
  }
};

// Create an instance of p5 with the above sketch and assign it to a div
var myp5 = new p5(s, 'c1');
