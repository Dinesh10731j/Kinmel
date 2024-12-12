import E_SewaPaymentButton from "../Components/Payment_Button";
import Checkout from "./Checkout";

const Payment = () => {
  return (
    <>
      <Checkout />

      <div className="flex w-full justify-center items-center mb-3">
        <E_SewaPaymentButton />
      </div>
    </>
  );
};

export default Payment;
