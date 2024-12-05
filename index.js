const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const lettersDiv = document.getElementById("letters");
const restartButton = document.getElementById("restart");

// URL to fetch words from GitHub file (replace with your actual GitHub raw file URL)
const WORDS_URL = "https://raw.githubusercontent.com/yourusername/yourrepo/main/words.txt";

let chosenWord = "";
let displayWord = [];
let wrongGuesses = 0;
const maxGuesses = 6;

// Fetch words from GitHub file
async function fetchWords() {
  const response = await fetch(WORDS_URL);
  const words = await response.text();
  return words.split("\n");
}

// Start a new game
async function startGame() {
  const words = await fetchWords();
  chosenWord = words[Math.floor(Math.random() * words.length)].trim().toUpperCase();
  displayWord = Array(chosenWord.length).fill("_");
  wrongGuesses = 0;

  updateWordDisplay();
  message.textContent = "";
  createLetterButtons();
}

// Update the displayed word
function updateWordDisplay() {
  wordDisplay.textContent = displayWord.join(" ");
}

// Create letter buttons
function createLetterButtons() {
  lettersDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    lettersDiv.appendChild(button);
  }
}

// Handle a letter guess
function handleGuess(letter, button) {
  button.disabled = true;

  if (chosenWord.includes(letter)) {
    // Correct guess
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        displayWord[i] = letter;
      }
    }
    updateWordDisplay();

    if (!displayWord.includes("_")) {
      message.textContent = "You win! 🎉";
      disableAllButtons();
    }
  } else {
    // Wrong guess
    wrongGuesses++;
    if (wrongGuesses >= maxGuesses) {
      message.textContent = `Game Over! The word was "${chosenWord}".`;
      disableAllButtons();
    }
  }
}

// Disable all buttons
function disableAllButtons() {
  const buttons = document.querySelectorAll("#letters button");
  buttons.forEach((button) => (button.disabled = true));
}

// Restart the game
restartButton.addEventListener("click", startGame);

// Start the first game on page load
startGame();
