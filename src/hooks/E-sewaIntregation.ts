import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// Function for payment initiation
const e_sewaIntegration = async (products: any[]) => {
  const totalPrice = products.reduce((accumulator: number, product: { price: number; quantity: number }) => {
    return accumulator + (product.price * product.quantity); 
  }, 0);


  
  try {
   
    const response = await axios.post('http://localhost:2081/api/initiate-payment', {
      amount: totalPrice*135.52,              
      transactionId: 'TX12345', 
      productId: 'PROD123',     
    });

    window.location.href = response.data.paymentUrl;
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error; 
  }
};

// Custom hook for eSewa payment integration
export const useESewaPayment = () => {
  // `useSelector` should be inside a component or custom hook, not a regular function
  const products = useSelector((state: any) => state.product);

  return useMutation({
    mutationKey: ['E-Sewa'],
    mutationFn: () => e_sewaIntegration(products), // Pass products as an argument to the integration function
  });
};
