import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Trash2} from "lucide-react";
import { useSelector } from "react-redux";



interface CartItem {
  title: string;
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  key: number;
 
}

const Cart: React.FC= () => {
  const {carts,handleRemoveCart} = useCart();

  const products = useSelector((state:any)=>{

    return state.product;


  });





  // Local state to manage the cart
  const [cart, setCart] = useState<CartItem[]>(carts as unknown as CartItem[]);

  // Handle quantity changes
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (acc:any, item:any) => acc + item.price * item.quantity,
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
        {products?.length <= 0 ? (
          <h1>No items added</h1>
        ) : (
          products?.map((item:any,index:number) => (
            <div
              key={index}
              className="flex flex-wrap justify-between items-center mb-4 border-b pb-4"
            >
              <div className="relative w-full sm:w-auto text-center mb-4 sm:mb-0">
                <img
                  src={item?.image}
                  alt={item?.title}
                  className="h-20 w-20 mx-auto"
                />
                <Trash2 onClick={()=>handleRemoveCart(item?.id)} className="absolute top-2 right-2 text-red-700 cursor-pointer"/>
                <h1 className="text-gray-600 mt-2">
                  {item?.title.slice(0, 20)}
                </h1>
              </div>

              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">Price</h1>
                <h1 className="text-gray-600">${item?.price || 0}</h1>
              </div>

              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">
                  Quantity
                </h1>
                <input
                  type="number"
                  defaultValue={"1"}
                  className="h-10 w-20 px-2 py-1 border border-black rounded-md text-center"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </div>

              <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
                <h1 className="text-lg font-semibold text-gray-700">
                  Subtotal
                </h1>
                <h1 className="text-gray-600">
                  ${(item?.price * item?.quantity).toFixed(2)}
                </h1>
              </div>
            </div>
          ))
        )}
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
          <h1 className="text-lg font-semibold text-gray-700 mb-4">
            Cart Total
          </h1>
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

          <NavLink to={products.length > 0 ? "/payment" : "#"} className={`${ products?.length <= 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <button
              className={`w-full mt-6 py-2 px-10 bg-[#DB4444] text-white rounded-md shadow-md hover:bg-[#702323] transition ${
                products.length <= 0 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Proceed To Checkout
            </button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Cart;
