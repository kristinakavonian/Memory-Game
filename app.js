const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
// two of each card because I need a mach


const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];
let shuffledCards = [];
let countStars = 3;
const stars = document.querySelector(".stars");
let lastmoves = document.querySelector(".moves");
let lastcountStars = document.querySelector(".countStars");
let lastallSeconds = document.querySelector(".allSeconds");

// MODAL

var scoreModal = document.getElementById("score-modal");


/* Timer */
var timerVar = setInterval(clockTimer, 1000);
var allSeconds = 0;

function clockTimer() {
  ++allSeconds;
  var hour = Math.floor(allSeconds / 3600);
  var minute = Math.floor((allSeconds - hour * 3600) / 60);
  var seconds = allSeconds - (hour * 3600 + minute * 60);

  document.getElementById(`hour`).innerHTML = hour;
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`seconds`).innerHTML = seconds;
}

function clockStart() {
  timerVar = setInterval(countTimer, 1000);
}

function tpause() {
  clearInterval(timerVar);
}

function sreset() {
  allSeconds = -1;
  clockTimer();
}


//Initialize the game
function init() {
  const shuffeledCards = shuffle(icons);

  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class= '" + icons[i] + "'</i>";
    cardsContainer.appendChild(card);


    // Add click event to each card
    click(card);
  }
}


//Click Event
function click(card) {

  //Card Click Event
  card.addEventListener("click", function() {
    const currentCard = this;
    const previousCard = openedCards[0];

    // We have an existing OPENED card

    if (openedCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openedCards.push(this);

      //We should compare our 2 opened cards
      if (this.innerHTML === openedCards[0].innerHTML) {


        //Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);
        openedCards = [];

        //Check if the game is over
        isOver();


      } else {

        //wait 500 ms then, do this!
        setTimeout(function() {
          currentCard.classList.remove("open", "show", "disable");
          previousCard.classList.remove("open", "show", "disable");
          openedCards = [];
        }, 500);

        //Add new move
        addMove();

      }

    } else {

      //We don't have any opened cards

      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);

    }

  });

}


function isOver() {
  if (matchedCards.length === icons.length) {
    alert("GAME OVER! YOU Won! Do You Want to Play Again? Your Stars are " + countStars + ". Your moves are " + moves +
      ". Your timing in seconds is " + allSeconds);
    clearInterval(timerVar);
  }
}

//Add move
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set the rating
  rating();
}
//Rating
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		            <li><i class="fa fa-star"></i></li>`;

function rating() {
  if (moves > 15) {
    countStars = 1;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (moves > 10) {
    countStars = 2;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  } else {
    countStars = 3;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		                    <li><i class="fa fa-star"></i></li>`;
  }
}





//Restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {

  // Delete All Cards
  cardsContainer.innerHTML = " ";


  //Call 'Init' to create new cards
  init();

  // Reset Any Related Variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		                <li><i class="fa fa-star"></i></li>`;

});


/////////Start the game for the first time
init();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
