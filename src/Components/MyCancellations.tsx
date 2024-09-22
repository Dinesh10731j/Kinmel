import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { UseCancellation } from "../hooks/Usecancellation";
import { UseGetCancellation } from "../hooks/Usegetcancellation";
import { UseEditCancellation } from "../hooks/Useeditcancellation";
import {Edit,Trash2} from "lucide-react"
interface CancellationItem {
  orderId: string;
  productName: string;
  productImage: string;
  cancellationDate: string;
  cancellationStatus: "Pending" | "Approved" | "Rejected";
  refundAmount: number | null;
  reason: string;
  comments: string;
  _id: string;
}

interface FormValues {
  _id: string;
  orderId: string;
  productName: string;
  reason: string;
  comments: string;
  cancellationId: string;
}

const MyCancellations: React.FC = () => {
  const cancellation = UseCancellation();
  const getCancellation = UseGetCancellation();

  const editCancellation = UseEditCancellation();
  const [editingItems, setEditingItems] = useState<CancellationItem | null>(
    null
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      orderId: "",
      productName: "",
      reason: "",
      comments: "",
      cancellationId: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newCancellationItem: CancellationItem = {
      ...data,
      productImage: "https://via.placeholder.com/150", // Placeholder image
      cancellationDate: new Date().toLocaleDateString(),
      cancellationStatus: "Pending",
      refundAmount: 1000,
    };

    if (editingItems) {
      editCancellation.mutate(newCancellationItem);
    } else {
      cancellation.mutate(newCancellationItem);
    }

    setEditingItems(null);

    reset();
  };

  const handleEdit = (data: CancellationItem) => {
    setEditingItems(data);
    setValue("orderId", data?.orderId);
    setValue("productName", data?.productName);
    setValue("reason", data?.reason);
    setValue("comments", data?.comments);
    setValue("cancellationId", data?._id);
  };

  const handleDelete = (cancellationId: string) => {
    console.log(cancellationId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Cancellations</h1>

      {/* Cancellations Overview */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p>Total Cancellations: {getCancellation?.data?.data?.length}</p>
        Pending Cancellations:{" "}
        {
          getCancellation?.data?.data?.filter(
            (status: { cancellationStatus: string }) =>
              status.cancellationStatus === "Pending"
          ).length
        }
        <p>Approved Cancellations:  {
          getCancellation?.data?.data?.filter(
            (status: { cancellationStatus: string }) =>
              status.cancellationStatus === "Approved"
          ).length
        } </p>

<p>Reject Cancellations:  {
          getCancellation?.data?.data?.filter(
            (status: { cancellationStatus: string }) =>
              status.cancellationStatus === "Rejected"
          ).length
        } </p>

      </div>

      {/* Cancellation Request Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-md shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingItems !== null
            ? "Edit Cancellation"
            : "Request a Cancellation"}
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
              required: "Productname is required",
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
          <label className="block font-medium">Reason for Cancellation</label>

          <select
            {...register("reason", { required: "Reason is required" })}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select a reason</option>
            <option value="Changed my mind">Changed my mind</option>
            <option value="Ordered by mistake">Ordered by mistake</option>
            <option value="Found a better price">Found a better price</option>
            {/* Add more options as needed */}
          </select>
          {errors.reason?.message && (
            <p className="text-sm text-red-700">{errors.reason?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium">Additional Comments</label>

          <textarea
            {...register("comments", { required: "Comment is required" })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[#DB4444] text-white py-2 px-4 rounded-md  transition duration-200"
        >
          {editingItems ? "Update Cancellation" : "Submit Cancellation"}
        </button>
      </form>

      {/* Cancellation History */}
      <ul className="space-y-4">
        {getCancellation?.data?.data.map((item: any, index: number) => (
          <li key={index} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p>Order ID: {item.orderId}</p>
                <p>Cancellation Date: {item.cancellationDate}</p>
                <p>Status: {item.cancellationStatus}</p>
                {item.refundAmount !== null && (
                  <p>Refund: ${item.refundAmount}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-200"
                >
                  <Edit/>
                </button>
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  <Trash2/>
                </button>
              </div>
            </div>
            <p className="mt-2">Reason: {item.reason}</p>
            {item.comments && <p>Comments: {item.comments}</p>}
          </li>
        ))}
      </ul>

      {/* Cancellation Instructions */}
      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Cancellation Instructions
        </h2>
        <p>Follow these steps to cancel your order:</p>
        <ol className="list-decimal pl-6">
          <li>Ensure the product hasn't been shipped yet.</li>
          <li>Select the correct order and product for cancellation.</li>
          <li>Provide a valid reason for the cancellation.</li>
          <li>Submit the cancellation request for processing.</li>
        </ol>
        <p className="mt-2">For any questions, contact our customer support.</p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default MyCancellations;
