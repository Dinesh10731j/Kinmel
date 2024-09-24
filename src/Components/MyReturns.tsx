import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseReturns } from "../hooks/Usereturn";
import { UseGetreturns } from "../hooks/Usegetreturn";

interface ReturnItem {
  orderId: string;
  productName: string;
  productImage: string;
  returnDate: string;
  returnStatus: "Pending" | "Approved" | "Completed" | "Rejected";
  refundAmount: number | null;
  reason: string;
  comments: string;
  _id:string;
  returnId:string;
}

interface FormValues {
  orderId: string;
  productName: string;
  reason: string;
  comments: string;
  _id:string;
  returnId:string;
}

const MyReturns: React.FC = () => {
  const myReturns = UseReturns();
  const getReturns = UseGetreturns();



  const [editingItems, setEditingItems] = useState<FormValues | null>(null);
  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      orderId: "",
      productName: "",
      reason: "",
      comments: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newReturnItem: ReturnItem = {
      ...data,
      productImage: "https://via.placeholder.com/150", // Placeholder image
      returnDate: new Date().toLocaleDateString(),
      returnStatus: "Pending",
      refundAmount: 1000,
    
    };

    if(editingItems){

    }else{
      myReturns.mutate(newReturnItem);

    }

    

    setEditingItems(null);
    reset();
  };

  const handleEdit:SubmitHandler<FormValues> = (data) => {

   setEditingItems(data);
    setValue('orderId', data?.orderId);
    setValue('productName', data?.productName);
    setValue('reason', data?.reason);
    setValue('comments', data?.comments);
    setValue("returnId",data?._id);
  };

  const handleDelete = (returnItemId:string) => {
   console.log(returnItemId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Returns</h1>

      {/* Returns Overview */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p>Total Returns: </p>
        <p>Pending Returns: </p>
        <p>Approved Returns: </p>
      </div>

      {/* Return Request Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-md shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingItems ? "Edit Return" : "Start a Return"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium">Order ID</label>
          <input
            {...register("orderId", { required: "OrderId is required" })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.orderId?.message && (
            <p className="text-sm text-red-700">{errors.orderId?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium">Product Name</label>
          <input
            {...register("productName", {
              required: "ProductName is required",
            })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.productName?.message && (
            <p className="text-sm text-red-700">
              {errors.productName?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium">Reason for Return</label>

          <select
            {...register("reason", { required: "Reason is required" })}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select a reason</option>
            <option value="Damaged item">Damaged item</option>
            <option value="Incorrect item">Incorrect item</option>
            <option value="No longer needed">No longer needed</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {errors.reason?.message && (
          <p className="text-sm text-red-700">{errors.reason?.message}</p>
        )}
        <div className="mb-4">
          <label className="block font-medium">Additional Comments</label>

          <textarea
            {...register("comments", { required: "Comment is required" })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.comments?.message && (
            <p className="text-sm text-red-700">{errors.comments?.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#DB4444] text-white py-2 px-4 rounded-md transition duration-200"
        >
          {editingItems ? "Update Return" : "Submit Return"}
        </button>
      </form>

      {/* Return History */}
      <ul className="space-y-4">
        {getReturns?.data?.map((item:ReturnItem, index:number) => (
          <li key={index} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex items-center space-x-4">
              <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p>Order ID: {item.orderId}</p>
                <p>Return Date: {item.returnDate}</p>
                <p>Status: {item.returnStatus}</p>
                {item.refundAmount !== null && <p>Refund: ${item.refundAmount}</p>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2">Reason: {item.reason}</p>
            {item.comments && <p>Comments: {item.comments}</p>}
          </li>
        ))}
      </ul>

      {/* Return Instructions */}
      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Return Instructions</h2>
        <p>Follow these steps to return your item:</p>
        <ol className="list-decimal pl-6">
          <li>Ensure the item is in its original packaging.</li>
          <li>Download and print the return label from your email.</li>
          <li>Package the item securely and attach the return label.</li>
          <li>Drop off the package at the nearest shipping center.</li>
        </ol>
        <p className="mt-2">For any questions, contact our customer support.</p>
      </div>
    </div>
  );
};

export default MyReturns;
