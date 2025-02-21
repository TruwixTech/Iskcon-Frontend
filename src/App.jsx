import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { CartProvider } from "./Context/CartContext";
import { DonationCartProvider } from "./Context/DonationCartContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
      <DonationCartProvider>
      <CartProvider>
        <Outlet />
        {/* <Footer /> */}
      </CartProvider>
      </DonationCartProvider>
    </>
  );
}

export default App;
