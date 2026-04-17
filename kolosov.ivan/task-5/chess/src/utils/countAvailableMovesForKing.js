import isSquareUnderAtack from "./isSquareUnderAtack";

function countAvailableMovesForKing(row, col, board) {
    let theoreticallyPossibleMoves = [
        {row: row + 1, col: col + 1}, {row: row - 1, col: col - 1},
        {row: row + 1, col: col - 1}, {row: row - 1, col: col + 1}, 
        {row: row, col: col + 1}, {row: row, col: col - 1},
        {row: row + 1, col: col}, {row: row - 1, col: col}
    ];
    
    const kingIndex = row * 8 + col;

    const kingColour = board[kingIndex].pieceColour;
    let availableMoves = [];
    for (let move of theoreticallyPossibleMoves) {
        if (move.row < 0 || move.row > 7 || move.col < 0 || move.col > 7){
            continue;
        }
        if (board[move.row * 8 + move.col].pieceColour === kingColour) {
            continue;
        }
        availableMoves.push(move);
    }

    if (board[kingIndex].moveNumber === 0 && board[row * 8 + 7].moveNumber === 0 && board[row * 8 + 6].pieceType === "none" && board[row * 8 + 5].pieceType === "none" && !isSquareUnderAtack(row, 5, kingColour === "white" ? "black" : "white", board) && !isSquareUnderAtack(row, col, kingColour === "white" ? "black" : "white", board)) {
        availableMoves.push({row: row, col: 6});
    }
    if (board[kingIndex].moveNumber === 0 && board[row * 8 + 0].moveNumber === 0 && board[row * 8 + 1].pieceType === "none" && board[row * 8 + 2].pieceType === "none" && board[row * 8 + 3].pieceType === "none" && !isSquareUnderAtack(row, 3, kingColour === "white" ? "black" : "white", board) && !isSquareUnderAtack(row, col, kingColour === "white" ? "black" : "white", board)) {
        availableMoves.push({row: row, col: 2});
    }

    board[row * 8 + col].possibleMoves = availableMoves;
    return board;
}

export default countAvailableMovesForKing;