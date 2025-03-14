// General variables
const rows = 4;
const cols = 4;
const totalTiles = rows * cols;

// Per puzzle variables
let selectedPuzzle;
let mistakes = 0;
let solvedTiles = 0;

// Define other wallpapers
const wallpapers = [
    { displayName: "Jungle", fileName: "jungle"},
]

// Define puzzles with names and images
const puzzles = [
    { displayName: "Albatross", fileName: "albatross" },
    { displayName: "Baboon", fileName: "baboon" },
    { displayName: "Bald Eagle", fileName: "bald-eagle" },
    { displayName: "Blue Whale", fileName: "blue-whale" },
    { displayName: "Crocodile", fileName: "crocodile" },
    { displayName: "Elephant", fileName: "elephant" },
    { displayName: "Giant Squid", fileName: "giant-squid" },
    { displayName: "Hammerhead Shark", fileName: "hammerhead-shark" },
    { displayName: "Humpback Whale", fileName: "humpback-whale" },
    { displayName: "Hummingbird", fileName: "hummingbird" },
    { displayName: "Koala", fileName: "koala" },
    { displayName: "Manta Ray", fileName: "manta-ray" },
    { displayName: "Moon Bear", fileName: "moon-bear" },
    { displayName: "Octopus", fileName: "octopus" },
    { displayName: "Opossum", fileName: "opossum" },
    { displayName: "Pygmy Marmoset", fileName: "pygmy-marmoset" },
    { displayName: "Pine Marten", fileName: "pine-marten" },
    { displayName: "Red Panda", fileName: "red-panda" },
    { displayName: "Ring Tailed Lemur", fileName: "ring-tailed-lemur" },
    { displayName: "Spectacled Owl", fileName: "spectacled-owl" },
    { displayName: "Weasel", fileName: "weasel" },
    { displayName: "Wolverine", fileName: "wolverine" }
];

function showGameMessage(message) {
    const gameMessage = document.getElementById("gameMessage");

    // Reset any ongoing fade-out
    clearTimeout(gameMessage.hideTimeout);

    // Append the new message (keeping previous content)
    const span = document.createElement("span");
    span.textContent = message;
    span.classList.add("game-message");

    gameMessage.appendChild(span);
    gameMessage.appendChild(document.createElement("br"));

    gameMessage.classList.remove("hidden");
    gameMessage.style.opacity = "1";

    // Ensure only the last call sets the timeout
    gameMessage.hideTimeout = setTimeout(() => {
        gameMessage.style.opacity = "0";

        setTimeout(() => {
            // Remove all messages when fading completes
            gameMessage.innerHTML = ""; 
            gameMessage.classList.add("hidden");
        }, 500);
    }, 3000);
}

function drawUiElements() {
  console.log("Draw game elements");

  const user = netlifyIdentity.currentUser();
  const elementIds = ["solvedPuzzlesListContainer", "loggedInContent", "mistakeContainer", "puzzleProgressContainer"];

  elementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = user ? "block" : "none";
    }
  });

  identityButton = document.getElementById("identityButton");

  if (user) {
    identityButton.innerText = "Log Out";
    identityButton.addEventListener("click", () => {
      netlifyIdentity.logout();
    });
  } else {
    identityButton.innerText = "Sign Up / Log In";
    identityButton.addEventListener("click", () => {
      netlifyIdentity.open();
    });
  }

  // Load correct user's solved puzzles
  displaySolvedPuzzlesList();

  // Display currently solved puzzles icons
  displaySolvedPuzzlesIcons();
}

// Set the background
function setEmptyBg() {
  const background = document.querySelector('.background');
  const jungle = wallpapers.find(p => p.displayName === "Jungle");
  background.style.backgroundImage = `url('assets/img/${jungle.fileName}.png')`;
}

document.addEventListener("DOMContentLoaded", function () {

    // Netlify identity widget
    document.getElementById("identityButton").addEventListener("click", () => {
      netlifyIdentity.open();   // Open the Netlify Identity login/signup modal
    });

    // Initialize Netlify Identity
    netlifyIdentity.on("init", user => {
      console.log("[netlify > init] Checking user", user);
    });

    // When a user logs in, show the content
    netlifyIdentity.on("login", user => {
      console.log("[netlify > login] User logged in", user);

      drawUiElements();

      // Attempt to load a puzzle if one not in progress
      let userEmail = user.email;
      let userData = JSON.parse(localStorage.getItem(userEmail)) || {};
      const savedState = userData.gameState;

      if (savedState && savedState.gameInProgress) {
        console.log("Restoring saved game state...");
        loadGameState();
      } else {
        console.log("No saved game in progress.");

        setEmptyBg();
        updateMistakesDisplay();

      }
    });

    // When a user logs out, hide the content
    netlifyIdentity.on("logout", () => {
      console.log("[netlify > logout] User logged out");

      // Hide the game area
      drawUiElements();

      // Closes the modal on logout
      netlifyIdentity.close();
    });

    netlifyIdentity.init();

    // Check user status and show/hide elements
    const user = netlifyIdentity.currentUser();
    console.log("Page loading. Netlify user: ", user);

    if (user) {
        let userEmail = user.email;
        let userData = JSON.parse(localStorage.getItem(userEmail)) || {};
        const savedState = userData.gameState;

        // Restore game if one was in progress for the user
        if (savedState && savedState.gameInProgress) {
          console.log("Restoring saved game state.");
          loadGameState();
        } else {
          console.log("No saved game in progress.");

          setEmptyBg();
          updateMistakesDisplay();

        }

        // Show correct identity button
        document.getElementById("identityButton").innerText = "Log Out";
    }

    drawUiElements();
  });

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Open the question popup
function openPopup(square) {
  const popup = document.getElementById('popupForm');
  const questionText = document.getElementById('questionText');
  const userAnswer = document.getElementById('userAnswer');
  userAnswer.value = '';
  questionText.textContent = `What is ${square.dataset.calculation}?`;
  popup.style.display = 'flex';
  popup.dataset.squareId = square.id;

  // Focus the answer input field when the popup opens
  userAnswer.focus();
}

