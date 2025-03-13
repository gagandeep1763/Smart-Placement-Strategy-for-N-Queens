function solveNQueens() {
    let n = parseInt(document.getElementById("nInput").value);

    // Allow only values between 5 and 8
    if (n < 4 || n > 8) {
        alert("Please enter a number between 4 and 8.");
        return;
    }

    let board = Array.from({ length: n }, () => Array(n).fill('.')); // Create an empty board
    let solutionFound = false; // Flag to check if we find a solution

    function isSafe(row, col) {
        // Check for another queen in the same column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // Check for another queen in the top-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check for another queen in the top-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true; // Safe to place the queen
    }

    function placeQueens(row) {
        if (row === n) {
            displayBoard(board); // Show the solution when all queens are placed
            solutionFound = true;
            return true;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q'; // Place queen
                if (placeQueens(row + 1)) return true; // Move to next row
                board[row][col] = '.'; // Backtrack (remove queen)
            }
        }
        return false;
    }

    if (!placeQueens(0)) {
        alert("No solution found.");
    }
}

// Function to display the chessboard in the UI
function displayBoard(solution) {
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    let n = solution.length;
    boardDiv.style.gridTemplateColumns = `repeat(${n}, 60px)`;
    boardDiv.style.gridTemplateRows = `repeat(${n}, 60px)`;

    solution.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
            let cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            // Set alternating black & white squares
            if ((rIndex + cIndex) % 2 === 0) {
                cellDiv.classList.add("white-square");
            } else {
                cellDiv.classList.add("black-square");
            }

            if (cell === 'Q') {
                cellDiv.classList.add("queen");
                cellDiv.innerText = "♛";
            }
            boardDiv.appendChild(cellDiv);
        });
    });
}
