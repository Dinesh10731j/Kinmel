// import { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { UsePaymentOption } from "../hooks/Usepaymentoption";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { UseGetPaymentOption } from "../hooks/Usegetpaymentoption";


interface FormValues {
  name: string;
  details: string;
}

const PaymentsOptions = () => {

  const mutation = UsePaymentOption();
  const {data:getPaymentOption,isLoading} = UseGetPaymentOption();
  //const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

 

  const {register, handleSubmit, reset, formState:{errors} } = useForm<FormValues>({
    defaultValues: {
      name: "",
      details: "",
    },
  });

  // Handle form submission for payment methods
  const onSubmitPayment: SubmitHandler<FormValues> = (data) => {
  mutation.mutate(data);
    reset();
    
    }
    
 

  // Handle editing a payment method
  const handleEditPayment = (index: number) => {
    console.log(index);
  };

  // Handle deleting a payment method
  const handleDeletePayment = (index: number) => {
  console.log(index);
   
    }
 

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
            className=" w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#DB4444]  focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
    {mutation?.isPending?<CircularProgress size={24} sx={{color:'black'}}/>:'Add'}
          </button>
        </form>

        {/* List of Payment Methods  */}
        {isLoading?<CircularProgress size={24}/>:(
          <ul>


          {getPaymentOption?.map((PaymentsOption:any, index:number) => (
           <li
             key={PaymentsOption?._id}
             className="flex justify-between items-center mb-3 p-3 border border-gray-200 rounded-md shadow-sm"
           >
             <div>
               <strong>{PaymentsOption?.name}</strong>: {PaymentsOption?.details}
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

)}
       
      </div>
      <Toaster position="top-center"/>
    </div>
  );
}

export default PaymentsOptions;
