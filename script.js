// Start click count at 0
let clickCount = 0;

// Grab button and counter elements from HTML
const button = document.getElementById("chaos-button");
const counterText = document.getElementById("counter");

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