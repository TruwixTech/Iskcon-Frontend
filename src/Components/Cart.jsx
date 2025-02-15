import  { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "./Navbar";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <div className="bg-[#fde3b6] w-full h-full">
        <div className="px-20 pt-10">
            <Navbar />
        </div>
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${getCartTotal()}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
