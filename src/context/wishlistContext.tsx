import { createContext, useState, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

type WishListItem = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: {
    rate: number;
  };
};

interface WishListContextType {
  wishlist: WishListItem[];
  addToWishList: (item: WishListItem) => void;
  removeFromWishList: (id: number) => void;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);

  const addToWishList = (item: WishListItem) => {
    setWishlist([...wishlist, item]);
    toast.success('Added to your wishlist')
  };

  const removeFromWishList = (id: number) => {
    setWishlist(wishlist.filter(wish => wish.id !== id));
  };

  return (
    <WishListContext.Provider value={{ wishlist, addToWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};

export default WishListContext;
