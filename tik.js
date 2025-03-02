

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1Name = "Player 1";
let player2Name = "Player 2";
let gameActive = false;

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🔦";
});

// Start Game
function startGame() {
    player1Name = document.getElementById("player1").value || "Player 1";
    player2Name = document.getElementById("player2").value || "Player 2";

    document.getElementById("playerInput").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");

    document.getElementById("playersTurn").textContent = `${player1Name}'s Turn (X)`;
    gameActive = true;
}

// Handle Move
function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById("result").textContent = `${currentPlayer === "X" ? player1Name : player2Name} is the WINNER! 🎉`;
        document.getElementById("confetti").classList.remove("hidden");
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("result").textContent = "It's a TIE! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("playersTurn").textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s Turn (${currentPlayer})`;
}

// Check Winner
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
    document.getElementById("result").textContent = "";
    document.getElementById("confetti").classList.add("hidden");
    document.getElementById("playersTurn").textContent = `${player1Name}'s Turn (X)`;
}
