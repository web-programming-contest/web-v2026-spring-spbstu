import Board from './Board.jsx'
import { useState } from 'react'
import startingBoard from './Board.json'
import findIsInAvailableMovesValue from './utils/findIsInAvailableMovesValue.js';
import countAvaiableMovesForKnight from './utils/countAvailableMovesForKnight.js';
import { countAvailableMovesForBishop, countAvailableMovesForRook } from './utils/countAvailableMoves.js';
import countAvaiableMovesForQueen from './utils/countAvailableMovesForQueen.js';
import countAvaiableMovesForPawn from './utils/countAvailableMovesForPawn.js';
import countAvaiableMovesForKing from './utils/countAvailableMovesForKing.js';
import filterMovesLeavingKingInCheck from './utils/filterMovesLeavingKingInCheck.js';
import isSquareUnderAtack from './utils/isSquareUnderAtack.js';

function GameOfChess() {
    const [board, setBoard] = useState(startingBoard);
    const [moveNumber, setMoveNumber] = useState(1); 
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [availableMoves, setAvailableMoves] = useState([]);
    const [winner, setWinner] = useState("none");

    const currentTurn = moveNumber % 2 === 1 ? "white" : "black";


    const isWinnerDecided = winner !== "none";

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

                if (board[selectedIndex].pieceType === "pawn") {
                    if (
                    selectedPosition.col !== col  && board[selectedPosition.row * 8 + col].pieceType === "pawn" &&
                    board[selectedPosition.row * 8 + col].pieceColour !== board[selectedIndex].pieceColour &&
                    board[destinationIndex].pieceType === "none") {
                        newBoard[selectedPosition.row * 8 + col].pieceColour = "none";
                        newBoard[selectedPosition.row * 8 + col].pieceType = "none";
                        newBoard[selectedPosition.row * 8 + col].possibleMoves = [];
                        newBoard[selectedPosition.row * 8 + col].moveNumber = moveNumber;
                    }
                    else if ((currentTurn === "white" && row === 0) || row === 7) {
                        newBoard[selectedIndex].pieceType = "queen";
                    }
                }
                
                if (board[selectedIndex].pieceType === "king" && board[selectedIndex].moveNumber === 0 && selectedPosition.row === row) {
                    if (col === 6) {    
                        newBoard[row * 8 + 7].pieceColour = "none";
                        newBoard[row * 8 + 7].pieceType = "none";
                        newBoard[row * 8 + 7].possibleMoves = [];
                        newBoard[row * 8 + 7].moveNumber = moveNumber;
                        newBoard[row * 8 + 5].pieceColour = currentTurn;
                        newBoard[row * 8 + 5].pieceType = "rook";
                        newBoard[row * 8 + 5].possibleMoves = [];
                        newBoard[row * 8 + 5].moveNumber = moveNumber;
                    }
                    if (col === 2) {    
                        newBoard[row * 8].pieceColour = "none";
                        newBoard[row * 8].pieceType = "none";
                        newBoard[row * 8].possibleMoves = [];
                        newBoard[row * 8].moveNumber = moveNumber;
                        newBoard[row * 8 + 3].pieceColour = currentTurn;
                        newBoard[row * 8 + 3].pieceType = "rook";
                        newBoard[row * 8 + 3].possibleMoves = [];
                        newBoard[row * 8 + 3].moveNumber = moveNumber;
                    }
                }

                newBoard[destinationIndex] = newBoard[selectedIndex];
                newBoard[selectedIndex] = { pieceColour: "none", pieceType: "none", possibleMoves: []};

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

                const nextTurn = currentTurn === "white" ? "black" : "white";
                
                if (newBoard.every(position => (position.pieceColour === nextTurn && position.possibleMoves.length === 0) || position.pieceColour !== nextTurn)) {
                    const kingIndex = newBoard.findIndex(
                        position => position.pieceType === "king" && position.pieceColour === nextTurn
                    );
                    const kingRow = Math.floor(kingIndex / 8);
                    const kingCol = kingIndex % 8;
                    console.log(kingIndex);
                    console.log(currentTurn);
                    console.log(newBoard);
                    console.log("GAME OVER");
                    if (isSquareUnderAtack(kingRow, kingCol, currentTurn, newBoard)) {
                        setWinner(currentTurn);
                    }
                    else {
                        setWinner("draw");
                    }
                }
                
                let flag = true;
                for (let position of newBoard) {
                    if (position.pieceType !== "none" && position.pieceType !== "king") flag = false;
                }

                if (flag) {
                    console.log("GAME OVER");
                    setWinner("draw");
                }
            }
    }

    function countAvailableMoves(row, col, board) {
        const selectedIndex = row * 8 + col;
        const pieceType = board[selectedIndex].pieceType;
        const pieceColour = board[selectedIndex].pieceColour;
        let newBoard;

        switch (pieceType) {
            case "knight": newBoard = countAvaiableMovesForKnight(row, col, board); break;
            case "bishop": newBoard = countAvailableMovesForBishop(row, col, board); break;
            case "rook": newBoard = countAvailableMovesForRook(row, col, board); break;
            case "queen": newBoard = countAvaiableMovesForQueen(row, col, board); break;
            case "pawn": newBoard = countAvaiableMovesForPawn(row, col, board, moveNumber); break;
            case "king": newBoard = countAvaiableMovesForKing(row, col, board); break;
            default: return board;
        }

        newBoard[selectedIndex].possibleMoves = filterMovesLeavingKingInCheck(row, col, newBoard, pieceColour);
        return newBoard;
    }
}

    return (
      <div className="App">
        <Board board = {board} onSquareClick={handleSquareClick} availableMoves={availableMoves} selectedIndex={selectedIndex}/>
        {isWinnerDecided && <p>{winner}</p>}
      </div>
    );
}

export default GameOfChess;
