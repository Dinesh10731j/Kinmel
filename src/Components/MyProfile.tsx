import { useForm } from "react-hook-form";
import { UseUserDetails } from "../hooks/Useuserdetails";
import { useNavigate } from "react-router-dom";


interface MyprofileType {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const MyProfile = () => {

  const navigate = useNavigate();


  const {data:userdetails} =  UseUserDetails();


  const { register, handleSubmit, watch, formState: { errors } } = useForm<MyprofileType>({
    defaultValues:{
      fullName:userdetails?.name,
      email:userdetails?.email,
      
    }
  });

  const onSubmit = (data: MyprofileType) => {

    console.log(data);
  
  };

  const handleCancel = () => {
  
navigate("/account");
  };

  return (
    <section className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="firstName"
            {...register("fullName", { required: "Full name is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            type="text"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

       

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            {...register("email", { 
              required: "Email is required", 
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            id="currentPassword"
            {...register("currentPassword", { required: "Current password is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            type="password"
          />
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="newPassword"
            {...register("newPassword", { required: "New password is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            type="password"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch('newPassword') || "Passwords do not match"
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            type="password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={handleCancel} 
            className="w-full md:w-48 p-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full md:w-48 bg-[#DB4444] text-white p-2 rounded-md"
          >
            Save Changes
          </button>
        
        </div>
      </form>
    </section>
  );
}

export default MyProfile;
