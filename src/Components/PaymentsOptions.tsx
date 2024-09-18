import React, { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";

//  types for payment methods and form values
interface PaymentMethod {
  id: number;
  type: "card" | "wallet";
  name: string;
  details: string; // e.g., "**** **** **** 1234"
}

interface FormValues {
  name: string;
  details: string;
}

const PaymentsOptions: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [editingPaymentIndex, setEditingPaymentIndex] = useState<number | null>(
    null
  );
 

  const {register, handleSubmit, reset, setValue,formState:{errors} } = useForm<FormValues>({
    defaultValues: {
      name: "",
      details: "",
    },
  });

  // Handle form submission for payment methods
  const onSubmitPayment: SubmitHandler<FormValues> = (data) => {
    if (editingPaymentIndex !== null) {
      const updatedMethods = paymentMethods.map((method, idx) =>
        idx === editingPaymentIndex
          ? { ...method, name: data.name, details: data.details }
          : method
      );
      setPaymentMethods(updatedMethods);
      setEditingPaymentIndex(null);
    } else {
      setPaymentMethods([
        ...paymentMethods,
        {
          id: Date.now(),
          type: "card",
          name: data.name,
          details: data.details,
        },
      ]);
    }
    reset();
  };

  // Handle editing a payment method
  const handleEditPayment = (index: number) => {
    setEditingPaymentIndex(index);
    const payment = paymentMethods[index];
    setValue("name", payment.name);
    setValue("details", payment.details);
  };

  // Handle deleting a payment method
  const handleDeletePayment = (index: number) => {
    setPaymentMethods(paymentMethods.filter((_, idx) => idx !== index));
    if (editingPaymentIndex === index) {
      setEditingPaymentIndex(null);
      reset();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg min-w-96">
      <h2 className="text-2xl font-bold mb-4">My Payment Options</h2>

      {/* Payment Methods Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Payment Methods</h3>
        <form onSubmit={handleSubmit(onSubmitPayment)} className="mb-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
           
            
                <input
                {...register('name',{required:'Name is required'})}
                 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                          {errors.name && <p className="text-red-700 text-sm">{errors.name?.message}</p>}
     
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Card Details
            </label>
           
              
                <input
                {...register('details',{required:'Card detail is required',pattern:{
                  value:/^\d{16}$/,
                  message:'Card details must be 16 digits'
                }})}
                 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.details && <p className="text-red-700 text-sm">{errors.details?.message}</p>}
           
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#DB4444]  focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {editingPaymentIndex !== null ? "Update" : "Add"} Payment Method
          </button>
        </form>

        {/* List of Payment Methods */}
        <ul>
          {paymentMethods.map((method, index) => (
            <li
              key={method.id}
              className="flex justify-between items-center mb-3 p-3 border border-gray-200 rounded-md shadow-sm"
            >
              <div>
                <strong>{method.name}</strong>: {method.details}
              </div>
              <div>
                <button
                  onClick={() => handleEditPayment(index)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePayment(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentsOptions;
