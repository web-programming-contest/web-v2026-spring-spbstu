import Board from "../Canvas/Board";
import { useGameResult } from "../Hooks/useGameResult";
import { useLocation, useNavigate } from "react-router-dom";
import WinPage from "./WinPage";

export default function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { gridSize, mode } = location.state || { gridSize: 3, mode: 'player' };
    const width = 600;
    const { boardState, updateBoard,resetBoard, winner, isCross } = useGameResult(gridSize);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 font-sans text-neutral-800">
            <div className="w-full max-w-[600px] flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-sm uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                        {mode === 'cpu' ? 'Против компьютера' : 'Режим: 2 игрока'}
                    </h2>
                    <div className="text-2xl font-light">
                        {winner ? (
                            <div>
                                <span className="text-neutral-900">Игра окончена</span>
                                <WinPage winner={winner} onRestart={resetBoard}/>
                            </div>
                        ) : (
                            <span>Ход: <span className="font-medium">{isCross ? 'Крестик (X)' : 'Нолик (O)'}</span></span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm text-neutral-400 hover:text-neutral-800 transition-colors border-b border-transparent hover:border-neutral-800"
                >
                    В меню
                </button>
            </div>
            <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-neutral-200">
                <Board
                    gridSize={gridSize}
                    width={width}
                    boardState={boardState}
                    updateBoard={updateBoard}
                    mode ={mode}
                    winner ={winner}
                />
            </div>
            <p className="mt-8 text-neutral-400 text-xs tracking-widest uppercase">
                Поле {gridSize} × {gridSize}
            </p>
        </div>
    );
}