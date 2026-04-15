function countAvailableMovesForRook(row, col, board) {
    const steps = [
        {row: 0, col: -1}, {row: 0, col: 1}, {row: 1, col: 0}, {row: -1, col: 0}
    ]

    const rookColour = board[row * 8 + col].pieceColour;
    let availableMoves = [];

    let rowStep;
    let colStep;

    for (let step of steps) {
        rowStep = row;
        colStep = col;
        while (true) {
            rowStep += step.row;
            colStep += step.col;
            if (rowStep > 7 || rowStep < 0 || colStep > 7 || colStep < 0) {
                break;
            }
            if (board[rowStep * 8 + colStep].pieceColour === rookColour) {
                break;
            }
            if (board[rowStep * 8 + colStep].pieceColour !== rookColour && board[rowStep * 8 + colStep].pieceColour !== "none") {
                availableMoves.push( {row: rowStep, col: colStep});
                break;
            }
            availableMoves.push( {row: rowStep, col: colStep});
        }
    }

    board[row * 8 + col].possibleMoves = availableMoves;
    return board;
}

export default countAvailableMovesForRook;