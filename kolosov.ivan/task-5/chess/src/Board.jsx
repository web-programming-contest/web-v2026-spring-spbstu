import Square from './Square.jsx'

function Board() {
    const rows = Array(8).fill(null);
    const cols = Array(8).fill(null);

    return (
        <div className = "board">
          {rows.map((_, row) =>
            cols.map((_, col) => (
              <Square key={`${row}-${col}`} row={row} col={col} pieceColour={"white"} pieceType={"queen"}/>
            ))
          )}
        </div>
    );
}

export default Board;