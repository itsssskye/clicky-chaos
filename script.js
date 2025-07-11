// Track click and chaos stages
let clickCount = 0;
let stage = 0;

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
    clickCount++; // Add 1 to counter
    counterText.textContent = `Clicks: ${clickCount}`; // Update counter text

    // Run animation only after 1st click
    if (clickCount !== 1) {
        button.classList.add("shrink-effect");
        setTimeout(() => button.classList.remove("shrink-effect"), 200);
    }

    // Stage 1
    if (stage === 0) {
        popup.style.display = "flex";
        setTimeout(() => popup.classList.add("show"), 10);
        stage = 1;
        return;
    }

    // Stage 2
    if (stage === 2 && clickCount === 2) {
        dvdLogo.style.display = "block";

        // Define screen size
        screenW = window.innerWidth;
        screenH = window.innerHeight;

        // Define logo size
        dvdW = dvdLogo.offsetWidth;
        dvdH = dvdLogo.offsetHeight;

        // Center DVD on screen
        x = (screenW - dvdW) / 2;
        y = (screenH - dvdH) / 2;
        dvdLogo.style.left = x + "px";
        dvdLogo.style.top = y + "px";

        animateDVD();
    }

    // Speeds up every click after DVD starts
    if (stage === 2 && clickCount > 2) {
        dx *= 1.02;
        dy *= 1.02;
        const maxSpeed = 20;
        dx = Math.sign(dx) * Math.min(Math.abs(dx), maxSpeed);
        dy = Math.sign(dy) * Math.min(Math.abs(dy), maxSpeed);
    }
});

// Button for chaos popup
startBtn.addEventListener("click", () => {
  // Diable chaos button during animation sequence
  button.disabled = true;
  button.style.pointerEvents = "none";
  button.style.opacity = "0.6";

  // Play vine boom
  const vineBoom = document.getElementById("vine-boom");
  vineBoom.currentTime = 0;
  vineBoom.play();

  // Start popup zoom-out + chaos message zoom-in at the same time
  popup.classList.add("popup-out");
  message.style.display = "block";
  message.classList.add("chaos-text-in");

  // Remove popup after animation finishes
  setTimeout(() => {
    popup.style.display = "none";
  }, 600);

  // After 1 second, fade out chaos message
  setTimeout(() => {
    message.classList.remove("chaos-text-in");
    message.classList.add("chaos-fade-out");

    // After fade-out, reveal main UI
    setTimeout(() => {
      message.style.display = "none";
      main.style.display = "block";
      stage = 2;

      // Re-enable chaos button
      button.disabled = false;
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
    }, 600); // Match chaos-fade-out duration
  }, 1300); // Delay before fading out chaos text
});

function animateDVD() {
  // Define screen size
  screenW = window.innerWidth;
  screenH = window.innerHeight;

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