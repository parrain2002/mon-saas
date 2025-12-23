// src/main.tsx (CORRECTION CHAKRA UI)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";

// ✅ Correction 1: Supprimer extendTheme de l'importation si vous ne l'utilisez pas

// ❌ Supprimer: const theme = extendTheme();

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);