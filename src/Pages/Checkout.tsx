import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  cardNumber: yup.string().required('Card number is required').min(16, 'Card number must be 16 digits'),
  expiry: yup.string().required('Expiry date is required'),
  cvv: yup.string().required('CVV is required').min(3, 'CVV must be 3 digits'),
});

const Checkout = () => {
  const [cart] = useState([
    { id: '1', name: 'Product 1', price: 50, quantity: 2 },
    { id: '2', name: 'Product 2', price: 30, quantity: 1 },
  ]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const onSubmit = (data: any) => {
    // Handle order placement logic
    console.log('Order Data:', data);
    setOrderPlaced(true);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-page p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {!orderPlaced ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Order Summary */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <ul className="order-summary mb-4">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
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
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input {...register('name')} type="text" className="w-full p-2 border rounded-md" />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <input {...register('address')} type="text" className="w-full p-2 border rounded-md" />
              <p className="text-red-500 text-sm">{errors.address?.message}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-1">City</label>
                <input {...register('city')} type="text" className="w-full p-2 border rounded-md" />
                <p className="text-red-500 text-sm">{errors.city?.message}</p>
              </div>
              <div className="w-1/2">
                <label className="block mb-1">ZIP</label>
                <input {...register('zip')} type="text" className="w-full p-2 border rounded-md" />
                <p className="text-red-500 text-sm">{errors.zip?.message}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Country</label>
              <input {...register('country')} type="text" className="w-full p-2 border rounded-md" />
              <p className="text-red-500 text-sm">{errors.country?.message}</p>
            </div>
          </section>

          {/* Payment Information */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="mb-4">
              <label className="block mb-1">Card Number</label>
              <input {...register('cardNumber')} type="text" className="w-full p-2 border rounded-md" />
              <p className="text-red-500 text-sm">{errors.cardNumber?.message}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-1">Expiry Date</label>
                <input {...register('expiry')} type="text" className="w-full p-2 border rounded-md" placeholder="MM/YY" />
                <p className="text-red-500 text-sm">{errors.expiry?.message}</p>
              </div>
              <div className="w-1/2">
                <label className="block mb-1">CVV</label>
                <input {...register('cvv')} type="text" className="w-full p-2 border rounded-md" />
                <p className="text-red-500 text-sm">{errors.cvv?.message}</p>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className={`py-2 px-6 bg-blue-500 text-white rounded-md shadow-md ${
                totalAmount <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-blue-600'
              }`}
              disabled={totalAmount <= 0}
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
  );
};

export default Checkout;
