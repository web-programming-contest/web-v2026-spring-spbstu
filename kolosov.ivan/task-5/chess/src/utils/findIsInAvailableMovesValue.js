function findIsInAvailableMovesValue(row, col, availableMoves) {
    if (availableMoves === undefined) {
        return false;
    }
    for (let position of availableMoves) {
        if (isPostionEqual(row, col, position)) {
            return true;
        }
    }
    return false;
}

function isPostionEqual(row, col, position) {
    return position.row === row && position.col === col
}

export default findIsInAvailableMovesValue;