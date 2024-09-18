import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UseUserAddressBook } from '../hooks/Useaddressbook';
import { UseGetAddressBook } from '../hooks/Usegetaddressbook';
import { Toaster } from 'react-hot-toast';
import { Edit, Trash2 } from 'lucide-react';
import { CircularProgress } from '@mui/material';
import { UseDeleteAddressBook } from '../hooks/Usedeleteaddressbook';
import { UseEditAddressBook } from '../hooks/Useeditaddressbook';

interface Address {
  _id: string;
  name: string;
  address: string;
  addressBookId: string;
  
}

interface FormValues {
  name: string;
  address: string;
  addressBookId: string;
}

const AddressBook: React.FC = () => {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null); // State for editing
  const mutation = UseUserAddressBook();
  const deleteAddressBook = UseDeleteAddressBook();
  const editAddressBook = UseEditAddressBook();
  const { data: addressbook, isLoading,isError } = UseGetAddressBook();

  const { handleSubmit, reset, formState: { errors }, register, setValue } = useForm<FormValues>({
    defaultValues: {
      name: '',
      address: '',
      addressBookId:''
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (editingAddress) {
editAddressBook.mutate(data);
    } else {
      mutation.mutate(data);
    }
    reset();
    setEditingAddress(null);
  };

  const handleEdit = (data: Address) => {
    setEditingAddress(data);
    setValue('name', data.name);
    setValue('address', data.address);
    setValue('addressBookId',data._id)
  };

  const handleDelete = (id: string) => {
   deleteAddressBook.mutate(id);
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
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name?.message && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address?.message && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 mb-4 bg-[#DB4444] text-white font-semibold rounded-md hover:bg-[#df5353] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {editingAddress ? 'Update' : 'Add'}
        </button>
      </form>

      {isLoading ? (
        <CircularProgress size={24} sx={{ color: 'black' }} />
      ): isError?(<h2>Error fetching user addressbook</h2>):addressbook?.length === 0 ? (
        <h1>Addressbook not found...</h1>
      ) : (
        <ul className="mt-6 space-y-4 mb-3">
          {addressbook?.map((addr: Address) => (
            <li
              key={addr._id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md"
            >
              <div>
                <strong className="text-lg text-gray-800">{addr?.name}</strong>
                <p className="text-sm text-gray-600">{addr?.address}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default AddressBook;
