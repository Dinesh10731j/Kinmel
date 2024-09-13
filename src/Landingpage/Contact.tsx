import { NavLink } from "react-router-dom";
import { PhoneCall, Mail } from "lucide-react";
import { useForm } from "react-hook-form";


interface contactDataType{
  name:string,
  email:string,
  phone:string,
  message:string
}

const Contact = () => {

  const {register,handleSubmit,formState:{errors}} = useForm<contactDataType>();


  const onsubmit = (data:contactDataType)=>{

    console.log(data);

  }
  return (
    <section className="flex flex-col gap-20 px-3 py-2">
      {/* Breadcrumb Navigation */}
      <section className="flex gap-2 text-sm">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-black font-bold" : "text-gray-500"
          }
        >
          Home
        </NavLink>
        <span> /</span>
        <NavLink
          to="/contact"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-black font-bold" : "text-gray-500"
          }
        >
          Contact
        </NavLink>
      </section>

      {/* Contact Information and Form */}
      <section className="flex flex-col md:flex-row gap-10 mt-4">
        {/* Contact Information */}
        <section className="flex-1 flex flex-col gap-4 items-center justify-center ">
          <section className="flex items-center gap-4">
            <section className="bg-[#DB4444] text-white h-10 w-10 rounded-full flex items-center justify-center gap-7">
              <PhoneCall className="w-5 h-5" />
            </section>
            <h1 className="font-medium text-lg">Call To Us</h1>
          </section>
          <p className="text-gray-600 text-sm md:text-xl">We are available 24/7, 7 days a week</p>
          <p className="text-black text-sm md:text-xl">Phone: +8801611112222</p>
          <section className="flex items-center gap-4">
            <section className="bg-[#DB4444] text-white h-10 w-10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </section>
            <h1 className="font-medium text-lg">Write To Us</h1>
          </section>
          <p className="text-gray-600 px-14">Fill out the form and we will contact you within 24 hours</p>
          <p className="text-black">Emails:customer@kinmel.com</p>
          <p>Emails:support@kinmel.com</p>

        </section>

        {/* Form Section */}
        <section className="flex-1">
          <h2 className="font-medium text-lg mb-4">Contact Form</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-2 rounded-md"
              {...register('name',{required:'Username is required'})}
            />

            {errors.message && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-2 rounded-md"
              {...register('email',{required:'E-mail is required'})}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
            <input
              type="text"
              placeholder="Your Phone"
              className="border border-gray-300 p-2 rounded-md"
              {...register('phone',{required:'Phone is required'})}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.phone?.message}</p>}
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 p-2 rounded-md h-32"
              {...register('message',{required:'Message is required'})}
            />
           {errors.message && <p className="text-red-500 text-sm">{errors.message?.message}</p>}
            <button
              type="submit"
              className="bg-[#DB4444] text-white py-2 px-4 rounded-md"
            >
              Send Message
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Contact;
