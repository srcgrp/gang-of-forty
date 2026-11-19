import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";
import App from "./App.tsx";
import CartProvider from "./hooks/CartProvider.tsx";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>,
  );
}
