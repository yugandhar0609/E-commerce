// src/Context/ShopContext.jsx
import React, { createContext, useState, useEffect } from "react";
import all_products from "../assets/all_products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(all_products);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : getDefaultCart();
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemsInfo = all_products.find((product) => product.id === Number(item));
        totalAmount += itemsInfo.new_price * cartItems[item];
      }
    }

    return totalAmount.toFixed(2);
  };
  const getTotalAmountCart =()=>{
    let totalItems = 0;
    for( const items in cartItems){
      if (cartItems[items]>0) {
        totalItems += cartItems[items]
      }
    }
    return totalItems;
  }

  const contextValue = {
    products,
    setProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalAmountCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
