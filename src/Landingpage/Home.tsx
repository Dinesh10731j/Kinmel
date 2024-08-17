import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Category } from "../Utils/category";
import { UseGetProductsImages } from "../hooks/Usegetproductsimage";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Screens larger than 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Screens between 768px and 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // Screens up to 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const { data: products } = UseGetProductsImages();

  // Timer logic
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // Set target date to 3 days from now

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
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

  return (
    <>
      <section className="flex flex-col md:flex-row gap-6 overflow-hidden justify-between py-10 px-7">
        {/* Category Section */}
        <section className="md:w-1/3 shadow-md">
          {Category.map((categories) => (
            <h1 key={categories.category} className="text-xl py-2 px-3">{categories.category}</h1>
          ))}
        </section>

        {/* Slider Section */}
        <section className="md:w-2/3">
          <Slider {...settings} className="cursor-pointer items-center justify-center">
            {products?.map((items: any, index: number) => (
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

      <section className='before:border-l-8 px-5 before:bg-[#DB4444]'>
        <h1 className="text-[#DB4444] text-2xl font-medium">Today's</h1>
      </section>

      <section className="flex  px-5 gap-10 justify-evenly items-center py-5">
        <section>
          <h1 className=" text-xl md:text-4xl font-medium">Flash Sales</h1>
        </section>
        <section>
          {/* Timer Section */}
          <div className="flex items-center gap-2 text-xl md:text-3xl font-bold  rounded-lg">
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
    </>
  );
}

export default Home;
