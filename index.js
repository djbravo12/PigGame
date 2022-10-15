"use strict";

// Selecting Elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

// player 1
const Score0El = document.querySelector("#score--0");
const currentScore0 = document.querySelector("#current--0");
const player0El = document.querySelector(".player--0");

// player 2
const currentScore1 = document.querySelector("#current--1");
const Score1El = document.querySelector("#score--1");
const player1El = document.querySelector(".player--1");

//starting condition
Score0El.textContent = 0;
Score1El.textContent = 0;
diceEl.classList.add("hidden");

let scoreOfBoth, activePlayer, score, playingGame;

const init = function () {
  playingGame = true;
  score = 0;
  activePlayer = 0;
  scoreOfBoth = [0, 0];

  Score0El.textContent = 0;
  Score1El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore0.textContent = 0;

  diceEl.classList.remove("hidden");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  //removing acitve class from player 2
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// calling the game for first time

init();

const switchPlayer = function () {
  //toggling active player
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  //resetting the value of current player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  //switiching the player
  activePlayer = activePlayer === 0 ? 1 : 0;
  score = 0;
};

const randomNumber = function () {
  if (playingGame) {
    //generating random dice
    let randomN = Math.trunc(Math.random() * 6) + 1;

    //Display Dice number
    diceEl.setAttribute("src", `dice-${randomN}.png`);
    diceEl.classList.remove("hidden");

    if (randomN === 1) {
      console.log("1");
      diceEl.setAttribute("src", `dice-1.png`);
      switchPlayer();
    } else {
      score += randomN;
      document.querySelector(`#current--${activePlayer}`).textContent = score;
    }
  }
};

//Rolling Dice Function
btnRoll.addEventListener("click", randomNumber);

//Hold function 

btnHold.addEventListener("click", function () {
  if (playingGame) {
    scoreOfBoth[activePlayer] += score;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoreOfBoth[activePlayer];
    //checking winning score
    if (scoreOfBoth[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playingGame = false;
    } else {
      switchPlayer();
    }
  }
});

// Restart new game

btnNew.addEventListener("click", init);
