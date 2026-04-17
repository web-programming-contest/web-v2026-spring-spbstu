import Square from './Square.jsx'

function Board({board, onSquareClick, availableMoves, selectedIndex}) {
    const rows = Array(8).fill(null)
    const cols = Array(8).fill(null)

    return (
        <div className = "board">
          {rows.map((_, row) =>
            cols.map((_, col) => (
              <Square key={`${row}-${col}`} row={row} 
              col={col} pieceColour={board[row * 8 + col].pieceColour} 
              pieceType={board[row * 8 + col].pieceType} onSquareClick={onSquareClick}  availableMoves={availableMoves} selectedIndex={selectedIndex}/>
            ))
          )}
        </div>
    )
}

export default Board