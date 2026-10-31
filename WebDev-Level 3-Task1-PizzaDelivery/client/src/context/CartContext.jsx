import { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pizza_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);
  
  const addToCart = useCallback((pizza) => {
    setCartItems(prev => [...prev, { ...pizza, id: pizza.id || (Date.now().toString() + Math.random().toString()) }]);
  }, []);
  
  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter((item) => item.id !== id));
  }, []);
  
  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem('pizza_cart');
    } catch {}
  }, []);
  
  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  }, []);
  
  const updateCartItem = useCallback((id, updatedPizza) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedPizza } : item));
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  
  const value = useMemo(() => ({
    cartItems, addToCart, removeFromCart, clearCart, updateQuantity, updateCartItem, cartTotal
  }), [cartItems, addToCart, removeFromCart, clearCart, updateQuantity, updateCartItem, cartTotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
