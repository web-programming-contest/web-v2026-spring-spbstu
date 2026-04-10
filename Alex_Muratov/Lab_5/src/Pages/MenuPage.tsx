import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuPage() {
    const navigate = useNavigate();
    const [opponent, setOpponent] = useState<'player' | 'cpu'>('player');
    const [size, setSize] = useState<number>(3);
    const handleStartGame = () => {
        navigate('/game', { state: { gridSize: size, mode: opponent } });
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center font-sans text-neutral-800">
            <div className="w-full max-w-sm p-8 bg-white shadow-sm border border-neutral-200 rounded-2xl">
                <h1 className="text-3xl font-light text-center mb-10 tracking-tight">
                    Tic Tac Toe
                </h1>
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                        Режим игры
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpponent('player')}
                            className={`flex-1 py-2 text-sm rounded-md transition-all ${
                                opponent === 'player'
                                    ? 'bg-neutral-800 text-white shadow-md'
                                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                            }`}
                        >
                            Против игрока
                        </button>
                        <button
                            onClick={() => setOpponent('cpu')}
                            className={`flex-1 py-2 text-sm rounded-md transition-all ${
                                opponent === 'cpu'
                                    ? 'bg-neutral-800 text-white shadow-md'
                                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                            }`}
                        >
                            Против компьютера
                        </button>
                    </div>
                </div>


                <div className="mb-10">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                        Размер поля
                    </p>
                    <div className="flex gap-2">
                        {[3, 4, 5].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`flex-1 py-2 text-sm rounded-md transition-all ${
                                    size === s
                                        ? 'bg-neutral-800 text-white shadow-md'
                                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                                }`}
                            >
                                {s} × {s}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleStartGame}
                    className="w-full py-4 bg-neutral-900 text-white rounded-xl font-medium tracking-wide hover:bg-neutral-700 active:scale-[0.98] transition-all shadow-lg shadow-neutral-200"
                >
                    Начать игру
                </button>

            </div>
        </div>
    );
}