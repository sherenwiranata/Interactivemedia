function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); // Set initial background to white
  }
  
  function draw() {
    noStroke();
    fill(0); // Black fill for the dots
    ellipse(mouseX, mouseY, 10, 10); // Draws a black dot at the mouse position
  }