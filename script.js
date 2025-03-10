// General variables
const rows = 5;
const cols = 5;
const totalTiles = rows * cols;

// Per puzzle variables
let randomPuzzle;
let mistakes = 0;
let solvedTiles = 0;

// Define other wallpapers
const wallpapers = [
    { name: "Jungle", image: "assets/img/jungle.jpg"},
]

// Define puzzles with names and images
const puzzles = [
    { name: "Baboon", image: "assets/img/baboon.jpg" },
    { name: "Blue Whale", image: "assets/img/blue-whale.jpg" },
    { name: "Elephant", image: "assets/img/elephant.jpeg" },
    { name: "Humpback Whale", image: "assets/img/humpback-whale.jpg" },
    { name: "Moon Bear", image: "assets/img/moon-bear.jpg" },
    { name: "Pygmy Marmoset", image: "assets/img/pigmy-marmoset.jpg" },
    { name: "Pine Marten", image: "assets/img/pine-marten.jpg" },
    { name: "Red Panda", image: "assets/img/red-panda.jpg" },
    { name: "Weasel", image: "assets/img/weasel.jpg" },
    { name: "Wolverine", image: "assets/img/wolverine.jpg" }
];

function showGameElements() {
  console.log("Showing game elements");

  const listContainer = document.getElementById("solvedPuzzlesListContainer");
  const gameContainer = document.getElementById("loggedInContent");
  const mistakesCount = document.getElementById("mistakeContainer");

  listContainer.style.display = "block";
  gameContainer.style.display = "block";
  mistakesCount.style.display = "block";
}

function hideGameElements() {
  console.log("Hiding game elements");

  const listContainer = document.getElementById("solvedPuzzlesListContainer");
  const gameContainer = document.getElementById("loggedInContent");
  const mistakesCount = document.getElementById("mistakeContainer");

  listContainer.style.display = "none";
  gameContainer.style.display = "none";
  mistakesCount.style.display = "none";
}

function checkUserStatus() {
  console.log("Check user status ...");
  const user = netlifyIdentity.currentUser();

  if (user) {
    console.log("User logged in, showing game elements", user);
    showGameElements();
    displaySolvedPuzzles();
  } else {
    console.log("No user logged in. Hide game elements");
    hideGameElements();
  }
}

document.addEventListener("DOMContentLoaded", function () {
    // Netlify identity widget
   document.getElementById("identityButton").addEventListener("click", () => {
      netlifyIdentity.open();   // Open the Netlify Identity login/signup modal
    });

    // Initialize Netlify Identity
    netlifyIdentity.on("init", user => {
      console.log("[netlify > init] Checking user", user);

      if (user) {
        // If user is logged in, display the content
        showGameElements();

        // Show correct identity button
        document.getElementById("identityButton").innerText = "Log Out";
      } else {
        // Otherwise content hidden
        hideGameElements();
      }
    });

    // When a user logs in, show the content
    netlifyIdentity.on("login", user => {
      console.log("[netlify > login] User logged in", user);

      // Display the game area
      showGameElements();

      document.getElementById("identityButton").innerText = "Log Out"; 
      document.getElementById("identityButton").addEventListener("click", () => {
        netlifyIdentity.logout(); // Logs out the user when they click "Log Out"
      });

      // Load correct user's solved puzzles
      displaySolvedPuzzles();

    });

    // When a user logs out, hide the content
    netlifyIdentity.on("logout", () => {
      console.log("[netlify > logout] User logged out");

      // Hide the game area
      hideGameElements();

      // Closes the modal on logout
      netlifyIdentity.close();

      // Reset button text
      document.getElementById("identityButton").innerText = "Sign Up / Log In";
      document.getElementById("identityButton").addEventListener("click", () => {
        netlifyIdentity.open();
      });
    });

    // Start Netlify Identity
    netlifyIdentity.init();

    // Check user status and show/hide elements
    checkUserStatus();

    // Attempt to load a new puzzle
    loadNextPuzzle();
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
    // Set background image
    const bgElement = document.querySelector(".background");

    if (bgElement) {
        console.log(`Loading puzzle image: ${puzzle.image}`);
        bgElement.style.backgroundImage = `url('${puzzle.image}')`;
    }

    // Generate grid of calculations
    generateGrid();
}

// Load another puzzle, if available
function loadNextPuzzle() {
    console.log(" Load next puzzle");

    const user = netlifyIdentity.currentUser();
    if (!user) return;

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    // Find an unsolved puzzle
    let unsolvedPuzzles = puzzles.filter(p => !userData.solvedPuzzles.includes(p.name));

    if (unsolvedPuzzles.length > 0) {
        // Pick a new puzzle and start it
        randomPuzzle = unsolvedPuzzles[Math.floor(Math.random() * unsolvedPuzzles.length)];
        startPuzzle(randomPuzzle);
    } else {
        // All puzzles solved
        alert(`🎉 Congratulations! You completed all the puzzles`);

        // Set the background
        const background = document.querySelector('.background');
        const jungle = wallpapers.find(p => p.name === "Jungle");
        background.style.backgroundImage = `url('${jungle.image}')`;
    }
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

    displaySolvedPuzzles();

    loadNextPuzzle();
}

// Display solved puzzles
function displaySolvedPuzzles() {
    const user = netlifyIdentity.currentUser();
    const solvedPuzzlesList = document.getElementById("solvedPuzzlesList");
    solvedPuzzlesList.innerHTML = "";

    if (!user) return; // No user logged in, nothing to display

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    userData.solvedPuzzles.forEach(puzzle => {
        const listItem = document.createElement("li");
        listItem.textContent = puzzle;
        solvedPuzzlesList.appendChild(listItem);
    });
}

// Check if all tiles are solved
function checkPuzzleCompletion() {
    if (solvedTiles === totalTiles) {
        console.log("Puzzle Completed:", randomPuzzle.name);

        // Wait for the last tile's fade-out effect
        setTimeout(() => {
            alert(`🎉 Congratulations! You completed ${randomPuzzle.name}.`);

            // Update local storage
            updateSolvedPuzzles(randomPuzzle.name);
        }, 1000);   // Timeout to match your fade-out duration
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
    document.getElementById("mistakeCount").textContent = mistakes;

    if (mistakes >= 3) {
      // No more retries
      closePopup();

      // Delay the alert to let the sound play first
      setTimeout(() => {
        alert("Too many mistakes! Loading a new puzzle...");

        // Reset mistakes for the new puzzle
        mistakes = 0; 
        document.getElementById("mistakeCount").textContent = mistakes;

        // Load another puzzle
        loadNextPuzzle();
      }, 1000); // 1-second delay (adjust as needed)
    }
  }
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
    console.log(`Add tile ${i}`);

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

    console.log(square);
    console.log(background);

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
