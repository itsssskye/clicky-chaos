// Start click count at 0
let clickCount = 0;

// Grab elements

// Main elements
const button = document.getElementById("chaos-button");
const counterText = document.getElementById("counter");

// Popup elements
const startBtn = document.getElementById("start-chaos-btn");
const popup = document.getElementById("chaos-popup");
const message = document.getElementById("chaos-message");
const main = document.getElementById("main-container");

// Run every time button is clicked
button.addEventListener("click", () => {
    clickCount++; // Add 1 to counter
    counterText.textContent = `Clicks: ${clickCount}`; // Update counter text

    // Add class that triggers click animation
    button.classList.add("shrink-effect");

    // Remove class shortly after to complete animation
    setTimeout(() => {
        button.classList.remove("shrink-effect");
    }, 200); // Match animation durations
});

startBtn.addEventListener("click", () => {
  popup.style.display = "none";
  message.style.display = "block";

  setTimeout(() => {
    message.style.display = "none";
    main.style.display = "block";
  }, 1000); // 1 seconds
});