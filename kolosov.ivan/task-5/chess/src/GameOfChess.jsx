import Board from './Board.jsx'
//import parseFen from './utils/parseFen.js'
import {useState} from 'react'
import startingBoard from './Board.json'
import findIsInAvailableMovesValue from './utils/findIsInAvailableMovesValue.js';

function GameOfChess() {
    //const fenStr = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const [board, setBoard] = useState(startingBoard);
    
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [availableMoves, setAvailableMoves] = useState([]);

    function handleSquareClick(row, col) {
    if (selectedIndex === null) {
        if (board[row * 8 + col].pieceType !== "none") {
            setSelectedIndex(row * 8 + col);
            setAvailableMoves(board[row * 8 + col].possibleMoves);
        }
    } else {
        if (selectedIndex === row * 8 + col) {
            setSelectedIndex(null);
            setAvailableMoves([]);
        }
        else if (findIsInAvailableMovesValue(row, col, availableMoves)){
            const newBoard = [...board];
            newBoard[row * 8 + col] = newBoard[selectedIndex];
            newBoard[selectedIndex] = { pieceColour: "none", pieceType: "none" };
            setBoard(newBoard);
            setSelectedIndex(null);
            setAvailableMoves([]);
        }
    }
}

    return (
      <div className="App">
       <Board board = {board} onSquareClick={handleSquareClick} availableMoves={availableMoves}/>
      </div>
    );
}

export default GameOfChess;
