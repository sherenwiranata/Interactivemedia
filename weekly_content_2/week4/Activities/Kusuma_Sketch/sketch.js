let cols = 3;
let rows = 3;
let size;
let board = [];
let currentPlayer;
let winner = false;
let winnerLoc = [];
let winnerText;
let playAgainButton;

let isDraw = false;
let drawText = '';

let crossImg, circleImg;
let clickSound, aiSound, winSound, loseSound;
let bgAudio;

function preload() {
  crossImg = loadImage('./img/cross.png');
  circleImg = loadImage('./img/circle.png');

  clickSound = loadSound('./sound/popcross.mp3');
  aiSound = loadSound('./sound/popcircle.mp3');
  winSound = loadSound('./sound/wintictactoe.mp3');
  loseSound = loadSound('./sound/losetictactoe.mp3');
  bgAudio = loadSound('./sound/bgaudio.mp3');
  drawSound = loadSound('./sound/draw.mp3');
}

function setup() {
  canvas = createCanvas(windowHeight * 0.75, windowHeight * 0.75);
  canvas.parent("canvas-container");

  bgAudio.setVolume(0.2);
  bgAudio.loop();

  size = width / cols;
  currentPlayer = 'X';
  for (let i = 0; i < cols; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }

  playAgainButton = createButton('Play Again');
  playAgainButton.class('playAgainButton');
  playAgainButton.mousePressed(resetGame);
}

function resetGame() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  winner = false;
  isDraw = false;
  drawText = '';
  winnerLoc = [];
  winnerText = '';
  currentPlayer = 'X';
}

function draw() {
  background(220);
  drawBoard();
  drawWinner();
}

function drawBoard() {
  stroke(0);
  strokeWeight(3);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rect(i * size, j * size, size, size);
      if (board[i][j] == 'X') {
        image(crossImg, i * size, j * size, size, size);
      } else if (board[i][j] == 'O') {
        image(circleImg, i * size, j * size, size, size);
      }
    }
  }
}

function mousePressed() {
  if (winner || isDraw || currentPlayer !== 'X') return;

  let x = floor(mouseX / size);
  let y = floor(mouseY / size);

  if (board[x][y] == 0) {
    placePieces(x, y);
    checkWinner();

    if (!winner && !isDraw) {
      currentPlayer = 'O';
      setTimeout(() => {
        aiTurn();
        checkWinner();
        currentPlayer = 'X';
      }, 1000);
    }
  }
}

function placePieces(x, y) {
  if (board[x][y] == 0) {
    board[x][y] = currentPlayer;
    winnerText = currentPlayer;

    if (currentPlayer === 'X') {
      clickSound.play();
    } else {
      aiSound.play();
    }
  }
}

function aiTurn() {
  let available = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 0) {
        available.push([i, j]);
      }
    }
  }

  if (available.length > 0) {
    let move = random(available);
    placePieces(move[0], move[1]);
  }
}

function checkWinner() {
  let foundWinner = false;

  for (let i = 0; i < cols; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
      foundWinner = true;
      winner = true;
      winnerLoc = [1, i];
    }
  }

  for (let i = 0; i < rows; i++) {
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) {
      foundWinner = true;
      winner = true;
      winnerLoc = [2, i];
    }
  }

  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
    foundWinner = true;
    winner = true;
    winnerLoc = [3, 0];
  }

  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != 0) {
    foundWinner = true;
    winner = true;
    winnerLoc = [4, 0];
  }

  if (foundWinner) {
    if (!winSound.isPlaying() && !loseSound.isPlaying()) {
      if (currentPlayer === 'X') {
        winSound.play();
      } else {
        loseSound.play();
      }
    }
  }

  // Check for draw if no winner
  if (!foundWinner) {
    let openSpots = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i][j] == 0) {
          openSpots++;
        }
      }
    }

    if (openSpots === 0) {
      isDraw = true;
      drawText = "Draw!";
      drawSound.play();
    }
  }
}

function drawWinner() {
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  textSize(100);

  if (winner) {
    text(winnerText + " wins!", width / 2, height / 2);
    if (winnerLoc[0] == 1) {
      line(size / 2 + winnerLoc[1] * size, size / 2, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size);
    } else if (winnerLoc[0] == 2) {
      line(size / 2, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size, size / 2 + winnerLoc[1] * size);
    } else if (winnerLoc[0] == 3) {
      line(size / 2, size / 2, size / 2 + 2 * size, size / 2 + 2 * size);
    } else if (winnerLoc[0] == 4) {
      line(size / 2 + 2 * size, size / 2, size / 2, size / 2 + 2 * size);
    }
  }

  if (isDraw) {
    text(drawText, width / 2, height / 2);
  }
}
