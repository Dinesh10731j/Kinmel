import { NavLink } from "react-router-dom";
import ShoppingImage from "../assets/Side Image.png";
import {
  StoreIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  BadgeCentIcon,
  Headphones,
  Package,
  ShieldCheck,
} from "lucide-react";
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
        <span className="px-2"> /</span>
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
        <section className="w-full md:w-1/2 md:mt-20 px-20">
          <h1 className="text-xl md:text-4xl font-medium">Our Story</h1>
          <p className="mt-2 text-sm md:text-base font-light text-left md:text-justify leading-relaxed py-7">
            In 2015, a group of entrepreneurs united to revolutionize shopping
            in South Asia, giving birth to KinMel. Their vision was simple: make
            shopping convenient, accessible, and enjoyable. KinMel quickly
            earned trust by focusing on quality, reliability, and customer
            satisfaction. 
            </p>
            <p className="py-7">
            By 2020, KinMel had become South Asia's go-to online
            shopping platform, offering everything from electronics to
            groceries. Today, with 10,500 sellers, 300 brands, and 3 million
            customers, KinMel stands as the region's largest e-commerce
            platform. Their mission remains clear: to be South Asia's No. 1
            e-commerce platform, delivering value and transforming the shopping
            experience for all.
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
        {[StoreIcon, DollarSignIcon, ShoppingBagIcon, BadgeCentIcon]?.map(
          (Icon: any, index: number) => (
            <section key={index} className="text-center py-10 px-4 ">
              <Icon className="w-12 h-12 text-white bg-black p-2 rounded-full mx-auto mb-2" />
              {Icon === StoreIcon && (
                <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                  10.5K Active Sellers
                </h1>
              )}
              {Icon === DollarSignIcon && (
                <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                  33K Monthly Product Sale
                </h1>
              )}
              {Icon === ShoppingBagIcon && (
                <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                  45.5K Active Customers
                </h1>
              )}
              {Icon === BadgeCentIcon && (
                <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                  25K Annual Gross Sales
                </h1>
              )}
            </section>
          )
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <section>
          <img
            src={Founder}
            alt="Founder"
            className="w-full h-auto object-cover"
          />
          <h1 className="font-medium text-2xl md:text-4xl py-3 text-center">
            Tom Cruise
          </h1>
          <p className="font-medium  text-center">Founder & Chairman</p>
        </section>
        <section>
          <img
            src={ManagingDirector}
            alt="Managing Director"
            className="w-full h-auto object-cover"
          />
          <h1 className="font-medium text-2xl md:text-4xl py-3 text-center">
            Emma Watson
          </h1>
          <p className="font-medium text-center">Managing Director</p>
        </section>
        <section>
          <img
            src={ProductDesigner}
            alt="Product Designer"
            className="w-full h-auto object-cover"
          />
          <h1 className="font-medium text-xl md:text-2xl py-3 text-center">
            Will Smith
          </h1>
          <p className="font-medium text-center ">Product Designer</p>
        </section>
      </section>
      <section className="flex flex-col md:flex-row gap-7 justify-center items-center mt-10 pb-4">
        {[Headphones, Package, ShieldCheck]?.map((Icon: any, index: number) => (
          <section key={index} className="text-center py-10 px-4">
            <Icon className="w-12 h-12 text-white bg-black p-2 rounded-full mx-auto mb-2" />
            {Icon === Headphones && (
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                FREE AND FAST DELIVERY
              </h1>
            )}
            {Icon === Package && (
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                24/7 CUSTOMER SERVICE
              </h1>
            )}
            {Icon === ShieldCheck && (
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                MONEY BACK GUARANTEE
              </h1>
            )}
          </section>
        ))}
      </section>
    </>
  );
};

export default About;
