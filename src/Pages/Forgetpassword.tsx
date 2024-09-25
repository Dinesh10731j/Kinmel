import React from 'react';
import { useForm,SubmitHandler } from 'react-hook-form';
import { UseForgotPassword } from '../hooks/Useforgotpassword';
import { CircularProgress } from '@mui/material';
import { Toaster } from 'react-hot-toast';

interface FormInputs {
  email: string;
}

const ForgetPassword: React.FC = () => {
    const forgotPassword = UseForgotPassword();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();


  const onSubmit:SubmitHandler<FormInputs> = (data) => {
    forgotPassword.mutate(data);
   
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-screen max-w-sm">
        <h2 className="text-2xl font-md mb-4">Forgot Password?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email address' } })}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-2 text-red-600">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#DB4444] text-white font-semibold py-2 rounded hover:bg-red-700 transition duration-200"
          >
           {forgotPassword.isPending?<CircularProgress size={24} sx={{color:'black'}}/>:'Send Reset Link'}
          </button>
        </form>
     
      </div>
      <Toaster position='top-center'/>
    </div>
  );
};

export default ForgetPassword;
