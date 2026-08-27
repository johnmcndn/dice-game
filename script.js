'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelectorAll('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const overlay = document.querySelector('.overlay');
const playNowBtn = document.querySelector('.playNowBtn');
const guideOverlay = document.getElementById('guide-overlay');
const mainElem = document.querySelector('main');
const playAgainBtn = document.querySelector('.playAgainBtn');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const handleSwitchPlayer = () => {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const updateHoldButton = () => {
  if (currentScore === 0) {
    btnhold.style.opacity = 0.6;
    btnhold.style.cursor = 'not-allowed';
    btnhold.style.pointerEvents = 'none';
    btnhold.disabled = true;
  } else {
    btnhold.style.opacity = 1;
    btnhold.style.cursor = 'pointer';
    btnhold.disabled = false;
    btnhold.style.pointerEvents = 'auto';
  }
};

const winnerModal = winner => {
  const winnerTitle = document.querySelector('.winnerTitle');
  winnerTitle.textContent = ` Plaer ${!winner ? 'One' : 'Two'} Won!`;
  overlay.classList.toggle('hidden');
  console.log(`Player ${!winner ? 'One' : 'Two'} Won!`);
};

// 1. CALL ON INITIAL LOAD (so button starts disabled at 0 score)
updateHoldButton();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll (Note: fixed to * 6 for a standard 6-sided dice)
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    handleSwitchPlayer();
  }

  // 2. CALL WHENEVER DICE IS ROLLED (enables on > 0, disables on 1)
  updateHoldButton();
});

btnhold.addEventListener('click', function () {
  const index = scores.findIndex(num => num >= 100);
  if (currentScore === 0) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0; // Fixed: update active player on hold
  handleSwitchPlayer();

  // 3. CALL AFTER HOLDING (disables button for new player's turn)
  updateHoldButton();

  scores.forEach((score, index) => {
    if (score >= 100) {
      if (!index) {
        mainElem.classList.toggle('opacity');
        winnerModal(index);
      } else {
        mainElem.classList.toggle('opacity');
        winnerModal(index);
      }
    }
  });
});

btnNew.forEach(button => {
  button.addEventListener('click', () => location.reload());
});

playAgainBtn.addEventListener('click', () => location.reload());

playNowBtn.addEventListener('click', () => {
  // Hide the guide overlay completely
  guideOverlay.classList.add('hidden');

  // Show the main game board
  mainElem.classList.remove('hidden');
});
