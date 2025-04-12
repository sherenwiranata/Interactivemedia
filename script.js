//https://stackoverflow.com/questions/66452961 and chatgpt
document.querySelector(".gameName").addEventListener("click", function() {
    this.classList.add("wobble");

    // Remove the class after animation ends so it can be triggered again
    setTimeout(() => {
        this.classList.remove("wobble");
    }, 300); // Match the animation duration
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
  
    // Check if audio is found and it's really an audio element
    if (audio && typeof audio.play === "function") {
      window.addEventListener("click", () => {
        audio.play().catch(err => {
          console.log("Autoplay blocked:", err);
        });
      }, { once: true });
    } else {
      console.error("Audio element not found or not playable.");
    }
  });