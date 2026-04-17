
//---------------------------------------------------------------------------------------------------------------
//---------------------------BISHOP------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

function countAvailableMovesForBishop(row, col, board) {
    const steps = [
        {row: -1, col: -1}, {row: -1, col: 1}, {row: 1, col: -1}, {row: 1, col: 1}
    ]

    const bishopIndex = row * 8 + col;
    const bishopColour = board[bishopIndex].pieceColour;
    let availableMoves = [];

    let rowStep;
    let colStep;
    let stepIndex;

    for (let step of steps) {
        rowStep = row;
        colStep = col;
        while (true) {
            rowStep += step.row;
            colStep += step.col;
            stepIndex = rowStep * 8 + colStep;
            if (rowStep > 7 || rowStep < 0 || colStep > 7 || colStep < 0) {
                break;
            }
            if (board[stepIndex].pieceColour === bishopColour) {
                break;
            }
            if (board[stepIndex].pieceColour !== bishopColour && board[stepIndex].pieceColour !== "none") {
                availableMoves.push( {row: rowStep, col: colStep});
                break;
            }
            availableMoves.push( {row: rowStep, col: colStep});
        }
    }

    board[bishopIndex].possibleMoves = availableMoves;
    return board;
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------ROOK--------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

function countAvailableMovesForRook(row, col, board) {
    const steps = [
        {row: 0, col: -1}, {row: 0, col: 1}, {row: 1, col: 0}, {row: -1, col: 0}
    ]

    const rookIndex = row * 8 + col;
    const rookColour = board[rookIndex].pieceColour;
    let availableMoves = [];

    let rowStep;
    let colStep;
    let stepIndex;

    for (let step of steps) {
        rowStep = row;
        colStep = col;
        while (true) {
            rowStep += step.row;
            colStep += step.col;
            stepIndex = rowStep * 8 + colStep;
            if (rowStep > 7 || rowStep < 0 || colStep > 7 || colStep < 0) {
                break;
            }
            if (board[stepIndex].pieceColour === rookColour) {
                break;
            }
            if (board[stepIndex].pieceColour !== rookColour && board[stepIndex].pieceColour !== "none") {
                availableMoves.push( {row: rowStep, col: colStep});
                break;
            }
            availableMoves.push( {row: rowStep, col: colStep});
        }
    }

    board[rookIndex].possibleMoves = availableMoves;
    return board;
}

export { countAvailableMovesForBishop,  countAvailableMovesForRook};