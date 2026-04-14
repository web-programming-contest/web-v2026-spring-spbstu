import Piece from "./Piece.jsx"
import findIsInAvailableMovesValue from "./utils/findIsInAvailableMovesValue.js";

function Square({ row, col, pieceColour, pieceType, onSquareClick, availableMoves}) {
    const colour = (row + col) % 2 === 0 ? 'white' : 'black';
    console.log(availableMoves);
    const isInAvailableMoves = findIsInAvailableMovesValue(row, col, availableMoves);
    console.log(isInAvailableMoves);
    const hasPiece = pieceColour !== "none" && pieceType !== "none";
    const hasCapturablePiece = hasPiece && isInAvailableMoves;
    const hasPieceButNotCapturable = hasPiece && !isInAvailableMoves;
    const doesNotHaveAPieceButCapturable = !hasPiece && isInAvailableMoves;
    if (doesNotHaveAPieceButCapturable) {
        console.log("GAY!!!!!!!!!!!!!!!");
    }

    return (
        <div className={`square ${colour}`}  onClick = {() => onSquareClick(row, col)}>
            {hasCapturablePiece && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType}/>}
            {hasPieceButNotCapturable && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType}/>}
            {doesNotHaveAPieceButCapturable && <Piece key={`${row}-${col}`} colour={"dot"} piece={"dot"}/>}
        </div>
    );
}

export default Square;