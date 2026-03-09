import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
  setCartItems((prev) => {
    const updated = [...prev];
    updated.splice(index, 1);
    return updated;
  });
};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;