import isSquareUnderAtack from './isSquareUnderAtack.js';

function filterMovesLeavingKingInCheck(row, col, board, turnColour) {
    const attackerColour = turnColour === "white" ? "black" : "white";
    const selectedIndex = row * 8 + col;
    const moves = board[selectedIndex].possibleMoves;
    let destinationIndex;
    let newBoard;
    let kingIndex;
    let kingCol;
    let kingRow;
    let newMoves = []
    for (let move of moves) {
        destinationIndex = move.row * 8 + move.col;
        newBoard = copyOfBoardWithMove(board, selectedIndex, destinationIndex);
        kingIndex = newBoard.findIndex(
            position => position.pieceType === "king" && position.pieceColour === turnColour
        );
        kingRow = Math.floor(kingIndex / 8);
        kingCol = kingIndex % 8;
        if (!isSquareUnderAtack(kingRow, kingCol, attackerColour, newBoard)) newMoves.push(move);
    }

    return newMoves;
}

function copyOfBoardWithMove(board, selectedIndex, destinationIndex) {
    let newBoard = [...board];
    newBoard[destinationIndex] = board[selectedIndex];
    newBoard[selectedIndex] = { pieceColour: "none", pieceType: "none" };
    return newBoard;
}

export default filterMovesLeavingKingInCheck