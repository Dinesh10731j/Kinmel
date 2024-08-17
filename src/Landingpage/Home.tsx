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
    </>
  );
}

export default Home;
