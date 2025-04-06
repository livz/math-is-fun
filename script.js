// General variables
const rows = 4;
const cols = 4;
const totalTiles = rows * cols;

// Per puzzle variables
let selectedPuzzle;
let mistakes = 0;
let score = 0;
let streak = 0;
let solvedTiles = 0;
let currentGameType = 'mixed';

// Show in-game messages
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

// Draw user interface elements
function drawUiElements() {
  console.log("Draw game elements");

  const user = netlifyIdentity.currentUser();
  const elementIds = ["solvedPuzzlesListContainer", "loggedInContent", "mistakeContainer", "puzzleProgressContainer", "scoreBox", "gameTypeSelector"];

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

// Handle game selector buttons
document.querySelectorAll('.game-type-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update game type
        currentGameType = button.dataset.type;
        console.log("Game type changed to:", currentGameType);

        // Visually update selected button
        document.querySelectorAll('.game-type-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // Close the question popup, if already open
        closePopups();

        // Restart current puzzle with new game logic
        if (selectedPuzzle) {
            startPuzzle(selectedPuzzle);
        }
    });
});

// Page load events
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

// Event listener for the Escape key to close the popups
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopups();
  }
});

// Event listener for the Enter key to submit the answer
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const mathPopup = document.getElementById('mathPopup');
    const geronimoPopup = document.getElementById('geronimoPopup');

    // Only submit if a popup is visible
    if (mathPopup && mathPopup.style.display === 'flex') {
      const userInput = document.getElementById('userAnswer');
      if (userInput === document.activeElement) {
        // Prevent form submission side effects
        event.preventDefault();
        submitAnswer();
      }
    } else if (geronimoPopup && geronimoPopup.style.display === 'flex') {
      event.preventDefault();
      submitAnswer();
    }
  }
});

// Event listener to the Read Question buttons
document.getElementById('readQuestionBtn').addEventListener('click', function() {
  readQuestion();
});

document.getElementById('readGeronimoQuestionBtn').addEventListener('click', function() {
  readQuestion();
});

// Render difficulty using mouse emojis
function updateDifficultyDisplay(level) {
  const container = document.getElementById("geronimoDifficulty");
  container.innerHTML = '';

  for (let i = 1; i <= 3; i++) {
    const mouse = document.createElement('span');
    mouse.textContent = '🐭';
    if (i > level) {
      mouse.classList.add('inactive');
    }
    container.appendChild(mouse);
  }
}

// Open the Geronimo question popup
function openGeronimoPopup(square, questionObj) {
  const popup = document.getElementById("geronimoPopup");
  const questionText = document.getElementById("geronimoQuestionText");
  const optionsContainer = document.getElementById("geronimoOptions");

  questionText.textContent = questionObj.question;
  optionsContainer.innerHTML = "";

  // Add options
  questionObj.options.forEach((option) => {
    const label = document.createElement("label");
    label.classList.add("popup-option-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "geronimoAnswer";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsContainer.appendChild(label);
  });

  // Update difficulty level
  updateDifficultyDisplay(Number(questionObj.difficulty));

  // Show popup
  popup.style.display = 'flex';

  // Save context for use in submitAnswer
  popup.dataset.squareId = square.id;
}

// Generate a random Geronimo question
function generateGeronimoPuzzle() {
  const randomIndex = Math.floor(Math.random() * geronimoPuzzles.length);

  return geronimoPuzzles[randomIndex];
}

function generateGeronimoGrid() {
  console.log(`Generate a new grid of Geronimo questions`);

  // Re-initialise solved puzzles counter
  solvedTiles = 0;

  const background = document.querySelector('.background');

  // Clear any previous content
  background.innerHTML = '';

  for (let i = 0; i < totalTiles; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = `square${i + 1}`;

    // Generate a random Geronimo puzzle (image + question)
    const questionObj = generateGeronimoPuzzle();

    // Render the image in the tile
    square.innerHTML = `<img src="assets/geronimo/${questionObj.image}" class="geronimo-tile-image">`;

    // Store question in dataset
    square.dataset.questionObj = JSON.stringify(questionObj);

    const correctIndex = questionObj.answerIndex;
    square.dataset.answer = questionObj.options[correctIndex];

    square.style.backgroundColor = getRandomColor();

    // Add click handler to show the quiz question
    square.addEventListener('click', () => {
      openGeronimoPopup(square, questionObj);
    });

    background.appendChild(square);
  }
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Open the math question popup
function openMathPopup(square) {
  console.log("Popup for square: ", square);

  const popup = document.getElementById('mathPopup');
  const questionText = document.getElementById('questionText');
  const userAnswer = document.getElementById('userAnswer');

  userAnswer.value = '';
  questionText.textContent = `What is ${square.dataset.calculation}?`;

  // Set the hint as the data attribute of the button
  const hintButton = document.getElementById('hintButton');
  hintButton.dataset.hint = square.dataset.hint;

  // Show popup
  popup.style.display = 'flex';
  popup.dataset.squareId = square.id;

  // Focus the answer input field when the popup opens
  userAnswer.focus();
}

// Generate a random calculation (multiplication and division)
function generateRandomCalculation() {
  let operations;

  switch (currentGameType) {
    case 'addition':
      operations = ['+'];
      break;
    case 'subtraction':
      operations = ['-'];
      break;
    case 'multiplication':
      operations = ['x'];
      break;
    case 'division':
      operations = ['÷'];
      break;
    case 'mixed':
    default:
      operations = ['+', '-', 'x', '÷'];
      break;
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];

  let calculation = '';
  let answer = 0;
  let hint = '';

  let num1, num2;

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;

      calculation = `${num1} + ${num2}`;
      answer = num1 + num2;
      hint = `${num1 + (num2 - 1)} + 1 = ${answer}`;

      break;

    case '-':
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;

      const bigger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);

      calculation = `${bigger} - ${smaller}`;
      answer = bigger - smaller;
      hint = `${bigger} - ${smaller - 1} = ${bigger - (smaller - 1)}`;

      break;

    case 'x':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;

      calculation = `${num1} x ${num2}`;
      answer = num1 * num2;
      hint = `${num1} x ${num2 - 1} = ${num1 * (num2 - 1)}`;

      break;

    case '÷':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;

      calculation = `${num1 * num2} ÷ ${num2}`;
      answer = num1;
      hint = `${num2 * (num1 - 1)} ÷ ${num2} = ${(num2 * (num1 - 1)) / num2}`;

      break;
  }

  return { calculation, answer, hint };
}

