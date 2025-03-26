// Function to save coin positions to localStorage
function saveCoinPositions(coinPositions) {
    localStorage.setItem('coinPositions', JSON.stringify(coinPositions));
}

// Function to simulate placing coins on the page (used chatgpt to fix errors in code)
function placeCoins() {
    // Example positions for the coins (you can dynamically calculate these)
    const coinPositions = [
        { x: 2, y: 8 },
        { x: 10, y: 6 },
        { x: 7, y: 8 }
    ];

    // Save positions to localStorage
    saveCoinPositions(coinPositions);
}

// Call the function to place coins and save the positions when the page loads
window.onload = placeCoins;

//from matilda's workbook
// Get all the elements with class name "draggable":
var draggableElements = document.getElementsByClassName("draggable");

// Apply dragElement function to each draggable element:
for (var i = 0; i < draggableElements.length; i++) {
  dragElement(draggableElements[i]);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // Attach the drag to the element itself
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
