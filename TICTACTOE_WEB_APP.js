// Select all cells and elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-btn');

// Initialize game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Update status message
const updateStatusMessage = () => {
    statusMessage.textContent = isGameActive ? `Player ${currentPlayer}'s Turn` : `Player ${currentPlayer} Wins!`;
};

// Check if a player has won
const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCombo = winningCombinations[i];
        const a = board[winCombo[0]];
        const b = board[winCombo[1]];
        const c = board[winCombo[2]];

        if (a === '' || b === '' || c === '') continue;

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        updateStatusMessage();
        return;
    }

    // Check for a tie
    if (!board.includes('')) {
        isGameActive = false;
        statusMessage.textContent = `It's a Tie!`;
    }
};

// Handle cell clicks
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    // If cell is already filled or game is over, do nothing
    if (board[cellIndex] !== '' || !isGameActive) return;

    // Update the board and the UI
    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win or tie
    checkWin();

    // Switch player if game is still active
    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatusMessage();
    }
};

// Restart game
const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusMessage.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = '');
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', restartGame);
