document.addEventListener('DOMContentLoaded', (event) =>

{const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);



let firstCard = null;
let secondCard = null;
let busy = false;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || Infinity;

const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

scoreDisplay.textContent = score;
bestScoreDisplay.textContent = bestScore === Infinity ? 'N/A' : bestScore;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
});


resetButton.addEventListener('click', () => {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  score = 0;
  scoreDisplay.textContent = score;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  firstCard = null;
  secondCard = null;
  busy = false;
  console.log('clicked!')
});



function handleCardClick(event) {
  if (busy) return;
  const target = event.target;
  target.style.backgroundColor = target.classList[0];

  if (!firstCard) {
    firstCard = target;
  } else if (firstCard === target) {
    firstCard.style.backgroundColor = '';
    firstCard = null;
  } else if (!secondCard) {
    secondCard = target;

    if (firstCard.classList[0] === secondCard.classList[0]) {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
    } else {
      busy = true;
      setTimeout(() => {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard = null;
        secondCard = null;
        busy = false;
      }, 1000);
    }

    score++;
    scoreDisplay.textContent = score;
    if (score < bestScore) {
      bestScore = score;
      bestScoreDisplay.textContent = bestScore;
      localStorage.setItem('bestScore', bestScore);
    }
    }
  }})
