import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/form.css';
import './css/functions.css';
import './css/sections.css';
import './css/alerts.css';
import './css/transactions-preview.css';

const rootId = "root";
ReactDOM.createRoot(document.getElementById(rootId)).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)