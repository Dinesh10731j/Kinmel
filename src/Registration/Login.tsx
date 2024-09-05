import Login_Image from "../assets/Side Image.png";
import { Link } from "react-router-dom";
import { UseUserLogin } from "../hooks/Useuserlogin";
import {useForm,SubmitHandler} from "react-hook-form";
import {Toaster} from "react-hot-toast";
import { CircularProgress } from "@mui/material";

interface UserLoginFormType{
  email:string,
  password:string,
}

const Login = () => {
  const mutation = UseUserLogin();

  const {handleSubmit,register,reset,formState:{errors}} = useForm<UserLoginFormType>();


  const OnLogin:SubmitHandler<UserLoginFormType> = (data)=>{

    mutation.mutate(data);
    reset();

  }

  

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-center min-h-screen p-4">
        {/* Image Section */}
        <section className="md:w-1/2 w-full flex justify-center">
          <img
            src={Login_Image}
            alt="Login"
            className="max-w-full h-auto object-cover"
          />
        </section>

        {/* Form Section */}
        <section className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 rounded-lg mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
          {/* Form fields */}
          <form className="w-full max-w-sm" onSubmit={handleSubmit(OnLogin)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                {...register('email',{required:'Email is required'})}
              />
              {errors.email && <p className="text-red-500 text-sm  mt-2  italic">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                {...register('password',{required:'Password is required'})}
              />
            {errors.password && <p className="text-red-500 text-sm  mt-2  italic">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-[#DB4444] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
             {mutation?.isPending?<CircularProgress size={24} color="primary"/>:'Login'}
            </button>

            <h1 className="px-2 py-3">
              Don't have an account? 
              <Link to={'/auth/signup'} className="px-2 border-b-2">
                Sign Up
              </Link>
            </h1>
          </form>
        </section>
        <Toaster position="top-center"/>
      </section>
    </>
  );
};

export default Login;
