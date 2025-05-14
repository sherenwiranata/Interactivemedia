const bootLines = [
    "Loading memory sectors...",
    "Some sleepless nights...",
    "Reestablishing connection protocols...",
    "Five mental breakdowns later...",
    "System parameters: OK",
    "Running diagnostics...",
    "Game unavailable",
    ">> SYSTEM RESTORED."
  ];
  
  const bootText = document.getElementById("boot-text");
  const bootSequence = document.querySelector(".boot-sequence");
  const loadingContainer = document.querySelector(".loading-bar-container");
  const loadingText = document.querySelector(".loading-text");
  
  setTimeout(() => {
    loadingContainer.style.display = "none";
    loadingText.style.display = "none";
    bootSequence.classList.remove("hidden");
    showBootText();
  }, 4500);
  
  function showBootText() {
    let i = 0;
  
    const typeLine = () => {
      if (i < bootLines.length) {
        bootText.textContent += bootLines[i] + "\n";
        i++;
        setTimeout(typeLine, 600);
      } else {
        showContinuePrompt();
      }
    };
  
    typeLine();
  }
  
  function showContinuePrompt() {
    const continueMessage = document.createElement("div");
    continueMessage.textContent = "Press any key or tap to continue...";
    continueMessage.classList.add("continue-msg");
    bootSequence.appendChild(continueMessage);
  
    setTimeout(() => {
      document.addEventListener("keydown", goToNextPage);
      document.addEventListener("touchstart", goToNextPage);
    }, 1000);
  }
  
  function goToNextPage() {
    window.location.href = "nextpage.html"; // Replace with your target page
  }