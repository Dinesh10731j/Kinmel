import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell, ShoppingCart, Coins, Tag, Menu, X } from "lucide-react";
import ChartComponent from "../Components/ChartComponent";
import Logo from "../assets/Codynn_Logo.png";
import user from "../assets/Frame 875.png";
import "chart.js/auto";
import { ReviewOrders } from "../Utils/category";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseAddProduct } from "../hooks/Useaddproduct";
import { Toaster } from "react-hot-toast";
import { uploadToCloudinary } from "../hooks/Useuploadimage";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
interface addProductType {
  productName: string;
  productImage: FileList;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  sellerId:string,
}

const SellerDashBoard = () => {

  const addProduct = UseAddProduct();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addProductType>();

  const totalOrdersData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Total Orders",
        data: [65, 59, 80, 81],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const totalSalesData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Total Sales",
        data: [12, 19, 3, 5],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const productsData = {
    labels: ["Electronics", "Clothing", "Groceries", "Books"],
    datasets: [
      {
        label: "Products",
        data: [20, 15, 30, 25],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Data",
      },
    },
  };

  const onAddProduct: SubmitHandler<addProductType> = async (productdata) => {
    try {
      const sellerId = Cookies.get("userId");
  
      const file = productdata.productImage[0];
      if (file) {
        const imageUrl = await uploadToCloudinary(file);
  
        const productData = {
          productPrice: productdata.productPrice,
          productName: productdata.productName,
          productCategory: productdata.productCategory,
          productDescription:productdata.productDescription,
          productImage: imageUrl,
          sellerId: sellerId,
        };
  
        addProduct.mutate(productData);
        
      } else {
        toast.error("Please select a file to upload");
      }
  
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  };
  

  return (
    <>
      {/* Add Product Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out translate-y-0">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit(onAddProduct)}>
              <input
                type="text"
                placeholder="Product Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                {...register("productName", {
                  required: "Productname is required",
                })}
              />

              {errors.productName && (
                <p className="text-sm text-red-700">
                  {errors.productName?.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Product Price"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                {...register("productPrice", {
                  required: "Product price is required",
                })}
              />

              {errors.productPrice && (
                <p className="text-sm text-red-700">
                  {errors.productPrice?.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Product Category"
                className="w-full mb-4 p-2 border
               border-gray-300 rounded"
                {...register("productCategory", {
                  required: "Product category is required",
                })}
              />

              {errors.productCategory && (
                <p className="text-sm text-red-700">
                  {errors.productCategory?.message}
                </p>
              )}

              <label
                htmlFor="file"
                className="block text-sm font-medium text-white bg-blue-500 w-28 mb-2 py-1 text-center cursor-pointer shadow-md rounded-md"
              >
                Upload Image
              </label>
              <input
                id="file"
                type="file"
                className="w-full mb-4 p-2 border border-gray-300 rounded hidden"
                {...register("productImage", {
                  required: "Product image is required",
                })}
              />

              {errors.productImage && (
                <p className="text-sm text-red-700">
                  {errors.productImage?.message}
                </p>
              )}

              <textarea
                placeholder="Product Description"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                {...register("productDescription", {
                  required: "Product description is required",
                })}
              />

              {errors.productDescription && (
                <p className="text-sm text-red-700">
                  {errors.productDescription?.message}
                </p>
              )}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <header className="flex items-center justify-between p-2 md:p-4 bg-white shadow-md">
        <section className="md:hidden flex items-center">
          <Menu
            onClick={() => setIsSidebarOpen(true)} // Open sidebar on mobile
            className="text-2xl cursor-pointer"
          />
        </section>
        <section>
          <img
            src={Logo}
            alt="kinmel_logo"
            className="h-10 w-10 md:h-15 md:w-15"
          />
        </section>

        <nav className="hidden md:flex space-x-8">
          <NavLink
            to={"/dashboard/seller"}
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-500"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-500"
            }
          >
            Orders
          </NavLink>
          <NavLink
            to={"/promotions"}
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-500"
            }
          >
            Promotions
          </NavLink>
          <NavLink
            to={"/inbox"}
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-500"
            }
          >
            Inbox
          </NavLink>
        </nav>

        <section className="flex items-center space-x-4">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-[#DB4444] text-white  px-2 py-1 md:px-4 md:py-2 rounded hover:bg-red-700"
          >
            Add New Product
          </button>
          <button className="p-2 text-gray-600">
            <Bell />
          </button>
          <section>
            <img
              src={user}
              alt="user_image"
              className="h-10 w-10 rounded-full cursor-pointer"
            />
          </section>
        </section>
      </header>

      {/* Sidebar for Mobile Devices */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 h-full z-10 w-64 bg-black text-white transform transition-transform">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl">KinMel</h2>
            <X
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>
          <nav>
            <ul className="flex flex-col p-4 gap-4">
              <NavLink
                to="/dashboard/seller"
                onClick={() => setIsSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink to="/orders" onClick={() => setIsSidebarOpen(false)}>
                Orders
              </NavLink>
              <NavLink to="/promotions" onClick={() => setIsSidebarOpen(false)}>
                Promotions
              </NavLink>
              <NavLink to="/inbox" onClick={() => setIsSidebarOpen(false)}>
                Inbox
              </NavLink>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-20">
        <section className="flex flex-col items-center bg-white p-4 rounded shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <ShoppingCart className="text-[#4A5568]" />
            <h1 className="text-lg font-bold">Total Orders</h1>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">5000</h1>
          <ChartComponent data={totalOrdersData} options={options} />
        </section>

        <section className="flex flex-col items-center bg-white p-4 rounded shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <Coins className="text-[#4A5568]" />
            <h1 className="text-lg font-bold">Total Sales</h1>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">4000</h1>
          <ChartComponent data={totalSalesData} options={options} />
        </section>

        <section className="flex flex-col items-center bg-white p-4 rounded shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <Tag className="text-[#4A5568]" />
            <h1 className="text-lg font-bold">Total Products</h1>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">5000</h1>
          <ChartComponent data={productsData} options={options} />
        </section>
      </div>

      {/* Order Summary, Payment Summary, and Review Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <section className="bg-white p-4 rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Order Summary</h1>
          <div className="mb-4">
            <h2 className="font-semibold text-gray-600">Pending Orders: 40%</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600">Shipped Orders:60%</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-purple-500 h-4 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-600">
              Delivered Orders:30%
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Payment Summary</h1>
          <ChartComponent data={totalSalesData} options={options} />
        </section>

        <section className="bg-white p-4 rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Review Orders</h1>

          <div className="flex flex-col space-y-4">
            {ReviewOrders?.map((order: any, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{order?.date}</p>
                  <p className="text-gray-500 text-sm">{order?.product}</p>
                </div>

                <p className="font-semibold text-gray-600">{order.location}</p>

                {order?.status === "In Transit" ? (
                  <button className="bg-blue-100 text-blue-700 px-1 py-1 rounded-sm">
                    {order?.status}
                  </button>
                ) : order?.status === "Pending" ? (
                  <button className="bg-yellow-100 text-yellow-400 px-1 py-1 rounded-sm">
                    {order?.status}
                  </button>
                ) : (
                  <button className="bg-green-100 text-green-400 px-1 py-1 rounded-sm">
                    {order?.status}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <Toaster position="top-center"/>
      </div>
    </>
  );
};

export default SellerDashBoard;
