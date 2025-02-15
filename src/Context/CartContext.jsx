
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.variations) === JSON.stringify(item.variations) // Ensure variations match
      );

      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity
        return prevCartItems.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add the new item with quantity 1
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


