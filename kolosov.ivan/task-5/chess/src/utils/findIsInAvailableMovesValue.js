function findIsInAvailableMovesValue(row, col, availableMoves) {
    console.log(availableMoves);
    if (availableMoves === undefined) {
        return false;
    }
    for (let position of availableMoves) {
        if (isPostionEqual(row, col, position)) {
            console.log('GAY!!!!!!!!!!!!!!!!!!!!!!!!!!');
            return true;
        }
    }
    return false;
}

function isPostionEqual(row, col, position) {
    return position.row === row && position.col === col
}

export default findIsInAvailableMovesValue;