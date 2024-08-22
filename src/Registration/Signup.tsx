import Login_Image from "../assets/Side Image.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
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
        <section className="md:w-1/2 w-full flex flex-col justify-center items-center  p-6  rounded-lg mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
          {/* Add your form fields here */}
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="bg-[#DB4444] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>

            <h1 className="px-2 py-3">Already have an account ?<Link to={'/login'} className="px-2 border-b-2">Login</Link> </h1>
          </form>
        </section>
      </section>
    </>
  );
};

export default Signup;
