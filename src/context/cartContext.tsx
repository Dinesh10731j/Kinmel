import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface CartItem {
  id: number;
  img: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  carts: CartItem[];
  handleAddCart: (id: number, img: string, title: string, price: number) => void;
  handleRemoveCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carts, setCarts] = useState<CartItem[]>([]);

  const handleAddCart = (id: number, img: string, title: string, price: number) => {
    toast.success('Added to your cart');
    setCarts((prevCart) => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id, img, title, price, quantity: 1 }];
      }
    });
  };

  const handleRemoveCart = (id: number) => {
    setCarts(carts.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carts, handleAddCart, handleRemoveCart }}>
      {children}
    </CartContext.Provider>
  );
};
