import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/auth/AuthProvider.jsx";
import "./App.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
