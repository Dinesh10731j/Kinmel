
import { SendHorizontal} from "lucide-react";
import { useForm,SubmitHandler } from "react-hook-form";

interface subscribeType{
 email:string;

}
const Footer = () => {


  const {handleSubmit,register,formState:{errors}} = useForm<subscribeType>();


  const onSubscribe:SubmitHandler<subscribeType> = (data)=>{
    console.log(data);

  }
  return (
   <>
  <footer className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-black text-[#FFFF] h-full w-full">
  <section className="flex flex-col gap-2">
  <h1  className="text-2xl">KinMel</h1>
  <h3>Subscribe</h3>
  <p>Get 10% off </p>
  <form className="relative flex gap-2" onSubmit={handleSubmit(onSubscribe)}>
  <input
    type="email"
    placeholder="Enter your email"
    className="py-2 w-full px-3 rounded-md border border-gray-300 text-black"
    {...register('email',{required:'E-mail is required'})}
  />
  
  <button
    type="submit"
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-md"
  >
    <SendHorizontal />
  </button>
  
</form>
{errors.email && <p className="text-red-700 text-sm">{errors.email?.message}</p>}
  </section>
  <section className="flex flex-col gap-2" >
   <h1 className="text-2xl">Support</h1>
   <h3>123 street Kathmandu,Nepal</h3>
   <h3>Kinmel@gmail.com</h3>
   <h3>9876654735</h3>
  </section>
  <section className="flex flex-col gap-2">
   <h1 className="text-2xl">Account</h1>
   <h3>My Account</h3>
   <h3>Login/Register</h3>
   <h3>Cart</h3>
   <h3>Wishlist</h3>
   <h3>Shop</h3>
  </section>
  <section className="flex flex-col gap-2">
   <h1 className="text-2xl">Quick Link</h1>
   <h3>Privacy Policy</h3>
   <h3>Term Of Use</h3>
   <h3>FAQ</h3>
   <h3>Content</h3>
  </section>
 
</footer>

   </>
  )
}

export default Footer