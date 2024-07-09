import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch products and user data on mount
    axios.get('https://e-commerce-mm9l.onrender.com/api/products').then(response => setProducts(response.data));
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://e-commerce-mm9l.onrender.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Fetch user-specific cart items
      axios.get(`https://e-commerce-mm9l.onrender.com/api/cart/${user.id}`)
        .then(response => setCartItems(response.data))
        .catch(error => console.error('Error fetching cart items:', error));
    }
  }, [user]);

  const addToCart = (productId) => {
    // Add item to cart for the specific user
    axios.post(`https://e-commerce-mm9l.onrender.com/api/cart/${user.id}/add`, { productId })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error adding item to cart:', error));
  };

  const removeFromCart = (productId) => {
    // Remove item from cart for the specific user
    axios.post(`https://e-commerce-mm9l.onrender.com/api/cart/${user.id}/remove`, { productId })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error removing item from cart:', error));
  };

  const getTotalAmount = () => {
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.new_price * cartItems[productId] : 0);
    }, 0).toFixed(2);
  };

  return (
    <ShopContext.Provider value={{ products, cartItems, addToCart, removeFromCart, getTotalAmount, user, setUser }}>
      {children}
    </ShopContext.Provider>
  );
};
