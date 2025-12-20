import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LenisProvider } from "./Lenis";
import "lenis/dist/lenis.css";  
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <LenisProvider>
      <App />
    </LenisProvider>
  </BrowserRouter>
  </StrictMode>
);
