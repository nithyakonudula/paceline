import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'paceline-wishlist';

const readWishlist = () => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readWishlist);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleItem = (productId) => {
    setIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const value = useMemo(
    () => ({
      ids,
      toggleItem,
      isSaved: (productId) => ids.includes(productId),
      clear: () => setIds([]),
    }),
    [ids],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
