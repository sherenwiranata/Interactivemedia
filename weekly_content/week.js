// Function to save coin positions to localStorage
function saveCoinPositions(coinPositions) {
    localStorage.setItem('coinPositions', JSON.stringify(coinPositions));
}
// Function to simulate placing coins on the page (used chatgpt to fix errors in code)
function placeCoins() {
    const coinPositions = [
        { x: 2, y: 8 },
        { x: 10, y: 6 },
        { x: 7, y: 8 }
    ];
    saveCoinPositions(coinPositions);
}
window.onload = placeCoins;

//from matilda's workbook and help from chatgpt
// This function enables dragging functionality
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.getElementsByClassName(elmnt.className)[0]) {
      elmnt.getElementsByClassName(elmnt.className)[0].onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    // Mouse down function to start dragging
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    // Function to move the element as the mouse moves
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
  
    // Function to stop dragging
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
  // Function to randomly position elements
  function randomPosition(elmnt) {
    var randomX = Math.floor(Math.random() * (window.innerWidth - elmnt.offsetWidth)); // Random X position, adjusted by the element's width
    var randomY = Math.floor(Math.random() * (window.innerHeight - elmnt.offsetHeight)); // Random Y position, adjusted by the element's height
    elmnt.style.position = 'absolute';
    elmnt.style.left = randomX + 'px';
    elmnt.style.top = randomY + 'px';
  }
  
  // Get all elements with the class "draggable" and apply random position and drag functionality
  var draggableElements = document.getElementsByClassName("draggable");
  
  for (var i = 0; i < draggableElements.length; i++) {
    var element = draggableElements[i];
    
    // Apply random position to each element on page load
    randomPosition(element);
    
    // Enable dragging on each element
    dragElement(element);
  }
  