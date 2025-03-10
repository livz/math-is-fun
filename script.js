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

        // Show correct identity button
        document.getElementById("identityButton").innerText = "Log Out";
      } else {
        // Otherwise, ensure it's hidden
        document.getElementById("loggedInContent").style.display = "none";
      }
    });

    // Optional: Handle logout event
    netlifyIdentity.on("logout", () => {
      window.location.reload(); // Refresh the page after logout
    });

    // When a user logs in, show the content
    netlifyIdentity.on("login", user => {
      console.log("User logged in", user);

      // Display the game area
      document.getElementById("loggedInContent").style.display = "block";
      document.getElementById("identityButton").innerText = "Log Out"; 
      document.getElementById("identityButton").addEventListener("click", () => {
        netlifyIdentity.logout(); // Logs out the user when they click "Log Out"
      });
    });

    // When a user logs out, hide the content
    netlifyIdentity.on("logout", () => {
      console.log("User logged out");

      // Hide the game area
      document.getElementById("loggedInContent").style.display = "none";

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

    // Prepare the puzzle area
    const images = [
        "assets/img/baboon.jpg",
        "assets/img/blue-whale.jpg",
        "assets/img/elephant.jpeg",
        "assets/img/humpback-whale.jpg",
        "assets/img/moon-bear.jpg",
        "assets/img/pigmy-marmoset.jpg",
        "assets/img/pine-marten.jpg",
        "assets/img/red-panda.jpg",
        "assets/img/weasel.jpg",
        "assets/img/wolverine.jpg"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    console.log("Selected image:", randomImage);

    const bgElement = document.querySelector(".background");

    if (bgElement) {
        bgElement.style.backgroundImage = `url('${randomImage}')`;
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
  const rows = 3; // Number of rows
  const cols = 4; // Number of columns
  const totalSquares = rows * cols;

  for (let i = 0; i < totalSquares; i++) {
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
