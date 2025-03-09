document.addEventListener("DOMContentLoaded", function () {
    console.log("Script is running!");

    const images = [
        "img/baboon.png",
        "img/elephant.png",
        "img/fish.png",
        "img/moon-bear.jpg",
        "img/pigmy-marmoset.jpg",
        "img/pine-marten.jpeg",
        "img/read-panda.jpg",
        "img/weasel.jpg",
        "img/wolverine.jpg"
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

// Function to open the popup
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

// Function to close the popup
function closePopup() {
  document.getElementById('popupForm').style.display = 'none';
}

// Function to submit the answer
function submitAnswer() {
  const popup = document.getElementById('popupForm');
  const squareId = popup.dataset.squareId;
  const square = document.getElementById(squareId);
  const userAnswer = document.getElementById('userAnswer').value;

  if (userAnswer === square.dataset.answer) {
    // Remove the red background and calculation
    square.style.backgroundColor = 'transparent';  // Remove the background color
    square.style.backgroundImage = 'none';  // Ensure no background image is present
    square.textContent = '';  // Remove the calculation text from the square
    closePopup();  // Close the popup
  } else {
    alert('Incorrect answer. Please try again.');
  }
}

// Function to generate a random calculation (addition, multiplication, division)
function generateRandomCalculation() {
  const operations = ['x', '÷']; // Addition, multiplication, division
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
      // Make sure the division results in an integer
      calculation = `${num1 * num2} ÷ ${num2}`;
      answer = num1; // the answer will be num1 since it's num1 * num2 divided by num2
      break;
  }

  return { calculation, answer };
}

// Function to generate the grid of squares with calculations inside
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

    // Set a random background color for the square
    square.style.backgroundColor = getRandomColor();

    // Display the calculation inside the square
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
