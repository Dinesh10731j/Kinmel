

//Publishable key:pk_test_51OCCtjHP6Csyq28m2J3KmisSCY1opSv9Bd5cEoRdxiZCsvCAjKUq5y6gFi6lZICZUlwnUnJ0yZ4E1tVrnCIeIVrY006KmDqc53
//Secret Key :sk_test_51OCCtjHP6Csyq28mW553NNKfZt6sk5HMaECrWKbTafELPdXqPL5tJa3BQvcIw43GtVYiVFF4cXSieUKbN1AFryDy00mjNKVFKo

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCart } from '../context/cartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { NavLink } from 'react-router-dom';
//import { UseUserPayment } from '../hooks/Usepayment';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
});

// Stripe setup
const stripePromise = loadStripe('ypk_test_51OCCtjHP6Csyq28m2J3KmisSCY1opSv9Bd5cEoRdxiZCsvCAjKUq5y6gFi6lZICZUlwnUnJ0yZ4E1tVrnCIeIVrY006KmDqc53');

const Checkout = () => {

  //const mutation = UseUserPayment();

  const { carts } = useCart();
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
      billing_details: {
        name: data.name,
        address: {
          line1: data.address,
          city: data.city,
          postal_code: data.zip,
          country: data.country,
        },
      },
    });

    if (error) {
      console.error('Stripe Error:', error);
    } else {
      console.log('Payment Method:', paymentMethod);
      setOrderPlaced(true);
    }
  };

  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (

    <>
    <div className='flex px-3 py-2'>
       <NavLink to={'/'}>Home</NavLink>
       <span className='mx-1'> / </span>
       <NavLink to={'checkout'} className={({isActive})=>isActive?'text-black':"text-gray-600"}>Checkout</NavLink>

      </div>
      
      <div className="checkout-page p-6 max-w-3xl mx-auto">
      
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {!orderPlaced ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <ul className="order-summary mb-4">
              {carts.map(item => (
                <li key={item.id} className="flex justify-between gap-3 py-7 px-1">
                  <img src={item.img} className="h-10 w-10" alt={item.title}/>
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

          {/* Shipping Information */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            {/* Shipping fields go here */}
            {/* ... */}
          </section>

          {/* Payment Information */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="mb-4">
              <CardElement className="p-2 border rounded-md" />
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className={`py-2 px-6 bg-[#DB4444] text-white rounded-md shadow-md ${
                totalAmount <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#c33333] '
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

export default function WrappedCheckout() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
