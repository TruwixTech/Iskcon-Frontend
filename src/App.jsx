import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