// Generate the grid of squares with calculations inside
function generateCalculationGrid() {
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
    const { calculation, answer, hint } = generateRandomCalculation();

    square.dataset.calculation = calculation;
    square.dataset.answer = answer;
    square.dataset.hint = hint;
    square.style.backgroundColor = getRandomColor(); // 'transparent' for debugging images
    square.textContent = calculation;
    square.addEventListener('click', () => openMathPopup(square));

    background.appendChild(square);
  }
}

// Display the hint tooltip when the user clicks the hint button
function showHint() {
  const hint = document.getElementById('hintButton').dataset.hint;

  // Create the tooltip if it doesn't exist yet
  let tooltip = document.querySelector('.hint-tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.classList.add('hint-tooltip');
    document.body.appendChild(tooltip);
  }

  // Set the hint text
  tooltip.textContent = hint;

  // Show the tooltip
  tooltip.style.display = 'block';

  // Hide the tooltip after a short delay
  setTimeout(() => {
    tooltip.style.display = 'none';
  }, 3000);
}

function generateGrid(gameType = 'mixed') {
  console.log(`Generate a new grid for ${gameType} game`);

  const background = document.querySelector('.background');

  // Remove all previous squares
  background.innerHTML = '';

  // Call the appropriate grid generation function
  if (currentGameType === 'geronimo') {
    generateGeronimoGrid();
  } else {
    // Default behavior for calculation game
    generateCalculationGrid();
  }
}

