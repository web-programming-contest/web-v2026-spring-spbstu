import Square from './Square.jsx'

function Board({board, onSquareClick, availableMoves}) {
    const rows = Array(8).fill(null)
    const cols = Array(8).fill(null)

    return (
        <div className = "board">
          {rows.map((_, row) =>
            cols.map((_, col) => (
              <Square key={`${row}-${col + 1}`} row={row} 
              col={col} pieceColour={board[row * 8 + col].pieceColour} 
              pieceType={board[row * 8 + col].pieceType} onSquareClick={onSquareClick}  availableMoves={availableMoves}/>
            ))
          )}
        </div>
    )
}

export default Board