import {useEffect, useRef, useState} from "react";
import { drawCircle, drawCross, gridStroke } from "./canvasFunctions";
import {CellValue, GameStatus} from "../Hooks/useGameResult";

interface BoardProps {
    gridSize: number;
    width: number;
    boardState: CellValue[];
    updateBoard: (index: number) => void;
    mode: string;
    winner: GameStatus;
}

export default function Board({gridSize, width, boardState, updateBoard, mode ,winner}: BoardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCpuNext,setIsCpuNext] = useState<boolean>(false);
    const cellSize = width / gridSize;
    const padding = cellSize * 0.25;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        gridStroke(ctx, gridSize, cellSize);

        boardState.forEach((cell, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;

            if (cell === "X") {
                drawCross(ctx, col, row, cellSize, padding);
            } else if (cell === "O") {
                drawCircle(ctx, col, row, cellSize, padding);
            }
        });

        if (isCpuNext && !winner) {
            const arr = [...boardState]
            const index = arr.indexOf(null);
            updateBoard(index);
            setIsCpuNext(false);
        }

        const handleClick = (e: MouseEvent) => {
            if (mode === "cpu" && isCpuNext) {
                return;
            }
            if (mode === "cpu" && !isCpuNext) {
                setIsCpuNext(!isCpuNext);
            }
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const cellX = Math.floor(x / cellSize);
            const cellY = Math.floor(y / cellSize);
            const curIndex = cellY * gridSize + cellX;

            updateBoard(curIndex);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener('click', handleClick);
    }, [boardState, gridSize, cellSize]);

    return (
        <canvas
            className="rounded-lg cursor-pointer"
            ref={canvasRef}
            width={width}
            height={width}
        />
    );
}