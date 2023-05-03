import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./components/Modal";
import "./index.css";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
  </BrowserRouter>
);
