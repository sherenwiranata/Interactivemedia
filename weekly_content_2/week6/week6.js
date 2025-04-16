// Variablez
let circles = [];
let img;  // Declare variable for image

// Gravity variable
var gravity = 0.3;

function preload() {
  img = loadImage('./img/trebleclef.png');  // Load your image in the preload function
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i < 100; i++) {
    let thisCircle = new Circle();
    circles.push(thisCircle);
  }
}

function draw() {
  background(255);
  for (var i = 0; i < circles.length; i++) {
    let thisCircle = circles[i];
    thisCircle.display();
    thisCircle.bounce();
    thisCircle.move();
  }
}

class Circle {
  // Constructor for each circle (now using an image)
  constructor() {
    this.x = random(0, width); // x location
    this.y = random(0, height); // y location
    this.w = random(20, 90); // size (width and height of the image)
    this.speed = 0; // speed, at rest
  }

  // Display the image instead of drawing a circle
  display() {
    image(img, this.x, this.y, this.w, this.w); // Use the image function
  }

  move() {
    this.y = this.y + this.speed;
    // Add gravity to speed
    this.speed = this.speed + gravity;
  }

  bounce() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
}

// If you press space bar, you reset the whole thing
function keyPressed() {
  if (key == " ") {
    circles.splice(0, 1);
  }
}

// If you click the mouse, you create new "image circles"
function mousePressed() {
  // Create new circle at the mouse location with an image
  var c = new Circle(mouseX, mouseY); // New object at mouse location
  circles.push(c);
}
