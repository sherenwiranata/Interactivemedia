let cols = 12; 
let rows = 9.5; 
let cellSize = 550; // Size of each grid cell

/************ adjust screen smaller/ not show all map *************/
let screenWidth = 5;  // Visible columns  
let screenHeight = 3; // Visible rows
let coins = [];
let walls = [];
let paths = [];
let player;
let stickmanImg; //change to character
let coinImg; 
let mapImg;

function preload() {
  mapImg = loadImage('img/map.png');
  stickmanImg = loadImage('img/stickman.png'); 
  coinImg = loadImage('img/coin.png'); 
  coinSound = loadSound('/sound/Win.mp3');
}

/********* help from youtube videos linked in workbook and chatgpt *********/
function setup() {
  // Dynamically calculate cell size based on window width
  cellSize = min(windowWidth / screenWidth, windowHeight / screenHeight);

  let cnv = createCanvas(screenWidth * cellSize, screenHeight * cellSize);
  cnv.parent('gameContainer'); // Attach the canvas to the div

  // Fill grid with walls first
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      walls.push({ x, y });
    }
  }

  // Create a path the player can move on
  createPath(2, 0, 2, 3); 
  createPath(0, 3, 5, 3); 
  createPath(5, 4, 5, 6); 
  createPath(2, 6, 10, 6); 
  createPath(2, 7, 2, 8);
  createPath(9, 0, 9, 3);
  createPath(6, 0, 8, 0);
  createPath(8, 3, 8, 5);
  createPath(7, 7, 7, 8);

  // Remove walls where paths exist
  walls = walls.filter(wall => !paths.some(path => path.x === wall.x && path.y === wall.y));

  // Place player on the first available path
  player = paths.length > 0 ? { x: paths[0].x, y: paths[0].y } : { x: 0, y: 0 };

  placeCoins(3); // Generates 3 coins
}

// Handle resizing to keep it responsive
function windowResized() {
  cellSize = min(windowWidth / screenWidth, windowHeight / screenHeight);
  resizeCanvas(screenWidth * cellSize, screenHeight * cellSize);
}

function draw() {
  background(220);

  // Calculate camera offset to center player
  let cameraX = player.x - floor(screenWidth / 2);
  let cameraY = player.y - floor(screenHeight / 2);

  // Prevent camera from going out of bounds
  cameraX = constrain(cameraX, 0, cols - screenWidth);
  cameraY = constrain(cameraY, 0, rows - screenHeight);

  push();
  translate(-cameraX * cellSize, -cameraY * cellSize); // Shift the view
  // Draw walls
  fill(100);
  for (let wall of walls) {
    rect(wall.x * cellSize, wall.y * cellSize, cellSize, cellSize);
  }

  // Draw paths
  fill(255);
  for (let path of paths) {
    rect(path.x * cellSize, path.y * cellSize, cellSize, cellSize);
  }

// Draw the map image first (behind everything)
image(mapImg, 0, 0, cols * cellSize, rows * cellSize);

  // Draw the coins
  for (let coin of coins) {
    image(coinImg, coin.x * cellSize + 20, coin.y * cellSize + 20, cellSize - 40, cellSize - 40);
  }

  // Draw the stickman image at player position (on top of everything)
  image(stickmanImg, player.x * cellSize, player.y * cellSize, cellSize, cellSize);

  pop(); // Reset translation
}

// Move the player using arrow keys
function keyPressed() {
  let nextX = player.x;
  let nextY = player.y;

  if (keyCode === LEFT_ARROW) nextX--;
  if (keyCode === RIGHT_ARROW) nextX++;
  if (keyCode === UP_ARROW) nextY--;
  if (keyCode === DOWN_ARROW) nextY++;

  // Check if the next position is a valid path
  if (paths.some(path => path.x === nextX && path.y === nextY)) {
    player.x = nextX;
    player.y = nextY;

    collectCoin(); // Check if player collects a coin
  }
}

// Function to create a path in a straight line
function createPath(startX, startY, endX, endY) {
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      paths.push({ x, y });
    }
  }
}

// Function to place coins at 5 specific locations
function placeCoins(numCoins) {
  let possibleSpots = [ 
    {x: 2, y: 8}, 
    {x: 10, y: 6}, 
    {x: 7, y: 8}, 
    {x: 6, y: 0}, 
    {x: 0, y: 3} 
  ];

  shuffle(possibleSpots, true); // Shuffle the spots randomly

  // Clear any existing coins before placing new ones
  coins = [];

  // Place coins in the shuffled spots
  for (let i = 0; i < numCoins && i < possibleSpots.length; i++) {
    let coin = { 
      x: possibleSpots[i].x, 
      y: possibleSpots[i].y, 
      value: i + 1  // Assign values 1, 2, 3, etc.
    };
    coins.push(coin);
  }
}

// Function to collect a coin and open a new tab based on its value
function collectCoin() {
  for (let i = 0; i < coins.length; i++) {
    if (player.x === coins[i].x && player.y === coins[i].y) {
      let coinValue = coins[i].value;
      coinSound.play(); 
      // Remove the collected coin
      coins.splice(i, 1);
      
      // Using `confirm()` for pop-up with "Open" and "Close"
      let userChoice = confirm(`CONGRATULATIONS! You found Week ${coinValue} content! \n\nClick "OK" to open or "Cancel" to close.`);

      if (userChoice) {
        window.location.href = `weekly_content/week_${coinValue}.html`; // Change this URL as needed
      }
    }
  }
}


