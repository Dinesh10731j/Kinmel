import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface CartProps {
  userCart: CartItem[];
}

interface CartItem {
  title: string;
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  key: number;
}

const Cart: React.FC<CartProps> = ({ userCart }) => {
  // Local state to manage the cart
  const [cart, setCart] = useState<CartItem[]>(userCart);

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      newQuantity = 1; 
    }
  

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Breadcrumb Section */}
      <section className="px-4 py-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Home
        </NavLink>
        <span className="mx-2 text-gray-500">/</span>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Cart
        </NavLink>
      </section>

      {/* Cart Details Section */}
      <section className="px-4 py-6 mt-4">

        {
          cart.length<=0?(
            <h1>No items added</h1>
          ):
          cart?.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap justify-between items-center mb-4 border-b pb-4"
            >
              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <img src={item?.img} alt={item?.title} className="h-20 w-20 mx-auto" />
                <h1 className="text-gray-600 mt-2">{item?.title.slice(0,20)}</h1>
              </div>
  
              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">Price</h1>
                <h1 className="text-gray-600">${item?.price || 0}</h1>
              </div>
  
              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">Quantity</h1>
                <input
                  type="number"
                defaultValue={'1'}
                  className="h-10 w-20 px-2 py-1 border border-black rounded-md text-center"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
  
              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">Subtotal</h1>
                <h1 className="text-gray-600">${(item?.price * item?.quantity).toFixed(2)}</h1>
              </div>
            </div>
          ))}

        
       
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row justify-between px-4 py-2 gap-4 mt-6">
        <NavLink to="/">
          <button className="w-full sm:w-auto py-2 px-10 border border-gray-600 rounded-md transition">
            Return To Home
          </button>
        </NavLink>
        <button className="w-full sm:w-auto py-2 px-10 border border-gray-600 rounded-md transition">
          Update Cart
        </button>
      </section>

      {/* Coupon and Cart Total Section */}
      <section className="flex flex-col md:flex-row justify-between gap-6 px-4 py-4 mt-8">
        {/* Coupon Code */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full md:w-auto py-2 px-7 border border-gray-300 rounded-md shadow-sm focus:border-gray-500"
          />
          <input
            type="submit"
            value="Apply Coupon"
            className="w-full md:w-auto py-2 px-10 bg-[#DB4444] text-white rounded-md cursor-pointer hover:bg-[#c33333] transition"
          />
        </div>

        {/* Cart Total */}
        <div className="p-6 w-full md:w-80 border border-black rounded-md">
          <h1 className="text-lg font-semibold text-gray-700 mb-4">Cart Total</h1>
          <div className="flex justify-between border-b py-2">
            <h1 className="text-gray-600">Subtotal</h1>
            <h3 className="text-gray-600">${cartTotal.toFixed(2)}</h3>
          </div>

          <div className="flex justify-between border-b py-2">
            <h1 className="text-gray-600">Shipping</h1>
            <h3 className="text-gray-600">Free</h3>
          </div>

          <div className="flex justify-between border-b py-2">
            <h1 className="text-gray-600">Total</h1>
            <h3 className="text-gray-600">${cartTotal.toFixed(2)}</h3>
          </div>

          <button className="w-full mt-6 py-2 px-10 bg-[#DB4444] text-white rounded-md shadow-md hover:bg-[#c33333] transition">
            Proceed To Checkout
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
