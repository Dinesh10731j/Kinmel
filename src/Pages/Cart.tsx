import { NavLink } from "react-router-dom";

const Cart = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <section className="px-4 py-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"
          }
        >
          Home
        </NavLink>
        <span className="mx-2 text-gray-500">/</span>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"
          }
        >
          Cart
        </NavLink>
      </section>

      {/* Cart Details Section */}
      <section className="flex flex-wrap justify-between px-4 py-6 bg-white">
        <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
          <h1 className="text-lg font-medium text-gray-700">Product</h1>
        </div>

        <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
          <h1 className="text-lg font-medium text-gray-700">Price</h1>
        </div>

        <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
          <h1 className="text-lg font-medium text-gray-700">Quantity</h1>
        </div>

        <div className="w-full sm:w-auto text-center mb-4 sm:mb-0">
          <h1 className="text-lg font-medium text-gray-700">Subtotal</h1>
        </div>
      </section>
    </>
  );
};

export default Cart;
