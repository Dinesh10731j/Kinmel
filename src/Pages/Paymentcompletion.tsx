
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PaymentCompletion = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className='flex justify-center items-center'>
        <Check className="text-green-500 text-7xl mb-4" size={120} />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Your Order Has Been Placed!</h1>
        <p className="text-lg mb-6">Payment was successful. Thank you for your purchase!</p>
        <button
          onClick={handleGoHome}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCompletion;
