function isSquareUnderAtack(row, col, attackerColour, board) {
    const chekingForKnight = [
        {row: row + 2, col: col + 1}, {row: row + 1, col: col + 2},
        {row: row + 2, col: col - 1}, {row: row + 1, col: col - 2}, 
        {row: row - 2, col: col + 1}, {row: row - 1, col: col + 2},
        {row: row - 2, col: col - 1}, {row: row - 1, col: col - 2} 
        ];
    const stepsForBishop = [ {row: -1, col: -1}, {row: -1, col: 1}, {row: 1, col: -1}, {row: 1, col: 1} ];
    const stepsForRook = [ {row: 0, col: -1}, {row: 0, col: 1}, {row: 1, col: 0}, {row: -1, col: 0} ];
    const chekingForPawn = attackerColour === "white" ? [ {row: 1, col: 1}, {row: 1, col: -1}] : [ {row: -1, col: 1}, {row: -1, col: -1}];
    const chekingForKing = [
        {row: row + 1, col: col + 1}, {row: row - 1, col: col - 1},
        {row: row + 1, col: col - 1}, {row: row - 1, col: col + 1}, 
        {row: row, col: col + 1}, {row: row, col: col - 1},
        {row: row + 1, col: col}, {row: row - 1, col: col}
        ];

    let destinationIndex;

    for (let position of chekingForKnight) {
        destinationIndex = position.row * 8 + position.col;
        if (position.row < 0 || position.row > 7 || position.col < 0 || position.col > 7){
            continue;
        }
        if (board[destinationIndex].pieceType === "knight" && board[destinationIndex].pieceColour === attackerColour) {
            return true;
        }
    }

    for (let position of chekingForKing) {
        destinationIndex = position.row * 8 + position.col;
        if (position.row < 0 || position.row > 7 || position.col < 0 || position.col > 7){
            continue;
        }
        if (board[destinationIndex].pieceType === "king" && board[destinationIndex].pieceColour === attackerColour) {
            return true;
        }
    }

    for(let position of chekingForPawn) {
        destinationIndex = position.row * 8 + position.col;
        if (position.row < 0 || position.row > 7 || position.col < 0 || position.col > 7){
            continue;
        }
        if (board[destinationIndex].pieceType === "pawn" && board[destinationIndex].pieceColour === attackerColour) {
            return true;
        }
    }

    let rowStep;
    let colStep;

    for (let step of stepsForBishop) {
        rowStep = row;
        colStep = col;
        while (true) {
            rowStep += step.row;
            colStep += step.col;
            destinationIndex = rowStep * 8 + colStep;
            if (rowStep > 7 || rowStep < 0 || colStep > 7 || colStep < 0) break;
            if (board[destinationIndex].pieceType === "none") continue;
            if (board[destinationIndex].pieceColour === attackerColour && 
                (board[destinationIndex].pieceType === "bishop" || board[destinationIndex].pieceType === "queen")) return true;
            break;
        }
    }

    for (let step of stepsForRook) {
        rowStep = row;
        colStep = col;
        while (true) {
            rowStep += step.row;
            colStep += step.col;
            destinationIndex = rowStep * 8 + colStep;
            if (rowStep > 7 || rowStep < 0 || colStep > 7 || colStep < 0) break;
            if (board[destinationIndex].pieceType === "none") continue;
            if (board[destinationIndex].pieceColour === attackerColour && 
                (board[destinationIndex].pieceType === "rook" || board[destinationIndex].pieceType === "queen")) return true;
            break;
        }
    }

    return false;
}

export default isSquareUnderAtack