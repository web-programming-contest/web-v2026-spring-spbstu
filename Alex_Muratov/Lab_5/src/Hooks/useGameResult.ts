import { useEffect, useState } from "react";

export type CellValue = 'X' | 'O' | null;
export type GameStatus = CellValue | 'Draw';

interface GameResultReturn {
    boardState: CellValue[];
    updateBoard: (index: number) => void;
    resetBoard: () => void;
    winner: GameStatus;
    isCross: boolean;
}

export const useGameResult = (gridSize: number): GameResultReturn => {
    const [isCross, setIsCross] = useState(true);
    const [boardState, setBoardState] = useState<CellValue[]>(new Array(gridSize * gridSize).fill(null));
    const [curIndex, setCurIndex] = useState<number | null>(null);
    const [winner, setWinner] = useState<GameStatus>(null);

    useEffect(() => {
        if (curIndex === null) return;

        if (checkWinner(boardState, curIndex, gridSize)) {
            setWinner(boardState[curIndex] as CellValue);
            return;
        }

        if (!boardState.includes(null)) {
            setWinner('Draw');
        }
    }, [boardState, curIndex, gridSize]);

    function updateBoard(index: number) {
        if (boardState[index] || winner) return;

        const newBoardState = [...boardState];
        newBoardState[index] = isCross ? "X" : "O";

        setBoardState(newBoardState);
        setCurIndex(index);
        setIsCross(!isCross);

    }

    function resetBoard() {
        setBoardState(new Array(gridSize * gridSize).fill(null));
        setCurIndex(null);
        setWinner(null);
        setIsCross(true);
    }

    return {
        boardState,
        updateBoard,
        resetBoard,
        winner,
        isCross,
    };
};

function checkWinner(gameField: CellValue[], curIndex: number | null, gridSize: number) {
    if (curIndex === null) return false;

    const player = gameField[curIndex];
    if (!player) return false;

    const curRow = Math.floor(curIndex / gridSize);
    const curColumn = curIndex % gridSize;

    const directions = [
        [0, 1],  // горизонталь
        [1, 0],  // вертикаль
        [1, -1], // побочная диагональ
        [1, 1]   // главная диагональ
    ];

    for (const [dRow, dColumn] of directions) {
        let count = 1;
        count += checkDirection(gameField, gridSize, curRow, curColumn, dRow, dColumn, player);
        count += checkDirection(gameField, gridSize, curRow, curColumn, -dRow, -dColumn, player);

        if (count >= gridSize) return true;
    }
    return false;
}

function checkDirection(gameField: CellValue[], gridSize: number, row: number, column: number, dRow: number, dColumn: number, player: string) {
    let found = 0;
    let curR = row + dRow;
    let curC = column + dColumn;

    while (curR >= 0 && curR < gridSize && curC >= 0 && curC < gridSize &&
    gameField[curR * gridSize + curC] === player) {
        found++;
        curR += dRow;
        curC += dColumn;
    }
    return found;
}