// Start click count at 0
let stageCount = 0;

// Screen and logo dimensions
let screenW, screenH, dvdW, dvdH;

// Grab elements

// Main elements
const button = document.getElementById("chaos-button");
const counterText = document.getElementById("counter");

// Popup elements
const startBtn = document.getElementById("start-chaos-btn");
const popup = document.getElementById("chaos-popup");
const message = document.getElementById("chaos-message");
const main = document.getElementById("container");

// DVD logo
const dvdLogo = document.getElementById("dvd-logo");
const dvdColors = ["#FF0000", "#FEC0CA", "#FFFF00", "#008001", "#800080"];
let currentColorIndex = 0;

// Starting position and speed of DVD Logo
let x = 100;
let y = 100;
let dx = 2;
let dy = 2;

// Run every time button is clicked
button.addEventListener("click", () => {
    stageCount++; // Add 1 to counter
    counterText.textContent = `Clicks: ${stageCount}`; // Update counter text

    // Chaos 1
    if (stageCount === 1) {
        animateDVD(); // start DVD only on first click
    }

    // Add class that triggers click animation
    button.classList.add("shrink-effect");

    // Remove class shortly after to complete animation
    setTimeout(() => {
        button.classList.remove("shrink-effect");
    }, 200); // Match animation durations
});

// Button for chaos popup
startBtn.addEventListener("click", () => {
  
  // Starting chaos text
  popup.style.display = "none";
  message.style.display = "block";

  setTimeout(() => {
    message.style.display = "none";
    main.style.display = "block";
    dvdLogo.style.display = "block";

    // Define screen and logo sizes
    screenW = window.innerWidth;
    screenH = window.innerHeight;
    dvdW = dvdLogo.offsetWidth;
    dvdH = dvdLogo.offsetHeight;

    // Center DVD on start
    x = (screenW - dvdW) / 2;
    y = (screenH - dvdH) / 2;
  }, 1000); // 1 second
});

function animateDVD() {
  x += dx;
  y += dy;

  // Bounce off edges
  let hitWall = false;

  if (x + dvdW >= screenW || x <= 0) {
    dx = -dx;
    hitWall = true;
  }
  if (y + dvdH >= screenH || y <= 0) {
    dy = -dy;
    hitWall = true;
  }

  if (hitWall) {
    currentColorIndex = (currentColorIndex + 1) % dvdColors.length;
    dvdLogo.style.backgroundColor = dvdColors[currentColorIndex];
  }

  dvdLogo.style.left = x + "px";
  dvdLogo.style.top = y + "px";

  requestAnimationFrame(animateDVD);
}

function getRandomHue() {
  return Math.floor(Math.random() * 360);
}