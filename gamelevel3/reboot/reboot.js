const bootLines = [
    "Initializing core modules...",
    "Loading memory sectors...",
    "Reestablishing connection protocols...",
    "Verifying security layer...",
    "System parameters: OK",
    "Running diagnostics...",
    "All systems operational.",
    ">> SYSTEM RESTORED."
  ];
  
  const bootText = document.getElementById("boot-text");
  const bootSequence = document.querySelector(".boot-sequence");
  const loadingContainer = document.querySelector(".loading-bar-container");
  const loadingText = document.querySelector(".loading-text");
  
  // Wait until last block animation finishes (2s)
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
      }
    };
    typeLine();
  }