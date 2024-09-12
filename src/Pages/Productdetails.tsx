import { UseProductDetails } from "../hooks/Usegetproductsdetails";
//import { useProductDetailsContext } from "../context/productdetailsContext";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "../context/cartContext";
import { Toaster } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

type ProductIdType = {
    id: string;
  };

const ProductDetails = () => {
    const id = useParams<ProductIdType>().id ?? '';

  const {handleAddCart} = useCart();
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`text-yellow-400 ${
            i < Math.floor(rating) ? "fill-current" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  const { data: productinfo, isLoading, isError } = UseProductDetails(id);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Product details not found...
      </div>
    );
  }

  return (
    <section className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-6 md:p-12 bg-gray-50 rounded-lg shadow-lg mt-12 mx-4 md:mx-auto max-w-4xl">
      {isLoading ? (
        <CircularProgress size={34} />
      ) : (
        <>
          <div className="flex-shrink-0">
            <img
              src={productinfo?.image}
              alt={productinfo?.title}
              className="h-72 w-60 md:h-96 md:w-80 object-cover rounded-md shadow-md"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-xl md:text-4xl font-semibold text-gray-800">
              {productinfo?.title}
            </h1>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-medium text-gray-600">
                {`$${productinfo?.price}`}
              </h2>
              <div className="flex">{renderStars(productinfo?.rating?.rate)}</div>
              <span className="text-sm text-gray-500">
                {`(${productinfo?.rating?.count} Reviews)`}
              </span>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {productinfo?.description}
            </p>
            <button onClick={()=>handleAddCart(productinfo?.id,productinfo?.image,productinfo?.title,productinfo?.price)} className=" flex justify-center gap-4 mt-4 px-6 py-2 bg-[#DB4444] hover:bg-red-600 text-white rounded-lg transition">
            <ShoppingCart/>  Add to Cart
            </button>
          </div>
          <Toaster position="top-center"/>
        </>
      )}
    </section>
  );
};

export default ProductDetails;
