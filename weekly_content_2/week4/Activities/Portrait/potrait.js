 
let hair;
let mouseInCanvas = false;  // Flag to check if mouse is in the canvas

function setup() {
  createCanvas(400, 400);
  background(255, 245, 230);
  fill(200, 100, 200);
  noStroke();
  
  fill(0);
  ellipse(width / 2, 400, 180, 230);
  // Draw an oval at center
  fill(242, 197, 187);
  ellipse(width / 2, height / 2, 200, 230);
  //ear
  arc(110, 200, 60, 50, HALF_PI, 3 * HALF_PI, PIE);
  arc(290, 200, 60, 50, 3 * HALF_PI, HALF_PI, PIE);
  fill(217, 4, 43);
  //lips
  ellipse(width/2, 240, 18, 18);
  fill(217, 4, 43);
  ellipse(width/2, 247, 15, 15);
  //eyes
  fill(13, 13, 13);
  arc(150, 180, 30, 30, 0, PI, PIE);
  arc(250, 180, 30, 30, 0, PI, PIE);
  triangle(190, 210, 200, 190, 210, 210);
  //blush
  fill(245, 145, 160);
  noStroke();
  ellipse(150,220,50,30);
  ellipse(255,220,50,30);
  //glasses
  stroke(0);
  strokeWeight(3);
  noFill();
  ellipse(150,180,80,80);
  ellipse(250,180,80,80);
  //eyelash
  rect(130 ,180 ,35 ,1);
  rect(230 ,180 ,35 ,1);
  //eyebrows
  rect(130 ,155 ,35 ,1);
  rect(235 ,155 ,35 ,1);
  
   textAlign(CENTER, TOP);  // Align the text to the center and top
  strokeWeight(2);
  textSize(35);            // Set the text size
  fill(0);                 // Set text color to black (or any other color)
  text(" Draw My Hair!", width / 2, 10);  // Draw text at the top middle of the canvas
}

function draw() {
  noFill();
  // Set the stroke color to a dark brown shade
  stroke(random(255), random(255), random(255));
  rect(mouseX, mouseY, 20);
}
