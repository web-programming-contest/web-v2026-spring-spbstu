function countAvailableMovesForPawn(row, col, board, moveNumber) {
    const pawnColour = board[row * 8 + col].pieceColour;
    let availableMoves = [];
    
    if (pawnColour === "white") {
        if (row - 1 >= 0 && board[(row - 1) * 8 + col].pieceType === "none") {
            availableMoves.push({row: row - 1, col: col});
        }
        if (row === 6 && board[(row - 2) * 8 + col].pieceType === "none" && board[(row - 1) * 8 + col].pieceType === "none") {
            availableMoves.push({row: row - 2, col: col});
        }
        if (row - 1 >= 0 && col + 1 <= 7 && board[(row - 1) * 8 + col + 1].pieceColour === "black") {
            availableMoves.push({row: row - 1, col: col + 1});
        }
        if (row - 1 >= 0 && col - 1 >= 0 && board[(row - 1) * 8 + col - 1].pieceColour === "black") {
            availableMoves.push({row: row - 1, col: col - 1});
        }
        if (row === 3) {
            if (
                board[row * 8 + col - 1].pieceColour === "black" && board[row * 8 + col - 1].pieceType === "pawn" &&
                board[row * 8 + col - 1].moveNumber === moveNumber && board[row * 8 + col - 1].moveNumber !== board[(row - 1) * 8 + col - 1].moveNumber
            ) {
                availableMoves.push({row: row - 1, col: col - 1});
            }
            if (
                board[row * 8 + col + 1].pieceColour === "black" && board[row * 8 + col + 1].pieceType === "pawn" &&
                board[row * 8 + col + 1].moveNumber === moveNumber && board[row * 8 + col + 1].moveNumber !== board[(row - 1) * 8 + col + 1].moveNumber
            ) {
                availableMoves.push({row: row - 1, col: col + 1});
            }
        }
    }
    else {
        if (row + 1 <= 7 && board[(row + 1) * 8 + col].pieceType === "none") {
            availableMoves.push({row: row + 1, col: col})
        }
        if (row === 1 && board[(row + 2) * 8 + col].pieceColour === "none" && board[(row + 1) * 8 + col].pieceType === "none") {
            availableMoves.push({row: row + 2, col: col})
        }
        if (row + 1 <= 7 && col + 1 <= 7 && board[(row + 1) * 8 + col + 1].pieceColour === "white") {
            availableMoves.push({row: row + 1, col: col + 1})
        }
        if (row + 1 <= 7 && col - 1 >= 0 && board[(row + 1) * 8 + col - 1].pieceColour === "white") {
            availableMoves.push({row: row + 1, col: col - 1})
        }
        if (row === 4) {
            if (
                board[row * 8 + col - 1].pieceColour === "white" && board[row * 8 + col - 1].pieceType === "pawn" &&
                board[row * 8 + col - 1].moveNumber === moveNumber && board[row * 8 + col - 1].moveNumber !== board[(row + 1) * 8 + col - 1].moveNumber
            ) {
                availableMoves.push({row: row + 1, col: col - 1});
            }
            if (
                board[row * 8 + col + 1].pieceColour === "white" && board[row * 8 + col + 1].pieceType === "pawn" &&
                board[row * 8 + col + 1].moveNumber === moveNumber && board[row * 8 + col + 1].moveNumber !== board[(row + 1) * 8 + col + 1].moveNumber
            ) {
                availableMoves.push({row: row + 1, col: col + 1});
            }
        }
    }

    board[row * 8 + col].possibleMoves = availableMoves;
    return board;
}

export default countAvailableMovesForPawn;