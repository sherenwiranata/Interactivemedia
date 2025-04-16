let capture;
function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); //
}

function draw() {
  background(0,12); //if you do the 12 it makes it have a trail
  image(capture, mouseX, mouseY, 120, 120);
  filter(POSTERIZE,3); //p5 has different filters 
  filter(BLUR,2);
  /*
  image(capture, 0, 0, width, height);
  */
}