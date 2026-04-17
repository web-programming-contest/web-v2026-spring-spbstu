function countAvailableMovesForKnight(row, col, board) {
    const theoreticallyPossibleMoves = [
        {row: row + 2, col: col + 1}, {row: row + 1, col: col + 2},
        {row: row + 2, col: col - 1}, {row: row + 1, col: col - 2}, 
        {row: row - 2, col: col + 1}, {row: row - 1, col: col + 2},
        {row: row - 2, col: col - 1}, {row: row - 1, col: col - 2} 
        ];
    const knightColour = board[row * 8 + col].pieceColour;
    let availableMoves = [];
    for (let move of theoreticallyPossibleMoves) {
        if (move.row < 0 || move.row > 7 || move.col < 0 || move.col > 7){
            continue;
        }
        if (board[move.row * 8 + move.col].pieceColour === knightColour) {
            continue;
        }
        availableMoves.push(move);
    }
    board[row * 8 + col].possibleMoves = availableMoves;
    return board;
}

export default countAvailableMovesForKnight;