// Close the popups
function closePopups() {
  document.getElementById('mathPopup').style.display = 'none';
  document.getElementById('geronimoPopup').style.display = 'none';
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

    saveGameState();
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

  document.querySelectorAll(".square").forEach(square => {
    console.log(`Square ID: ${square.id}`);
    console.log(square.dataset);
  });

  const tiles = Array.from(document.querySelectorAll(".square")).map(square => ({
    id: square.id,
    calculation: square.dataset.calculation,
    questionObj: square.dataset.questionObj ? JSON.parse(square.dataset.questionObj) : null,
    answer: square.dataset.answer,
    color: square.style.backgroundColor,
    solved: square.classList.contains("fade-out") // Mark if tile was solved
  }));

  userData.gameState = {
    gameType: currentGameType,
    puzzleName: selectedPuzzle.displayName,
    tiles: tiles,
    mistakes: mistakes,
    score: score,
    streak: streak,
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

  // Restore correct game type
  currentGameType = savedState.gameType;

  savedState.tiles.forEach(tileData => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = tileData.id;
    square.style.backgroundColor = tileData.color;
    square.dataset.questionObj = JSON.stringify(tileData.questionObj);
    square.dataset.calculation = tileData.calculation;
    square.dataset.answer = tileData.answer;
    square.textContent = tileData.solved ? "" : tileData.calculation; // Hide if solved

    if (tileData.solved) {
      square.classList.add("fade-out"); // Keep it hidden
    } else {
      // Open the correct popup based on the game type
      if (savedState.gameType === 'geronimo') {
        // Restore question image
        square.innerHTML = `<img src="assets/geronimo/${tileData.questionObj.image}" class="geronimo-tile-image">`;

        square.addEventListener("click", () => openGeronimoPopup(square, tileData.questionObj));
      } else {
        square.addEventListener("click", () => openMathPopup(square));
      }
    }

    // Highlight the correct game type button
    document.querySelectorAll('.game-type-btn').forEach(button => {
      if (button.dataset.type === currentGameType) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });

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

// Handle score updates
function updateScoreDisplay(correct) {
    console.log("Update score")

    if (correct) {
        streak += 1;
        score += 1;

        // Bonus for every 5th correct answer in a row
        if (streak % 5 === 0) {
            score += 3;
            showGameMessage(`🔥 Bonus! +3 points for a 5-answer streak!`);
        }
    } else {
        streak = 0; // Reset streak on incorrect answer
    }

    // Update UI
    document.getElementById("scoreValue").textContent = score;
    document.getElementById("streakValue").textContent =streak;
}

function hideTiles() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.style.visibility = 'hidden'; // Or use display: 'none' to remove them entirely
  });
}

// Function to submit the answer
function submitAnswer() {
  console.log("Submit answer for game type: ", currentGameType);

  const popup = document.getElementById(
    currentGameType === 'geronimo' ? 'geronimoPopup' : 'mathPopup'
  );

  console.log("Current popup:");
  console.log(popup);

  const squareId = popup.dataset.squareId;
  const square = document.getElementById(squareId);

  // Get the user's answer based on game type
  let userAnswer;
  if (currentGameType === 'geronimo') {
    const selectedOption = popup.querySelector("input[name='geronimoAnswer']:checked");
    if (!selectedOption) {
      // Show a warning if no answer was selected
      alert("Please select an answer");
      return;
    }
    userAnswer = selectedOption.value;
  } else {
    userAnswer = document.getElementById('userAnswer').value.trim();
  }

  // Define the sounds for correct and incorrect answers
  const correctSound = new Audio('assets/sounds/correct.mp3');
  const incorrectSound = new Audio('assets/sounds/incorrect.mp3');

  if (userAnswer === square.dataset.answer) {
    correctSound.play();

    // Fade out the tile
    square.classList.add('fade-out');

    square.textContent = '';  // Remove the calculation text from the square

    closePopups();  // Close the popup

    solvedTiles++; // Increase solved tile count

    // Update score and streak
    updateScoreDisplay(true);

    checkPuzzleCompletion(); // Check if all tiles are solved
  } else {
    incorrectSound.play();
    
    // Increase mistake count
    mistakes++; 
    updateMistakesDisplay();

    // Update score and streak
    updateScoreDisplay();

    // Close the popup
    closePopups();

    if (mistakes >= 3) {
      // Delay the alert to let the sound play first
      setTimeout(() => {
        alert("Too many mistakes. Try harder!");

        // Reset mistakes for the new puzzle
        mistakes = 0;
        updateMistakesDisplay();

        // Hide all tiles
        hideTiles();

        setEmptyBg();
      }, 1000);
    }
  }

  saveGameState();
}

/* Read questions text */
function readQuestion() {
  let questionText = currentGameType === 'geronimo'
    ? document.getElementById('geronimoQuestionText').textContent
    : document.getElementById('questionText').textContent;

  // Replace math operators with their verbal equivalents
  questionText = questionText
    .replace(/\+/g, ' plus ')
    .replace(/-/g, ' minus ')
    .replace(/\*/g, ' times ')
    .replace(/\//g, ' divided by ')
    .replace(/÷/g, ' divided by ')
    .replace(/=/g, ' equals ');

  // Reading the question text
  const question = new SpeechSynthesisUtterance(questionText);
  speechSynthesis.speak(question);

  // If it's a Geronimo question, read the options as well
  if (currentGameType === 'geronimo') {
    const optionsContainer = document.getElementById('geronimoOptions');
    const options = Array.from(optionsContainer.querySelectorAll('label')).map(option => option.textContent);
    options.forEach(option => {
      const optionUtterance = new SpeechSynthesisUtterance(option);
      speechSynthesis.speak(optionUtterance);
    });
  }
}
