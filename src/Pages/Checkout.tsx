import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Product {
  id: number;
  image?: string;
  title: string;
  quantity: number;
  price: number;
}

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products = useSelector((state: any) => {
    return state.product;
  });

  const totalAmount = products.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <>
      <div className="flex px-3 py-2">
        <NavLink to={'/'}>Home</NavLink>
        <span className="mx-1"> / </span>
        <NavLink to={'checkout'} className={({ isActive }) => (isActive ? 'text-black' : 'text-gray-600')}>
          Checkout
        </NavLink>
      </div>

      <div className="checkout-page p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {!orderPlaced ? (
          <form onSubmit={onSubmit}>
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <ul className="order-summary mb-4">
                {products.map((item: Product) => (
                  <li key={item.id} className="flex justify-between gap-3 py-7 px-1">
                    <img src={item?.image} className="h-10 w-10" alt={item.title} />
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-right">
             
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
