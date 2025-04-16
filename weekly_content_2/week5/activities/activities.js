let angle = 0;
let angleV = 0;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('myCanvasContainer');
    angleMode(RADIANS);
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont('Arial');
}

function mousePressed() {
  // Give it a random velocity when clicked
  angleV = random(0.2, 0.5) * (random() > 0.5 ? 1 : -1); // random direction
}

function draw() {
  background(20, 24, 50);
  translate(200, 200);

  let numSections = 10;
  let sectionAngle = TWO_PI / numSections;

  for (let i = 0; i < numSections; i++) {
    let a = i * sectionAngle;

    stroke(180, 220, 255);
    strokeWeight(2);
    noFill();

    let ang = angle % TWO_PI;
    if (ang >= a && ang <= a + sectionAngle) {
      fill(120, 255, 214, 80);
    }

    arc(0, 0, 400, 400, a, a + sectionAngle, PIE);

    let midAngle = a + sectionAngle / 2;
    let labelX = cos(midAngle) * 140;
    let labelY = sin(midAngle) * 140;
    fill(255);
    noStroke();
    text(i + 1, labelX, labelY);
  }

  // Draw pointer arm
  noStroke();
  fill(102, 255, 204);
  rectMode(CENTER);
  rotate(angle);
  rect(0, 0, 256, 16);
  fill(255, 100, 200);
  triangle(128, -32, 128, 32, 172, 0);
  fill(255, 255, 255, 150);
  rect(-128, 0, 32, 48);

  fill(255, 255, 102);
  ellipse(0, 0, 12, 12);

  // Spin
  angle += angleV;
  angleV *= 0.98; // Friction
}
