import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css"; //Importa los estilos globales

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* El Router está aquí y ya no dentro de App.tsx */}
    </BrowserRouter>
  </React.StrictMode>
);
