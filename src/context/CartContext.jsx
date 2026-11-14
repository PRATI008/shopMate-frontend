import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const id = product._id || product.id || product.productTitle;
      const existing = prevItems.find((item) => (item._id || item.id || item.productTitle) === id);

      if (existing) {
        toast.info(`Increased quantity for ${product.productTitle}`);
        return prevItems.map((item) =>
          (item._id || item.id || item.productTitle) === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        toast.success(`${product.productTitle} added to cart!`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id || item.productTitle) !== productId)
    );
    toast.warn('Item removed from cart');
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if ((item._id || item.id || item.productTitle) === productId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.productPrice) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

