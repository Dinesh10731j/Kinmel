import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of your context data
interface ProductDetailsContextType {
  productId: string;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value
const ProductDetailsContext = createContext<ProductDetailsContextType | undefined>(undefined);

// Create a provider component
export const ProductDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [productId, setProductId] = useState<string>('');

  console.log('This is productid',productId);

  return (
    <ProductDetailsContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

// Custom hook to use the ProductDetailsContext
export const useProductDetailsContext = () => {
  const context = useContext(ProductDetailsContext);
  if (context === undefined) {
    throw new Error('useProductDetailsContext must be used within a ProductDetailsProvider');
  }
  return context;
};

export default ProductDetailsContext;
