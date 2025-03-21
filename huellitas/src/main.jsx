import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./Styles/index.css";
import { AuthProvider } from "./Context/Auth.Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </AuthProvider>
  </React.StrictMode>
);
