const gameContainer = document.getElementById("game");
let timesClicked = 0;
let firstCard = null;
let secondCard = null;

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



function handleCardClick(event) {
  const clickedCard = event.target;

  if (clickedCard === firstCard) {
    return;
  }

  const clickedColor = clickedCard.classList[0];
  clickedCard.style.backgroundColor = clickedColor;

  if (firstCard === null) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;

    if (firstCard !== null && secondCard !== null) {
      const firstColor = firstCard.classList[0];
      const secondColor = secondCard.classList[0];
      if (firstColor === secondColor) {
        console.log('match!')
      } else {
        setTimeout(() => {

          if (firstCard !== null) {
            firstCard.style.backgroundColor = "";
          }
          if (secondCard !== null) {
            secondCard.style.backgroundColor = "";
          }
          
          // Reset variables for the next pair of clicks
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }
  }
  if (timesClicked === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
