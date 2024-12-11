import { useESewaPayment } from "../hooks/E-sewaIntregation";
import { useSelector } from "react-redux";
const E_SewaPaymentButton = () => {
  const mutation = useESewaPayment();

  const products = useSelector((state:any)=>{
    

    return state.product;


  });

  const totalAmount = products.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);


  const handlePayment = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={mutation.isPending}
      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
        
      ${totalAmount <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#c33333]'}
        `}
    >
      {mutation.isPending? 'Processing...' : 'Pay with eSewa'}

    </button>
  );
};

export default E_SewaPaymentButton;
