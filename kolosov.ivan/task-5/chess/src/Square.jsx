import Piece from "./Piece.jsx"

function Square({ row, col, pieceColour, pieceType}) {
    const colour = (row + col) % 2 === 0 ? 'white' : 'black';
    const hasPiece = pieceColour !== "none" && pieceType !== "none";

    return (
        <div className={`square ${colour}`} >
            {hasPiece && <Piece key={`${row}-${col}`} colour={pieceColour} piece={pieceType}/>}
        </div>
    );
}

export default Square;