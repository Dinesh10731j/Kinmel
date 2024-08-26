import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Category, BrowserByCategory } from "../Utils/category";
import { UseGetProductsImages } from "../hooks/Usegetproductsimage";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import NewJblSpeaker from "../assets/JBL_BOOMBOX.png";
import PlayStation from "../assets/PS5.png";
import WomenWithHat from "../assets/Attractive-woman.png";
import Speakers from "../assets/Speaker.png";
import Perfume from "../assets/Perfume.png"
import {
  Heart,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
  Headphones,
ShieldCheck,
} from "lucide-react";

const Home = () => {
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data: products } = UseGetProductsImages();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <button
        onClick={() => scrollPrev()}
        className="flex items-center justify-center"
      >
        <ChevronLeft className="text-gray-600 h-8 w-8" />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <button
        onClick={() => scrollNext()}
        className="flex items-center justify-center"
      >
        <ChevronRight className="text-gray-600 h-8 w-8" />
      </button>
    );
  };

  const renderStars = (rating: any) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`text-yellow-400 ${
            i < Math.floor(rating) ? "fill-current" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  const convertPriceToNRS = (price: any) => {
    const conversionRate = 130;
    return (price * conversionRate).toFixed(2);
  };

  return (
    <>
      {/* Category and Slider Section */}
      <section className="flex flex-col md:flex-row gap-6  justify-between py-10 px-7">
        <section className="md:w-1/3 shadow-md">
          {Category?.map((categories) => (
            <h1 key={categories?.category} className="text-xl py-3 px-3">
              {categories?.category}
            </h1>
          ))}
        </section>

        <section className="md:w-2/3  ">
          <Slider {...settings} className="cursor-pointer ">
            {products?.slice(0, 7)?.map((items: any, index: number) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={items?.image}
                  alt={`Product ${index}`}
                  className="max-w-full max-h-[500px] h-auto object-contain"
                />
              </div>
            ))}
          </Slider>
        </section>
      </section>

      {/* Flash Sales Section */}
      <section className="before:border-l-8 px-5 before:bg-[#DB4444]">
        <h1 className="text-[#DB4444] text-2xl font-medium">Today's</h1>
      </section>

      <section className="flex px-5 gap-10 justify-evenly items-center py-5">
        <section>
          <h1 className="text-xl md:text-4xl font-medium">Flash Sales</h1>
        </section>
        <section>
          <div className="flex items-center gap-2 text-xl md:text-3xl font-bold rounded-lg">
            <div className="text-center">
              <div className="text-sm">Days</div>
              <div className="text-5xl">{timeLeft.days}</div>
            </div>
            <div className="text-[#DB4444]">:</div>
            <div className="text-center">
              <div className="text-sm">Hours</div>
              <div className="text-5xl">{timeLeft.hours}</div>
            </div>
            <div className="text-[#DB4444]">:</div>
            <div className="text-center">
              <div className="text-sm">Minutes</div>
              <div className="text-5xl">{timeLeft.minutes}</div>
            </div>
            <div className="text-[#DB4444]">:</div>
            <div className="text-center">
              <div className="text-sm">Seconds</div>
              <div className="text-5xl">{timeLeft.seconds}</div>
            </div>
          </div>
        </section>
      </section>

      {/* Product Scrolling Section */}
      <section className="px-5 py-2 pb-4 mt-10 custom-scrollbar overflow-x-scroll">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} itemClassName="pb-4">
          {products?.slice(0, 5).map((product: any, index: number) => (
            <div
              key={index}
              className="mx-2 shadow-md rounded-lg flex flex-col h-[450px] w-[300px]"
            >
              <img
                src={product.image}
                alt={`Product ${index}`}
                className="w-full h-48 object-contain rounded-t-lg"
              />
              <div className="flex justify-between items-center p-4">
                <button className="text-[#DB4444] hover:text-red-600">
                  <Heart/>
                </button>
                <button className="text-[#DB4444] hover:text-red-600">
                  <Eye />
                </button>
                <button className="bg-[#DB4444] text-white px-4 py-2 rounded-lg hover:bg-[#b73333] flex items-center gap-2">
                  <ShoppingCart />
                  Add to Cart
                </button>
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-medium">{product.title}</h2>
                <div className="flex items-center gap-1">
                  {renderStars(product?.rating?.rate)}
                </div>
                <p className="text-lg font-bold mt-2">
                  रू {convertPriceToNRS(product?.price)}
                </p>
              </div>
            </div>
          ))}
        </ScrollMenu>
      </section>

      <section className="flex justify-center items-center px-3 py-2">
        <button className="px-7 py-2 md:px-12 text-white md:py-3 bg-[#DB4444] rounded-md">
          View All Products
        </button>
      </section>

      {/* This Month Section */}
      <section className="before:border-l-8 px-3 py-3">
        <h1 className="text-[#DB4444] text-2xl">Categories</h1>
      </section>

      {/* Browser By Category Section */}
      <section className="px-4 py-5">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} itemClassName="pb-4">
          {BrowserByCategory?.map((categories, index) => (
            <section
              key={index}
              className="hover:text-[#FFFF] cursor-pointer hover:bg-[#DB4444] transition-all delay-100 h-[270px] w-[270px] bg-white rounded-lg shadow-md flex flex-col items-center justify-center mx-2"
            >
              <categories.icon className="text-3xl hover:text-[#FFFF] h-32 w-32 text-[#DB4444]" />
              <h2 className="text-xl font-medium mt-4 ">{categories?.name}</h2>
            </section>
          ))}
        </ScrollMenu>
      </section>

      <section className="py-2 px-3 before:border-l-8">
        <h1 className="text-2xl text-[#DB4444]">This Month</h1>
      </section>

      <section className="flex justify-between">
        <section className="px-3 py-2">
          <h1 className="text-2xl md:text-4xl font-medium">
            Best Selling Products
          </h1>
        </section>
        <section className="px-3 py-2">
          <button className="py-1 px-4 md:py-3 md:px-10 bg-[#DB4444] text-[#FFFF] rounded-md">
            View All
          </button>
        </section>
      </section>

      <section className="flex flex-wrap gap-7 justify-center px-3 py-2">
        {products?.slice(5, 9)?.map((bestSelling: any, index: number) => (
          <section
            key={index}
            className="relative w-[350px] h-[480px]  bg-[#FFFFFF] shadow-md px-7 py-2 rounded-lg flex flex-col items-center overflow-hidden"
          >
            <img
              src={bestSelling?.image}
              alt={`Best Selling ${index}`}
              className="object-contain w-full h-3/4"
            />
            <section className="flex flex-col gap-6 absolute top-2 right-0 px-3 py-1">
              <button className="text-gray-600 ">
                <Heart />
              </button>
              <button className="text-gray-600">
                <Eye />
              </button>
            </section>
            <section className="px-3 py-2 flex flex-col gap-1">
              <h1 className="font-medium">{bestSelling?.title}</h1>
              <h1>रू {convertPriceToNRS(bestSelling?.price)}</h1>
              <div className="flex  gap-1">
                {renderStars(bestSelling?.rating?.rate)}
              </div>
            </section>
          </section>
        ))}
      </section>


      <section className="flex mt-10 flex-col md:flex-row gap-8 md:gap-12 ml-2 px-3 py-7 bg-black mb-4 rounded-md items-center md:items-start">
  <section className="text-center md:text-left">
    <h1 className="text-green-400 text-2xl px-2 py-4">Categories</h1>
    <h1 className="text-white text-3xl md:text-7xl px-2 py-4">Enhance Your Music Experience</h1>
    <button className="bg-green-400 py-3 md:py-4 px-8 md:px-12 font-medium text-white mt-5 rounded-md">Buy Now</button>
  </section>

  <section className="flex flex-col items-center md:items-end">
    <img src={NewJblSpeaker} alt="jbl-speaker" className="w-64 md:w-80"/>

    <section className="flex gap-4 mt-6">
      {["Hours", "Days", "Minutes", "Seconds"].map((label, index) => (
        <section key={index} className="flex flex-col gap-2 bg-white h-20 w-20 md:h-24 md:w-24 text-center rounded-full">
          <section className="mt-2">
            <h1 className="text-xl md:text-2xl font-medium">
              {["23", "05", "59", "35"][index]}
            </h1>
          </section>
          <section>
            <h1 className="text-sm md:text-base">{label}</h1>
          </section>
        </section>
      ))}
    </section>
  </section>
</section>
<section className="px-3 py-2 before:border-l-8">
  <h1 className="text-2xl text-[#DB4444]">Our Products</h1>
</section>
<section className="py-2 px-3 ">
  <h1 className="text-2xl md:text-4xl font-medium">Explore Our Products</h1>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 mt-10">
  {products?.slice(12, 20)?.map((ourproducts: any) => (
    <div key={ourproducts.id} className="relative border rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <img src={ourproducts?.image} alt={ourproducts?.title} className="w-48 h-48 object-fit px-3 ml-24 py-2 md:5" />

      {/* Icons on the right */}
      <section className="flex flex-col absolute top-3 right-4 gap-2">
        <button className="text-gray-600 hover:text-gray-800">
          <Eye className="w-6 h-6" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Heart className="w-6 h-6" />
        </button>
      </section>

      {/* Title Section */}
      <h1 className="text-md font-semibold p-4 text-center truncate">{ourproducts?.title}</h1>
      <h1 className="px-3 py-2 font-medium">रू {convertPriceToNRS(ourproducts?.price)}</h1>
      <h1 className="flex pb-2 px-2">{renderStars(ourproducts?.rating?.rate)}</h1>
    </div>
  ))}
</section>

<section className="py-2 mt-5 px-3 flex flex-col items-center justify-center">
 <button className="py-2 px-7 md:py-2 md:px-12 bg-[#DB4444] rounded-md text-[#FFFFFF]">View All Products</button> 
  </section>
{/* Featured Section */}

  <section className="before:border-l-8 px-3 py-2">
    <h1 className=" text-xl md:text-3xl text-[#DB4444]">Featured</h1>
  </section>
  <section  className="px-3 py-2">
    <h1 className="text-xl md:text-4xl font-medium">New Arrival</h1>
  </section>
  <section className="flex flex-col md:flex-row gap-7 p-3">
  <section className="bg-black rounded-md pb-1 flex-1">
    <img src={PlayStation} alt="playstore_image" className="w-full rounded-t-md" />
    <div className="p-3">
      <h1 className="text-xl md:text-4xl font-medium text-white">Play Station 5</h1>
      <h3 className="text-sm md:text-base text-white mt-2">Black and White Version of the PS5 coming out of Sale.</h3>
      <button className="border-b-2 border-white text-lg md:text-xl text-white mt-4">Shop Now</button>
    </div>
  </section>

  <section className="grid grid-cols-1 md:grid-cols-2 gap-7 flex-1">
    <section className="">
      <img src={WomenWithHat} alt="woman_with_hat" className="w-full h-full object-cover rounded-md" />
     
    </section>
    <section className="flex flex-col gap-7">
      <section className="bg-black p-3 rounded-md">
        
        <img src={Speakers} alt="speakers" className="w-full rounded-md" />
        <h1 className="text-white md:text-4xl text-2xl">Speakers</h1>
        <h3 className="md:text-2xl text-xl text-white ">Amazon wireless speakers</h3>
        <button className="border-b-2 text-white">Shop Now</button>
      
      </section>
      <section className="bg-black p-3 rounded-md">
        <img src={Perfume} alt="perfume" className="w-full rounded-md" />
        <h1 className="md:text-4xl text-2xl text-white">Perfume</h1>
        <h3 className="text-xl md:text-2xl text-white">GUCCI INTENSE OUD EP</h3>
        <button className="border-b-2 text-white">Shop Now</button>
      </section>
    </section>
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

export default Home; 
