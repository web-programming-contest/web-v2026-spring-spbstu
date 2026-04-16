import Piece from "./Piece.jsx"
import findIsInAvailableMovesValue from "./utils/findIsInAvailableMovesValue.js";

function Square({ row, col, pieceColour, pieceType, onSquareClick, availableMoves, selectedIndex}) {
    const colour = (row + col) % 2 === 0 ? 'white' : 'black';
    const isInAvailableMoves = findIsInAvailableMovesValue(row, col, availableMoves);
    const hasPiece = pieceColour !== "none" && pieceType !== "none";
    const hasCapturablePiece = hasPiece && isInAvailableMoves;
    const hasPieceButNotCapturable = hasPiece && !isInAvailableMoves;
    const doesNotHaveAPieceButAvailable = !hasPiece && isInAvailableMoves;
    const isSelected = row * 8 + col === selectedIndex;
    const hasPieceButNotCapturableAndNotSelected = hasPieceButNotCapturable && !isSelected;

    return (
        <div className={`square ${colour}`}  onClick = {() => onSquareClick(row, col)}>
            {hasCapturablePiece && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType} cover={"atacked"}/>}
            {isSelected && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType} cover={"selected"}/>}
            {hasPieceButNotCapturableAndNotSelected && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType} cover={"none"}/>}
            {doesNotHaveAPieceButAvailable && <Piece key={`${row}-${col}`} colour={"dot"} piece={"dot"} cover={"none"}/>}
        </div>
    );
}

export default Square;