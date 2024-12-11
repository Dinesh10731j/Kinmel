
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '../Endpoints/axiosInstance';

const e_sewaIntegration = async (products: any[]) => {
 
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('Product list is empty or invalid');
  }


  const totalPrice = products.reduce((accumulator: number, product: { price: number; quantity: number }) => {
    if (typeof product.price !== 'number' || typeof product.quantity !== 'number') {
      throw new Error('Invalid product price or quantity');
    }
    return accumulator + (product.price * product.quantity);
  }, 0);

  if (totalPrice <= 0) {
    throw new Error('Total price must be greater than zero');
  }

  

  try {
  
    const response = await axiosInstance.post('/api/initiate-payment', {
      amount: totalPrice,  
      transactionId: 'TX12345',           
      productId: 'PROD123',             
    });

  
    if (response.data && response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl;
    } else {
      throw new Error('Payment URL not found in response');
    }
  } catch (error: any) {
    console.error('Payment initiation failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const useESewaPayment = () => {

  const products = useSelector((state: any) => state.product);

  return useMutation({
    mutationKey: ['E-Sewa'],
    mutationFn: () => e_sewaIntegration(products),
  });
};
