import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/cartContext';

// Stripe setup

const Checkout = () => {
  const { carts } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/completion', // URL to redirect to after payment
      },
    });

    if (error) {
      console.error('Payment Error:', error);
    } else {
      setOrderPlaced(true);
    }
  };

  return (
    <>
      <div className="flex px-3 py-2">
        <NavLink to={'/'}>Home</NavLink>
        <span className="mx-1"> / </span>
        <NavLink to={'checkout'} className={({ isActive }) => isActive ? 'text-black' : "text-gray-600"}>Checkout</NavLink>
      </div>

      <div className="checkout-page p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {!orderPlaced ? (
          <form onSubmit={onSubmit}>
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <ul className="order-summary mb-4">
                {carts.map(item => (
                  <li key={item.id} className="flex justify-between gap-3 py-7 px-1">
                    <img src={item.img} className="h-10 w-10" alt={item.title} />
                    <span>{item.title} (x{item.quantity})</span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </section>

            {/* Payment Information */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
              <div className="mb-4">
                <PaymentElement />
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className={`py-2 px-6 bg-[#DB4444] text-white rounded-md shadow-md ${
                  totalAmount <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#c33333]'
                }`}
                disabled={totalAmount <= 0 || !stripe}
              >
                Place Order
              </button>
            </div>
          </form>
        ) : (
          <div className="order-confirmation">
            <h3 className="text-xl font-semibold mb-4">Thank you for your order!</h3>
            <p>Your order has been placed successfully.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
