import React from "react";
import ReactDom from "react-dom/client";
import "@ghstyles/theme.css";
import "@ghstyles/global.css";
import "@ghstyles/nav-panel.css";
import "@ghstyles/cards-boxes.css";
import "@ghstyles/sections.css";
import "@ghstyles/top-bar.css";
import "@ghstyles/order-form.css";
import "@ghstyles/search-bar.css";
import "@ghstyles/cart-preview.css";

import App from "./App";

const rootId = "root";

ReactDom.createRoot(document.getElementById(rootId)).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)