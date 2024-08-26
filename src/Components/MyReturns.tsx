import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface ReturnItem {
  orderId: string;
  productName: string;
  productImage: string;
  returnDate: string;
  returnStatus: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  refundAmount: number | null;
  reason: string;
  comments: string;
}

interface FormValues {
  orderId: string;
  productName: string;
  reason: string;
  comments: string;
}

const MyReturns: React.FC = () => {
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      orderId: '',
      productName: '',
      reason: '',
      comments: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newReturnItem: ReturnItem = {
      ...data,
      productImage: 'https://via.placeholder.com/150', // Placeholder image
      returnDate: new Date().toLocaleDateString(),
      returnStatus: 'Pending',
      refundAmount: null,
    };

    if (editingIndex !== null) {
      const updatedReturnItems = returnItems.map((item, index) =>
        index === editingIndex ? newReturnItem : item
      );
      setReturnItems(updatedReturnItems);
      setEditingIndex(null);
    } else {
      setReturnItems([...returnItems, newReturnItem]);
    }

    reset();
  };

  const handleEdit = (index: number) => {
    const item = returnItems[index];
    setEditingIndex(index);
    setValue('orderId', item.orderId);
    setValue('productName', item.productName);
    setValue('reason', item.reason);
    setValue('comments', item.comments);
  };

  const handleDelete = (index: number) => {
    setReturnItems(returnItems.filter((_, idx) => idx !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Returns</h1>

      {/* Returns Overview */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p>Total Returns: {returnItems.length}</p>
        <p>Pending Returns: {returnItems.filter(item => item.returnStatus === 'Pending').length}</p>
        <p>Approved Returns: {returnItems.filter(item => item.returnStatus === 'Approved').length}</p>
      </div>

      {/* Return Request Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingIndex !== null ? 'Edit Return' : 'Start a Return'}</h2>
        <div className="mb-4">
          <label className="block font-medium">Order ID</label>
          <Controller
            name="orderId"
            control={control}
            render={({ field }) => <input {...field} className="border border-gray-300 rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Product Name</label>
          <Controller
            name="productName"
            control={control}
            render={({ field }) => <input {...field} className="border border-gray-300 rounded-md p-2 w-full" />}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Reason for Return</label>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <select {...field} className="border border-gray-300 rounded-md p-2 w-full">
                <option value="">Select a reason</option>
                <option value="Damaged item">Damaged item</option>
                <option value="Incorrect item">Incorrect item</option>
                <option value="No longer needed">No longer needed</option>
                {/* Add more options as needed */}
              </select>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Additional Comments</label>
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <textarea {...field} className="border border-gray-300 rounded-md p-2 w-full" />
            )}
          />
        </div>
        <button
          type="submit"
          className="bg-[#DB4444] text-white py-2 px-4 rounded-md transition duration-200"
        >
          {editingIndex !== null ? 'Update Return' : 'Submit Return'}
        </button>
      </form>

      {/* Return History */}
      <ul className="space-y-4">
        {returnItems.map((item, index) => (
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
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
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
