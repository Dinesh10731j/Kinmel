import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
  id: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  carts: CartItem[];
  handleAddCart: (id: string, img: string, title: string, price: number) => void;
  handleRemoveCart: (id: string) => void;
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

  const handleAddCart = (id: string, img: string, title: string, price: number) => {
    
    setCarts((prevCart) => [...prevCart, { id, img, title, price, quantity: 1 }]);
  };

  const handleRemoveCart = (id: string) => {
    console.log('trash clicked')
    setCarts((prevCart) => prevCart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carts, handleAddCart, handleRemoveCart }}>
      {children}
    </CartContext.Provider>
  );
};
