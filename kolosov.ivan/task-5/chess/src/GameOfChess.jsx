import Board from './Board.jsx'
import {useState} from 'react'
import startingBoard from './Board.json'
import findIsInAvailableMovesValue from './utils/findIsInAvailableMovesValue.js';
import countAvaiableMovesForKnight from './utils/countAvailableMovesForKnight.js';
import countAvaiableMovesForBishop from './utils/countAvailableMovesForBishop.js';
import countAvaiableMovesForRook from './utils/countAvailableMovesForRook.js';
import countAvaiableMovesForQueen from './utils/countAvailableMovesForQueen.js';
import countAvaiableMovesForPawn from './utils/countAvailableMovesForPawn.js';
import countAvaiableMovesForKing from './utils/countAvailableMovesForKing.js';

function GameOfChess() {
    const [board, setBoard] = useState(startingBoard);
    const [moveNumber, setMoveNumber] = useState(1); 
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [availableMoves, setAvailableMoves] = useState([]);

    const currentTurn = moveNumber % 2 === 1 ? "white" : "black";

    function handleSquareClick(row, col) {
        let destinationIndex = row * 8 + col;
        if (selectedPosition === null) {
            if (board[destinationIndex].pieceColour === currentTurn) {
                setSelectedPosition({row: row, col: col});
                setSelectedIndex(destinationIndex);
                setAvailableMoves(board[destinationIndex].possibleMoves);
            }
        } else {
            if (selectedIndex === destinationIndex) {
                setSelectedIndex(null);
                setSelectedPosition(null);
                setAvailableMoves([]);
            }
            else if (findIsInAvailableMovesValue(row, col, availableMoves)){
                let newBoard = [...board];

                if (board[selectedIndex].pieceType === "pawn" &&
                    selectedPosition.col !== col  && board[selectedPosition.row * 8 + col].pieceType === "pawn" &&
                    board[selectedPosition.row * 8 + col].pieceColour !== board[selectedIndex].pieceColour &&
                    board[destinationIndex].pieceType === "none") {
                    newBoard[selectedPosition.row * 8 + col].pieceColour = "none";
                    newBoard[selectedPosition.row * 8 + col].pieceType = "none";
                    newBoard[selectedPosition.row * 8 + col].availableMoves = [];
                    newBoard[selectedPosition.row * 8 + col].moveNumber = moveNumber;
                }

                newBoard[destinationIndex] = newBoard[selectedIndex];
                newBoard[selectedIndex] = { pieceColour: "none", pieceType: "none" };

                newBoard[destinationIndex].moveNumber = moveNumber;
                newBoard[selectedIndex].moveNumber = moveNumber;
                for (let row = 0; row < 8; ++row) {
                    for (let col = 0; col < 8; ++col) {
                        newBoard = countAvailableMoves(row, col, newBoard);
                    }
                }
                setBoard(newBoard);
                setMoveNumber(moveNumber + 1);
                setSelectedPosition(null);
                setSelectedIndex(null);
                setAvailableMoves([]);
            }
    }

    function countAvailableMoves(row, col, board) {
        const pieceType = board[row * 8 + col].pieceType;
        switch (pieceType) {
            case "knight":
                return countAvaiableMovesForKnight(row, col, board);
            case "bishop":
                return countAvaiableMovesForBishop(row, col, board);
            case "rook":
                return countAvaiableMovesForRook(row, col, board);
            case "queen":
                return countAvaiableMovesForQueen(row, col, board);
            case "pawn":
                return countAvaiableMovesForPawn(row, col, board, moveNumber);
            case "king":
                return countAvaiableMovesForKing(row, col, board);
            default:
                return board;
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
