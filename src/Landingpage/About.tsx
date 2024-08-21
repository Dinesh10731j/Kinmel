import { NavLink } from "react-router-dom";
import ShoppingImage from "../assets/Side Image.png";
import {StoreIcon,DollarSignIcon,ShoppingBagIcon,BadgeCentIcon,Headphones,Package,ShieldCheck} from "lucide-react";
import Founder from "../assets/Frame 874.png";
import ManagingDirector from "../assets/Frame 875.png";
import ProductDesigner from "../assets/Frame 876.png";

const About = () => {
  return (
    <>
      <section className="flex gap-2 px-3 py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black font-bold" : "text-gray-500"
          }
        >
          Home
        </NavLink>
        <span> /</span>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-black font-medium" : "text-gray-500"
          }
        >
          About
        </NavLink>
      </section>

      <section className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8 px-3 py-2">
        <section className="w-full md:w-1/2">
          <h1 className="text-xl md:text-4xl font-medium">Our Story</h1>
          <p className="mt-2 text-sm md:text-base font-medium text-left md:text-justify leading-relaxed">
            In 2015, a group of visionary entrepreneurs came together with a
            shared dream—to revolutionize the way people shop in South Asia.
            They envisioned a platform that would connect buyers and sellers
            across the region, making shopping convenient, accessible, and
            enjoyable for everyone. With this vision in mind, KinMel was born.
            From its humble beginnings, KinMel quickly gained popularity by
            focusing on customer satisfaction and building trust within the
            community. The platform's commitment to delivering quality products,
            reliable services, and an exceptional shopping experience resonated
            with people. By the end of its first year, KinMel had already
            established itself as a trusted name in e-commerce. As the years
            passed, KinMel's reputation continued to grow, attracting more
            sellers and customers. By 2020, the platform had become the go-to
            destination for online shopping in South Asia, offering an extensive
            range of products from electronics to fashion, home goods to
            groceries. Today, KinMel stands tall as the largest e-commerce
            website in South Asia, boasting an impressive network of over 10,500
            sellers and 300 renowned brands. With a customer base of 3 million
            strong, KinMel has become synonymous with trust, quality, and
            reliability in the region. The success of KinMel can be attributed
            to its unwavering commitment to innovation, customer satisfaction,
            and community building. The platform has not only transformed the
            shopping experience for millions but has also empowered thousands of
            sellers to reach new heights. As KinMel continues to evolve, its
            mission remains clear: to be the No. 1 e-commerce platform in South
            Asia, delivering exceptional value to customers and sellers alike.
            The journey that began in 2015 is far from over—KinMel is set to
            redefine the future of e-commerce in the region, one satisfied
            customer at a time.
          </p>
        </section>
        <section className="w-full md:w-1/2">
          <img
            src={ShoppingImage}
            alt="side_shopping_image"
            className="w-full h-auto object-cover"
          />
        </section>
      </section>

      <section className="flex flex-col md:flex-row gap-7 justify-center items-center mt-10 pb-4">
  {[StoreIcon, DollarSignIcon, ShoppingBagIcon,BadgeCentIcon]?.map((Icon: any, index: number) => (
    <section key={index} className="text-center py-10 px-4 ">
      <Icon className="w-12 h-12 text-white bg-black p-2 rounded-full mx-auto mb-2" />
      {Icon === StoreIcon && <h1 className="text-sm md:text-base lg:text-lg font-semibold">10.5K Active Sellers</h1>}
      {Icon === DollarSignIcon && <h1 className="text-sm md:text-base lg:text-lg font-semibold">33K Monthly Product Sale</h1>}
      {Icon === ShoppingBagIcon && <h1 className="text-sm md:text-base lg:text-lg font-semibold">45.5K Active Customers</h1>}
      {Icon === BadgeCentIcon && <h1 className="text-sm md:text-base lg:text-lg font-semibold">25K Annual Gross Sales</h1>}
    </section>
  ))}
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <section>
        <img src={Founder} alt="Founder" className="w-full h-auto object-cover" />
        <h1 className="font-medium text-2xl md:text-4xl py-3 text-center">Tom Cruise</h1>
        <p className="font-medium  text-center">Founder & Chairman</p>
      </section>
      <section>
        <img src={ManagingDirector} alt="Managing Director" className="w-full h-auto object-cover" />
        <h1 className="font-medium text-2xl md:text-4xl py-3 text-center">Emma Watson</h1>
        <p className="font-medium text-center">Managing Director</p>
      </section>
      <section>
        <img src={ProductDesigner} alt="Product Designer" className="w-full h-auto object-cover" />
        <h1 className="font-medium text-xl md:text-2xl py-3 text-center">Will Smith</h1>
        <p className="font-medium text-center ">Product Designer</p>
      </section>
    </section>
    <section className="flex flex-col md:flex-row gap-7 justify-center items-center mt-10 pb-4">
  {[Headphones, Package, ShieldCheck]?.map((Icon: any, index: number) => (
    <section key={index} className="text-center py-10 px-4">
      <Icon className="w-12 h-12 text-white bg-black p-2 rounded-full mx-auto mb-2" />
      {Icon === Headphones && <h1 className="text-sm md:text-base lg:text-lg font-semibold">FREE AND FAST DELIVERY</h1>}
      {Icon === Package && <h1 className="text-sm md:text-base lg:text-lg font-semibold">24/7 CUSTOMER SERVICE</h1>}
      {Icon === ShieldCheck && <h1 className="text-sm md:text-base lg:text-lg font-semibold">MONEY BACK GUARANTEE</h1>}
    </section>
  ))}
</section>





    </>
  );
};

export default About;
