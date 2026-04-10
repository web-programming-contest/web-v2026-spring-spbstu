import { BrowserRouter, Routes, Route} from 'react-router-dom';
import GamePage from "./Pages/GamePage";
import MenuPage from "./Pages/MenuPage";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPage/>} />
                <Route path="/menu" element={<MenuPage/>}/>
                <Route path="/game" element={<GamePage/>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;