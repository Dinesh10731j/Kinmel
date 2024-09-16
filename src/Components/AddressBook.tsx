import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UseUserAddressBook } from '../hooks/Useaddressbook';
import { UseGetAddressBook } from '../hooks/Usegetaddressbook';
import { Toaster } from 'react-hot-toast';
interface Address {
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

  const {data:addressbook} = UseGetAddressBook();

 

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {handleSubmit, reset, setValue,formState:{errors},register } = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
    if (editingIndex !== null) {
      
      const updatedAddresses = addressbook?.map((addr: any, idx: number) =>
        idx === editingIndex ? data : addr
      );
      setAddresses(updatedAddresses);
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, data]);
    }
    reset();
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setValue('name', addresses[index].name);
    setValue('address', addresses[index].address);
  };

  const handleDelete = (index: number) => {
    setAddresses(addresses.filter((_, idx) => idx !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      reset();
    }
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
          {editingIndex !== null ? 'Update' : 'Add'} Address
        </button>
      </form>

      <ul className="mt-6 space-y-4 mb-3">
        {addresses.map((addr, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md"
          >
            <div>
              <strong className="text-lg text-gray-800">{addr.name}</strong>
              <p className="text-sm text-gray-600">{addr.address}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Toaster position='top-center'/>
    </div>
  );
};

export default AddressBook;
