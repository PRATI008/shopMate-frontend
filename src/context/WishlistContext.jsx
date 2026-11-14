import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlistItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const id = product._id || product.id || product.productTitle;
    const exists = wishlist.some((item) => (item._id || item.id || item.productTitle) === id);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => (item._id || item.id || item.productTitle) !== id));
      toast.info(`Removed ${product.productTitle} from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success(`Added ${product.productTitle} to wishlist! ❤️`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item._id || item.id || item.productTitle) === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

