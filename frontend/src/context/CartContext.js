import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    if (!user) { setCartItems([]); setCartCount(0); return; }
    try {
      const res = await cartAPI.getCart(user.id);
      const items = Array.isArray(res.data) ? res.data : [];
      setCartItems(items);
      setCartCount(items.length);
    } catch { setCartItems([]); setCartCount(0); }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (petId) => {
    await cartAPI.addToCart(petId);
    fetchCart();
  };

  const removeFromCart = async (itemId) => {
    await cartAPI.removeFromCart(itemId);
    fetchCart();
  };

  const checkout = async () => {
    const res = await cartAPI.checkout();
    await fetchCart();
    return res.data;
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, checkout, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;