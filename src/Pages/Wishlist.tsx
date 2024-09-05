import { Trash2, Eye, ShoppingCart } from 'lucide-react';
import { useWishList } from '../context/wishlistContext';
import { Link, NavLink } from 'react-router-dom';
import { UseGetProductsImages } from '../hooks/Usegetproductsimage';
import { useCart } from '../context/cartContext';
import { Toaster } from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishList } = useWishList();
  const {handleAddCart} = useCart();
  const { data: justforyou } = UseGetProductsImages();

  // Slice to show only the first 4 products
  const productsToShow = justforyou?.slice(0, 4) || [];

  return (
    <div className="container mx-auto p-6 mt-7">
      <div className='py-4'>
        <NavLink to={'/'}>
          Home
        </NavLink>
        <span> / </span>
        <NavLink to={'/wishlist'} className={({ isActive }) => isActive ? 'text-black font-bold' : 'text-gray-500'}>
          Wishlist
        </NavLink>
      </div>
      <h1 className=" text-xl md:text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item?.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item?.title}</h2>
                <p className="text-gray-700 mb-2">{item?.price}</p>
                <p className="text-yellow-500 mb-4">
                  Rating: {item?.rating?.rate} ⭐
                </p>
                <div className="flex justify-between items-center">
                  <button className="bg-[#DB4444] cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={()=>handleAddCart(item?.id,item?.image,item?.title,item?.price)}>
                    <ShoppingCart className="w-5 h-5 inline-block mr-1" />
                    Add to Cart
                  </button>
                  <Trash2
                    onClick={() => removeFromWishList(item?.id)}
                    className="cursor-pointer text-red-700"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500 col-span-full">
            Your wishlist is empty.
          </p>
        )}
      </div>

      <section className="mt-12">
        <h2 className=" text-xl md:text-2xl font-bold mb-6">Just For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsToShow.length > 0 ? (
            productsToShow.map((item:any) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.price}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <button className="bg-[#DB4444] text-white px-4 py-2 rounded-md hover:bg-red-700" onClick={()=>handleAddCart(item?.id,item?.image,item?.title,item?.price)}>
                      <ShoppingCart className="w-5 h-5 inline-block mr-1" />
                      Add to Cart
                    </button>
                    <Link to={`/productdetails/${item?.id}`}>
                    <Eye className="text-gray-500 cursor-pointer hover:text-gray-700 w-5 h-5" />
                    </Link>
               
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500 col-span-full">
              No products available.
            </p>
          )}
        </div>
      </section>
      <Toaster position='top-center'/>
    </div>
  );
};

export default Wishlist;
