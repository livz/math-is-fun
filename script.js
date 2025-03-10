// Global variables
let randomPuzzle;
const rows = 1;
const cols = 1;
const totalTiles = rows * cols;
let solvedTiles = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Netlify identity widget
   document.getElementById("identityButton").addEventListener("click", () => {
      netlifyIdentity.open();   // Open the Netlify Identity login/signup modal
    });

    // Initialize Netlify Identity
    netlifyIdentity.on("init", user => {
      if (user) {
        // If user is logged in, display the content
        document.getElementById("loggedInContent").style.display = "block";
        document.getElementById("solvedPuzzlesListContainer").style.display = "block";

        // Show correct identity button
        document.getElementById("identityButton").innerText = "Log Out";
      } else {
        // Otherwise content hidden
        document.getElementById("loggedInContent").style.display = "none";
        document.getElementById("solvedPuzzlesListContainer").style.display = "none";
      }
    });

    // When a user logs in, show the content
    netlifyIdentity.on("login", user => {
      console.log("User logged in", user);

      // Display the game area
      document.getElementById("loggedInContent").style.display = "block";
      document.getElementById("solvedPuzzlesListContainer").style.display = "block";
      document.getElementById("identityButton").innerText = "Log Out"; 
      document.getElementById("identityButton").addEventListener("click", () => {
        netlifyIdentity.logout(); // Logs out the user when they click "Log Out"
      });

      // Load correct user's solved puzzles
      displaySolvedPuzzles();

    });

    // When a user logs out, hide the content
    netlifyIdentity.on("logout", () => {
      console.log("User logged out");

      // Hide the game area
      document.getElementById("loggedInContent").style.display = "none";
      document.getElementById("solvedPuzzlesListContainer").style.display = "none";

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

    // Select a random puzzle
    randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    console.log("Selected puzzle:", randomPuzzle);

    // Update the background image and display the puzzle name
    const bgElement = document.querySelector(".background");

    if (bgElement) {
        bgElement.style.backgroundImage = `url('${randomPuzzle.image}')`;
        console.log("Background updated!");
    } else {
        console.error("Element with class 'background' not found!");
    }
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

// Keep track of solved puzzes per user in localStorage
function updateSolvedPuzzles(puzzleName) {
    const user = netlifyIdentity.currentUser();
    if (!user) return;

    let userEmail = user.email;
    let userData = JSON.parse(localStorage.getItem(userEmail)) || { solvedPuzzles: [] };

    if (!userData.solvedPuzzles.includes(puzzleName)) {
        userData.solvedPuzzles.push(puzzleName);
        localStorage.setItem(userEmail, JSON.stringify(userData));

        displaySolvedPuzzles();
    }
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

// Show previously solved puzzles when the page loads
displaySolvedPuzzles();

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
  const background = document.querySelector('.background');

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

// Generate the grid when the page loads
window.onload = generateGrid;
