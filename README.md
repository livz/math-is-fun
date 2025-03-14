### Puzzle Safari 🐯
A Math-Based Animal Discovery Game. **Puzzle Safari** makes math an adventure, turning problem-solving into an exciting way to uncover the animal kingdom - one calculation at a time! View it live at [Puzzle Safari](https://puzzle-safari.netlify.app).

**Overview**
Puzzle Safari is an interactive, single-player math puzzle game where players solve calculations to unlock vibrant animal images. Designed for learners of all ages, the game enhances arithmetic skills in an engaging way by combining logic, problem-solving, and pattern recognition.

### Audience
* Young learners practicing fundamental math skills.
* Parents and teachers seeking an educational yet fun experience for kids.
* Anyone who enjoys visual puzzles.

### How it works
* Players begin with a grid of locked animal puzzles.
* Each puzzle contains mathematical calculations embedded within game tiles.
* Players solve these calculations and and reveal parts of the image.
* Solving a puzzle unlocks the corresponding animal in the progress grid.
* Unsolved puzzles appear in grayscale with a lock overlay, while solved puzzles are displayed in full color.

### Technical Details
* **Frontend:** JavaScript, HTML, CSS (grid-based layout for puzzle progress tracking)
* **User Progress Tracking:** `LocalStorage` to save completed puzzles per player
* **Math Puzzles:** Dynamically generated arithmetic challenges, including multiplication and division
* **Game Mechanics:**
  * Players select a puzzle from the progress grid.
  * The game board presents a set of calculations inside square tiles.
  * Players solve the calculations and gradually reveal a hidden image.
  * A real-time progress grid tracks which puzzles have been solved.
* **UI Features:**
  * Scrollable puzzle progress grid
  * Hover effects indicating clickable puzzles
  * Animated unlock transitions
  * Lock overlays for unsolved puzzles

### Development
This project is open for contributions! Here are some key details for developers:
* **Local Development with [Netlify Dev](https://docs.netlify.com/cli/get-started/)**
  * The project is set up for development using Netlify Dev.
  * Netlify Dev simulates the production environment locally, making it easy to test features like authentication and API calls before deployment.
  * To get started, install Netlify CLI and run `netlify dev`.
* **LocalStorage for User Progress**
  * Players’ progress is stored in `LocalStorage`, meaning their solved puzzles persist across sessions.
  * This allows for offline play and an easy, persistent user experience.
* **Code Structure & Contributions**
  * The game logic is modular, with separate functions handling UI updates, math puzzle generation, and progress tracking.
  * Contributions are welcome! If you have an idea for improvements, feel free to submit a **Pull Request (PR)**.
  * Feature suggestions, bug fixes, and UI enhancements are always appreciated.

*Made with ❤️ and JS on a ☀️ day*