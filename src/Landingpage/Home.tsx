
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Category } from "../Utils/category";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <section className="flex flex-col md:flex-row gap-6 overflow-hidden justify-between py-2 px-7">
        {/* Category Section */}
        <section className="md:w-1/3 shadow-md">
          {Category.map((categories) => (
            <h1 key={categories.category} className="text-xl py-2 px-3">{categories.category}</h1>
          ))}
        </section>

        {/* Slider Section */}
        <section className="md:w-2/3">
          <Slider {...settings} className="cursor-pointer">
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/id/237/800/400" 
                alt="iPhone 14 Image 1" 
                className="max-w-full h-auto object-cover" 
              />
            </div>
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/seed/picsum/800/400" 
                alt="iPhone 14 Image 2" 
                className="max-w-full h-auto object-cover" 
              />
            </div>
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/800/400.jpg" 
                alt="iPhone 14 Image 3" 
                className="max-w-full h-auto object-cover" 
              />
            </div>
          </Slider>
        </section>
      </section>
    </>
  );
}

export default Home;
