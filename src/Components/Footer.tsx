import { SendHorizontal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseUserSubscribe } from "../hooks/Usesubscribe";

interface SubscribeType {
  email: string;
}

const Footer = () => {
  const subscription = UseUserSubscribe();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SubscribeType>();

  const onSubscribe: SubmitHandler<SubscribeType> = (data) => {
    subscription.mutate(data);
    reset();
  };

  return (
    <footer className="bg-black text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl">KinMel</h1>
          <h3>Subscribe</h3>
          <p>Get 10% off</p>
          <form className="relative flex gap-2" onSubmit={handleSubmit(onSubscribe)}>
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2 w-full px-3 rounded-md border border-gray-300 text-black"
              {...register('email', { required: 'E-mail is required' })}
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

        <section className="flex flex-col gap-2">
          <h1 className="text-2xl">Support</h1>
          <h3>123 Street, Kathmandu, Nepal</h3>
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
          <h1 className="text-2xl">Quick Links</h1>
          <h3>Privacy Policy</h3>
          <h3>Terms of Use</h3>
          <h3>FAQ</h3>
          <h3>Contact</h3>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
