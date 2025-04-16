let song;
let soundStarted = false; // A flag to track if sound is playing

function setup() {
  createCanvas(400, 400);

  // Load the sound with a callback
  loadSound("./sound/subwooferlullaby.mp3", (s) => {
    song = s;
  });

  userStartAudio(); // Needed for browser autoplay policy
}

function draw() {
  background(255);

  // Display the message if the sound isn't playing
  if (!soundStarted) {
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(0);
  }

  // If the sound is playing, adjust the pan based on mouseX position
  if (song && song.isPlaying()) {
    let pan = map(mouseX, 0, width, -1, 1);
    song.pan(pan);
  }
}

// Start the sound when the user clicks on the canvas
function mousePressed() {
  if (!soundStarted) {
    song.loop();
    soundStarted = true;
  }
}

