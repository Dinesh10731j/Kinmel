import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Category, BrowserByCategory } from "../Utils/category";
import { UseGetProductsImages } from "../hooks/Usegetproductsimage";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight, Star } from "lucide-react";

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
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
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
    targetDate.setDate(targetDate.getDate() + 7);

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
      <button onClick={() => scrollPrev()} className="flex items-center justify-center">
        <ChevronLeft className="text-gray-600 h-8 w-8" />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <button onClick={() => scrollNext()} className="flex items-center justify-center">
        <ChevronRight className="text-gray-600 h-8 w-8" />
      </button>
    );
  };

  const renderStars = (rating: any) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`text-yellow-400 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-400'}`} />
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
            <h1 key={categories?.category} className="text-xl py-3 px-3">{categories?.category}</h1>
          ))}
        </section>

        <section className="md:w-2/3 ">
          <Slider {...settings} className="cursor-pointer">
            {products?.slice(0,7)?.map((items: any, index: number) => (
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
      <section className='before:border-l-8 px-5 before:bg-[#DB4444]'>
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
      <section className="px-5 py-2 mt-10">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {products?.slice(0, 5).map((product: any, index: number) => (
            <div 
              key={index} 
              className="mx-2 shadow-md rounded-lg flex flex-col h-[400px] w-[300px]"
            >
              <img 
                src={product.image} 
                alt={`Product ${index}`}
                className="w-full h-48 object-contain rounded-t-lg"
              />
                <div className="flex justify-between items-center p-4">
                <button className="text-[#DB4444] hover:text-red-600">
                  <Heart />
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
                  {renderStars(product.rating.rate)}
                </div>
                <p className="text-lg font-bold mt-2">रू {convertPriceToNRS(product.price)}</p>
              </div>
            
            </div>
          ))}
        </ScrollMenu>
      </section>

      <section className="flex justify-center items-center px-3 py-2">
        <button className="px-7 py-2 md:px-12 text-white md:py-3 bg-[#DB4444] rounded-md">View All Products</button>
      </section>

      {/* This Month Section */}
      <section className="before:border-l-8 px-3 py-3">
        <h1 className="text-[#DB4444] text-2xl">Categories</h1>
      </section>

      {/* Browser By Category Section */}
      <section className="px-4 py-5">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {BrowserByCategory.map((categories, index) => (
            <section key={index} className="hover:text-[#FFFF] cursor-pointer hover:bg-[#DB4444] transition-all delay-100 h-[270px] w-[270px] bg-white rounded-lg shadow-md flex flex-col items-center justify-center mx-2">
              <categories.icon className="text-3xl hover:text-[#FFFF] h-32 w-32 text-[#DB4444]"  />
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
<h1 className="text-2xl md:text-4xl font-medium">Best Selling Products</h1>
        </section>
        <section className="px-3 py-2">
          <button className="py-2 px-7 md:py-4 md:px-12 bg-[#DB4444] text-[#FFFF] rounded-md">View All</button>
        </section>
      </section>


      <section className="flex flex-wrap gap-7 justify-center px-3 py-2">
  {products?.slice(5,9)?.map((bestSelling: any, index: number) => (
    <section 
      key={index} 
      className="relative w-[350px] h-[480px]  bg-[#FFFFFF] shadow-md px-7 py-2 rounded-lg flex flex-col items-center overflow-hidden"
    >
      <img 
        src={bestSelling?.image} 
        alt={`Best Selling ${index}`} 
        className="object-contain w-full h-3/4"
      />
      <section 
        className="flex flex-col gap-6 absolute top-2 right-0 px-3 py-1"
      >
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
        <div className="flex  gap-1">{renderStars(bestSelling?.rating?.rate)}</div>
      </section>
 
    </section>
  ))}
</section>

    </>
  );
};

export default Home;
