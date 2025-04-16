// Kusama-style sketch in instance mode
var kusamaSketch = function(p) {
    var kusamaColours = [
      [255, 205, 0],
      "green",
      "purple",
      "blue",
      "red"
    ];
  
    p.setup = function() {
      p.createCanvas(600, 400);
      p.frameRate(1);
    };
  
    p.draw = function() {
      p.stroke(0);
      p.strokeWeight(4);
      p.background("pink");
  
      for (let i = 0; i < 20; i++) {
        p.fill(p.random(kusamaColours));
        p.circle(p.random(p.width), p.random(p.height), p.random(60, 300));
  
        p.fill(p.random(kusamaColours));
        p.rect(p.random(p.width), p.random(p.height), p.random(60, 200), p.random(60, 300));
      }
    };
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
  
  // Create a new p5 instance and attach it to a container with ID 'c1'
  var myKusama = new p5(kusamaSketch, 'sketch4');
  