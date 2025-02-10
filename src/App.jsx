import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { CartProvider } from "./Context/CartContext";
import { DonationCartProvider } from "./Context/DonationCartContext";
import React from "react";

function App() {
  return (
    <>
      <DonationCartProvider>
      <CartProvider>
        <Outlet />
        <Footer />
      </CartProvider>
      </DonationCartProvider>
    </>
  );
}

export default App;
