import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
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
  const [cartItems, setCartItems] = useState(getDefaultCart);
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProductsAndUser = async () => {
      try {
        const productsResponse = await axios.get(`${API_URL}/api/products`);
        setProducts(productsResponse.data);

        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axios.get(`${API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userResponse.data);
          const cartResponse = await axios.get(`${API_URL}/api/cart/${userResponse.data.id}`);
          const cartData = {};
          cartResponse.data.forEach(item => {
            cartData[item.productId._id] = item.quantity;
          });
          setCartItems(cartData);
        }
      } catch (error) {
        console.error('Error fetching products or user data:', error);
      }
    };

    fetchProductsAndUser();
  }, [API_URL]);

  const addToCart = async (productId) => {
    if (user) {
      try {
        const response = await axios.post(`${API_URL}/api/cart/${user.id}/add`, { productId });
        const updatedCartItems = {};
        response.data.forEach(item => {
          updatedCartItems[item.productId._id] = item.quantity;
        });
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    } else {
      setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const response = await axios.post(`${API_URL}/api/cart/${user.id}/remove`, { productId });
        const updatedCartItems = {};
        response.data.forEach(item => {
          updatedCartItems[item.productId._id] = item.quantity;
        });
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    } else {
      setCartItems((prev) => ({ ...prev, [productId]: Math.max(prev[productId] - 1, 0) }));
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount.toFixed(2);
  };

  const getTotalAmountCart = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalAmountCart,
    user,
    setUser,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
