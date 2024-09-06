import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  productName: string;
  price: number;
  stock: number;
  description: string;
}

const AddNewProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    // Handle form submission, probably make an API call to add the product
    console.log('Product added:', data);
    // Reset the form fields
    reset();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
            {...register('productName', { required: 'Product name is required' })}
          />
          {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 1, message: 'Price must be greater than 0' },
            })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock quantity"
            {...register('stock', {
              required: 'Stock quantity is required',
              min: { value: 1, message: 'Stock must be at least 1' },
            })}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' },
            })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#DB4444] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
