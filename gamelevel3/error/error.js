window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".glitch-intro").style.display = "none";
      document.querySelector(".content").style.display = "flex"; // reveal main content
    }, 800); // 2 seconds glitch intro
  });