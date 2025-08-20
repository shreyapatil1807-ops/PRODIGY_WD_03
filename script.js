const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('winner-message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartBtn.addEventListener('click', restartGame);

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  const winCombo = checkWin(currentPlayer);
  if (winCombo) {
    highlightWinner(winCombo);
    message.textContent = `${currentPlayer} Wins!`;
    board.classList.add('disabled');
  } else if (isDraw()) {
    message.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  for (let combo of winningCombos) {
    if (combo.every(index => cells[index].textContent === player)) {
      return combo; 
    }
  }
  return null;
}

function highlightWinner(combo) {
  combo.forEach(index => {
    cells[index].classList.add('win'); 
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'win'); 
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  currentPlayer = 'X';
  board.classList.remove('disabled');
}
