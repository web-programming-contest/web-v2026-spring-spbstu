import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center font-sans text-neutral-800 p-4">
            <h1 className="text-9xl font-thin text-neutral-200 mb-4">404</h1>
            <h2 className="text-2xl font-light mb-8">Страница не найдена</h2>
            <p className="text-neutral-400 mb-10 text-center max-w-xs">
                Похоже, вы зашли на несуществующую клетку. Давайте вернемся в меню.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all active:scale-95"
            >
                В главное меню
            </button>
        </div>
    );
}