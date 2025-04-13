let cols = 20; 
let rows = 16; 
let cellSize = 1000; // Size of each grid cell

/************ adjust screen smaller/ not show all map *************/
let screenWidth = 9;  // Visible columns  
let screenHeight = 5; // Visible rows
let coins = [];
let walls = [];
let paths = [];
let player;
let stickmanImg; //change to character
let coinImg; 
let mapImg;

function preload() {


    mapImg = loadImage('../imggame2/map2_2.png', 
        () => console.log('Map image loaded'), 
        () => console.error('Map image failed to load')
      );

  stickmanImg = loadImage('../img/stickman.png'); 
  coinImg = loadImage('../imggame2/gem.png'); 
  coinSound = loadSound('../sound/Win.mp3');
  moveSound = loadSound('../sound/move.mp3', () => moveSound.setVolume(0.05));
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
  createPath(0, 5, 9, 5); 
  createPath(4, 5, 4, 9); 
  createPath(2, 9, 7, 9); 
  createPath(2, 9, 2, 12);
  createPath(2, 12, 5, 12);
  createPath(7, 9, 7, 12); 
  createPath(2, 2, 2, 5);
  createPath(2, 2, 5, 2); 
  createPath(9, 2, 9, 9);
  createPath(9, 2, 13, 2);
  createPath(13, 2, 13, 8);
  createPath(11, 8, 13, 8);
  createPath(13, 3, 18, 3);
  createPath(18, 3, 18, 7);
  createPath(17, 7, 18, 7);
  createPath(17, 7, 17, 13);
  createPath(15, 13, 17, 13);
  createPath(15, 11, 15, 13);
  createPath(12, 11, 15, 11);
  createPath(12, 11, 12, 13);
  
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

  image(mapImg, 0, 0, cols * cellSize, rows * cellSize);

//*********************************************
  // Draw the coins
  for (let coin of coins) {
    let coinSize = cellSize * 0.35; // Scale the coin relative to cell size
    let offsetX = (cellSize - coinSize) / 2;
    let offsetY = (cellSize - coinSize) / 2;
    image(coinImg, coin.x * cellSize + offsetX, coin.y * cellSize + offsetY, coinSize, coinSize);
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

    moveSound.play(); 
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
    {x: 5, y: 12}, 
    {x: 11, y: 8}, 
    {x: 12, y: 13}, 
    {x: 9, y: 9}, 
    {x: 7, y: 12} 
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


