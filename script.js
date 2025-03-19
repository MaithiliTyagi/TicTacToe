const board = document.getElementById("board");
let cells = [];
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    document.getElementById("status").innerText = "";
    
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells[i] = cell;
    }
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameState[index] !== "" || checkWinner()) return;
    
    gameState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    
    if (checkWinner()) {
        document.getElementById("status").innerText = `${currentPlayer} Wins!`;
        disableBoard();
        return;
    }
    
    if (!gameState.includes("")) {
        document.getElementById("status").innerText = "It's a Draw!";
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index => gameState[index] === currentPlayer);
    });
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener("click", handleMove));
}

function resetGame() {
    createBoard();
}

createBoard();
