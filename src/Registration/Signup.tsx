
import Login_Image from "../assets/Side Image.png";
import { Link } from "react-router-dom";
import { UserUserSignup } from "../hooks/Useusersignup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster,toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";





interface SignupDetails {
  email: string;
  password: string;
  confirmpassword: string;
}

const Signup = () => {
  // Initialize react-hook-form
  const { register, handleSubmit,reset, formState: { errors } } = useForm<SignupDetails>();
  
  
  const mutation = UserUserSignup();

  // Handle form submission
  const onSubmit: SubmitHandler<SignupDetails> =  (data) => {
    try {
       mutation.mutate(data);
     toast.success("Signup successful!");
    } catch{
     toast.error("Signup failed!");
    }

   reset();
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center min-h-screen p-4">
      {/* Image Section */}
      <section className="md:w-1/2 w-full flex justify-center">
        <img
          src={Login_Image}
          alt="Signup"
          className="max-w-full h-auto object-cover"
        />
      </section>

      {/* Form Section */}
      <section className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 rounded-lg mt-6 md:mt-0">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm  mt-2  italic">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm  mt-2  italic">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              {...register("confirmpassword", { required: "Please confirm your password" })}
            />
            {errors.confirmpassword && <p className="text-red-500 text-sm  mt-2 italic">{errors.confirmpassword.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#DB4444] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
        {mutation.isPending?<CircularProgress size={24} color="primary"/>:'Signup'}
          </button>

          <h1 className="px-2 py-3">
            Already have an account?{" "}
            <Link to="/auth/login" className="px-2 border-b-2">
              Login
            </Link>
          </h1>
        </form>
        <Toaster position="top-center"/>
      </section>


   

    </section>
  );
};

export default Signup;
