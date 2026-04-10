import { useNavigate } from 'react-router-dom';
import {GameStatus} from "../Hooks/useGameResult";

interface WinPageProps {
    winner: GameStatus
    onRestart: () => void;
}

export default function WinPage({ winner, onRestart }: WinPageProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-neutral-100 text-center max-w-xs w-full mx-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-2">
                    Раунд окончен
                </h2>
                <div className="text-5xl font-light text-neutral-900 mb-8">
                    {winner==="Draw" ? "Ничья" : `${winner} Победил!`}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-all active:scale-95"
                    >
                        Играть снова
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-neutral-100 text-neutral-600 rounded-xl font-medium hover:bg-neutral-200 transition-all active:scale-95"
                    >
                        В меню
                    </button>
                </div>
            </div>
        </div>
    );
}