// Close the popup
function closePopup() {
  document.getElementById('popupForm').style.display = 'none';
}

// Start a new puzzle
function startPuzzle(puzzle) {
    console.log(`starting ${puzzle.displayName} puzzle`);

    // Initialise the mistakes display
    mistakes = 0;
    updateMistakesDisplay();

    // Set current puzzle
    selectedPuzzle = puzzle;

    // Set background image
    const bgElement = document.querySelector(".background");

    if (bgElement) {
        console.log(`Loading puzzle image: assets/img/${puzzle.fileName}.png`);
        bgElement.style.backgroundImage = `url('assets/img/${puzzle.fileName}.png')`;
    }

    // Generate grid of calculations
    generateGrid();
}

// Keep track of solved puzzes per user in localStorage
function updateSolvedPuzzles(puzzleName) {
    const user = netlifyIdentity.currentUser();
    if (!user) return;

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    if (!userData.solvedPuzzles.includes(puzzleName)) {
        userData.solvedPuzzles.push(puzzleName);
        localStorage.setItem(userEmail, JSON.stringify(userData));
    }
}

// Display solved puzzles list
function displaySolvedPuzzlesList() {
    const user = netlifyIdentity.currentUser();
    if (!user) return;

    const solvedPuzzlesList = document.getElementById("solvedPuzzlesList");
    solvedPuzzlesList.innerHTML = "";

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    userData.solvedPuzzles.forEach(puzzle => {
        const listItem = document.createElement("li");
        listItem.textContent = puzzle;
        solvedPuzzlesList.appendChild(listItem);
    });
}

function displaySolvedPuzzlesIcons() {
    const user = netlifyIdentity.currentUser();
    if (!user) return;

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    const progressGrid = document.getElementById("puzzleProgressGrid");
    progressGrid.innerHTML = "";

    puzzles.forEach(puzzle => {
        // Create a wrapper div for positioning
        const puzzleWrapper = document.createElement("div");
        puzzleWrapper.classList.add("puzzle-wrapper");

        // Create the image element
        const img = document.createElement("img");
        img.classList.add("puzzle-icon");

        // Check if puzzle is solved
        const isSolved = userData.solvedPuzzles.includes(puzzle.displayName);
        img.src = isSolved ? `assets/img/${puzzle.fileName}-on.png` : `assets/img/${puzzle.fileName}-off.png`;

        puzzleWrapper.appendChild(img);

        // If unsolved, add a lock emoji overlay
        if (!isSolved) {
            // Mark as unsolved for styling
            puzzleWrapper.classList.add("unsolved");

            // Add a lock overlay
            const lockOverlay = document.createElement("div");
            lockOverlay.classList.add("lock-overlay");
            lockOverlay.textContent = "🔒"; // Lock emoji
            puzzleWrapper.appendChild(lockOverlay);

            // Add click event to start that puzzle
            puzzleWrapper.addEventListener("click", () => {
                console.log(`Starting puzzle: ${puzzle.displayName}`);
                startPuzzle(puzzle);
            });
        }

        progressGrid.appendChild(puzzleWrapper);
    });
}

// Save game state per user
function saveGameState() {
  const user = netlifyIdentity.currentUser();

  if (!user) return; // Don't save if no user is logged in

  let userEmail = user.email;
  let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [], gameState: null };

  const tiles = Array.from(document.querySelectorAll(".square")).map(square => ({
    id: square.id,
    calculation: square.dataset.calculation,
    answer: square.dataset.answer,
    color: square.style.backgroundColor,
    solved: square.classList.contains("fade-out") // Mark if tile was solved
  }));

  userData.gameState = {
    puzzleName: selectedPuzzle.displayName,
    tiles: tiles,
    mistakes: mistakes,
    gameInProgress: solvedTiles < totalTiles
  };

  localStorage.setItem(userEmail, JSON.stringify(userData));
}

