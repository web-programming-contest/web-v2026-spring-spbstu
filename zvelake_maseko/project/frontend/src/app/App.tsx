import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "./context/SessionContext";
import { useState } from "react";
import { sessionInterface } from "./data/session";

export default function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SessionProvider>
  );
}