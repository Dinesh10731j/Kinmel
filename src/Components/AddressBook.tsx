
import { useForm, SubmitHandler } from 'react-hook-form';
import { UseUserAddressBook } from '../hooks/Useaddressbook';
import { UseGetAddressBook } from '../hooks/Usegetaddressbook';
import { Toaster } from 'react-hot-toast';
import { Edit,Trash2 } from 'lucide-react';
import { CircularProgress } from '@mui/material';
interface Address {
  _id:string
  name: string;
  address: string;
}

interface FormValues {
  name: string;
  address: string;
  userId:string
}

const AddressBook: React.FC = () => {

  const mutation = UseUserAddressBook();

  const {data:addressbook,isLoading} = UseGetAddressBook(); 

 


  const {handleSubmit, reset,formState:{errors},register} = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
   
    reset();
  };

  const handleEdit = (index: string) => {
    console.log(index);
   
  };

  const handleDelete = (index: string) => {
  console.log(index)
  };

  return (
    <div className="min-w-96 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Address Book</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
        
              <input
               
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
                {...register('name',{required:'Name is required'})}
              />
              {errors.name?.message && <p className='text-red-500 text-sm'>{errors?.name.message}</p>}
           
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
         
              <input
             
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter address"
                {...register('address',{required:'Address is required'})}
              />

              {errors.name?.message && <p className='text-red-500 text-sm'>{errors?.address?.message}</p>}
           
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 mb-4 bg-[#DB4444] text-white font-semibold rounded-md hover:bg-[#df5353] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
         Add
        </button>
      </form>

      {
addressbook?.length < 0 ?(
  <h1>Addressbook not found...</h1>
):isLoading?(
  <CircularProgress size={24} sx={{color:'black'}}/>
):(
  <ul className="mt-6 space-y-4 mb-3">
  {addressbook?.map((addr:Address, index:number) => (
    <li
      key={index}
      className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div>
        <strong className="text-lg text-gray-800">{addr?.name}</strong>
        <p className="text-sm text-gray-600">{addr?.address}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => handleEdit(addr?._id)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <Edit/>
        </button>
        <button
          onClick={() => handleDelete(addr?._id)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2/>
        </button>
      </div>
    </li>
  ))}
</ul>
)

      }

     
      <Toaster position='top-center'/>
    </div>
  );
};

export default AddressBook;