function loadGameState() {
  console.log("loadGameState called");

  const user = netlifyIdentity.currentUser();
  if (!user) return; // No user logged in, start fresh

  let userEmail = user.email;
  let userData = JSON.parse(localStorage.getItem(userEmail));

  if (!userData || !userData.gameState) return; // No saved game state, start fresh
  const savedState = userData.gameState;

  const background = document.querySelector('.background');
  background.innerHTML = "";  // Clear game area

  selectedPuzzle = puzzles.find(p => p.displayName === savedState.puzzleName);
  background.style.backgroundImage = `url('assets/img/${selectedPuzzle.fileName}.png')`;

  mistakes = savedState.mistakes;
  updateMistakesDisplay();

  savedState.tiles.forEach(tileData => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = tileData.id;
    square.style.backgroundColor = tileData.color;
    square.dataset.calculation = tileData.calculation;
    square.dataset.answer = tileData.answer;
    square.textContent = tileData.solved ? "" : tileData.calculation; // Hide if solved

    if (tileData.solved) {
      square.classList.add("fade-out"); // Keep it hidden
    } else {
      square.addEventListener("click", () => openPopup(square));
    }

    background.appendChild(square);
  });
}

// Check if all tiles are solved
function checkPuzzleCompletion() {
    console.log(`Checking puzzle completion: ${solvedTiles}/${totalTiles}`);

    if (solvedTiles === totalTiles) {
        console.log("Puzzle Completed:", selectedPuzzle.displayName);

        // Wait for the last tile's fade-out effect
        setTimeout(() => {
            showGameMessage(`🎉 Congratulations! You completed ${selectedPuzzle.displayName}.`);

            // Update local storage
            updateSolvedPuzzles(selectedPuzzle.displayName);

            // Redraw game UI
            drawUiElements();

            // Initialise the mistakes display
            mistakes = 0;
            updateMistakesDisplay();

            // Need to re-save the state because it was saved before the timeout
            saveGameState();
        }, 1000);   // Timeout to match your fade-out duration
    }
}

// Update the mistake display
function updateMistakesDisplay() {
  console.log("Updating mistakes display");

  const mistakesDisplay = document.getElementById("mistakesDisplay");
  mistakesDisplay.innerHTML = '';  // Clear the previous content

  // Loop to create 3 X's, and fill them based on the number of mistakes
  for (let i = 0; i < 3; i++) {
    const xElement = document.createElement("span");
    xElement.classList.add("mistake-x");
    if (i < mistakes) {
      xElement.classList.add("filled"); // Fill the X if mistake is made
    }
    xElement.textContent = "X";  // Set the character for the X
    mistakesDisplay.appendChild(xElement);
  }
}

// Function to submit the answer
function submitAnswer() {
  const popup = document.getElementById('popupForm');
  const squareId = popup.dataset.squareId;
  const square = document.getElementById(squareId);
  const userAnswer = document.getElementById('userAnswer').value;

  // Define the sounds for correct and incorrect answers
  const correctSound = new Audio('assets/sounds/correct.mp3');
  const incorrectSound = new Audio('assets/sounds/incorrect.mp3');

  if (userAnswer === square.dataset.answer) {
    correctSound.play();

    // Fade out the tile
    square.classList.add('fade-out');

    square.textContent = '';  // Remove the calculation text from the square

    closePopup();  // Close the popup

    solvedTiles++; // Increase solved tile count

    checkPuzzleCompletion(); // Check if all tiles are solved
  } else {
    incorrectSound.play();
    
    // Increase mistake count
    mistakes++; 
    updateMistakesDisplay();

    // Close the popup
    closePopup();

    if (mistakes >= 3) {
      // Delay the alert to let the sound play first
      setTimeout(() => {
        alert("Too many mistakes. Try harder!");

        // Reset mistakes for the new puzzle
        mistakes = 0;
        updateMistakesDisplay();

        setEmptyBg();
      }, 1000);
    }
  }

  saveGameState();
}

// Generate a random calculation (multiplication and division)
function generateRandomCalculation() {
  const operations = ['x', '÷'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  
  let calculation = '';
  let answer = 0;

  switch (operation) {
    case 'x':
      calculation = `${num1} x ${num2}`;
      answer = num1 * num2;
      break;
    case '÷':
      calculation = `${num1 * num2} ÷ ${num2}`;
      answer = num1;
      break;
  }

  return { calculation, answer };
}

// Generate the grid of squares with calculations inside
function generateGrid() {
  console.log(`Generate a new grid of calculations`);

  // Re-initialise solved puzzles counter
  solvedTiles = 0;

  const background = document.querySelector('.background');

  // Remove all previous squares
  background.innerHTML = '';

  for (let i = 0; i < totalTiles; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = `square${i + 1}`;

    // Generate a random calculation for each square
    const { calculation, answer } = generateRandomCalculation();

    square.dataset.calculation = calculation;
    square.dataset.answer = answer;
    square.style.backgroundColor = getRandomColor(); // 'transparent' for debugging images
    square.textContent = calculation;
    square.addEventListener('click', () => openPopup(square));

    background.appendChild(square);
  }
}

// Event listener for the Enter key to submit the answer
document.getElementById('userAnswer').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitAnswer();
  }
});

// Event listener for the Escape key to close the popup
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
});
