import { useState, useEffect, useRef } from "react";
import KinMel_Logo from "../assets/Codynn_Logo.png";
import { NavLink } from "react-router-dom";
// import { useWishList } from "../context/wishlistContext";
import { UseGetProductsImages } from "../hooks/Usegetproductsimage";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {
  // SearchIcon,
  HeartIcon,
  ShoppingCart,
  MenuIcon,
  XIcon,
  UserIcon,
XCircle,
ShoppingBagIcon,
Star,
LogInIcon,

} from "lucide-react";

interface SuggestionType {
  title: string;
}

const Header = () => {

  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {data:suggestions} = UseGetProductsImages();

  // const {wishlist} = useWishList();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
const products = useSelector((state:any)=>{
  return state.product;

});


const wishlists = useSelector((state:any)=>{
  return state.wishlist;
})

  const Logout = ()=>{
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('userId');
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  const userInput = e.target.value;
  setQuery(userInput);

  if (userInput.length > 0) {
    const filtered = suggestions.filter((suggestion:SuggestionType) =>
      suggestion.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  } else {
    setShowSuggestions(false);
  }

}


const handleSuggestionClick = (suggestion: SuggestionType) => {
  setQuery(suggestion.title);
  setShowSuggestions(false);
};


  return (
    <>
      <header className="flex flex-row justify-evenly items-center gap-7 py-5 px-3">
        <section>
          <img src={KinMel_Logo} alt="KinMel_Logo" className="h-10 w-10" />
        </section>

        {/* Menu Icon for Mobile */}
        <section className="md:hidden flex items-center">
          <MenuIcon
            onClick={toggleSidebar}
            className="text-2xl cursor-pointer"
          />
        </section>

        {/* Navigation for Desktop */}
        <section className="hidden md:block">
          <nav>
            <ul className="flex gap-5">
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "border-b-4" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) => (isActive ? "border-b-4" : "")}
              >
                Contact
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive }) => (isActive ? "border-b-4" : "")}
              >
                About
              </NavLink>
              <NavLink
                to={"/auth/signup"}
                className={({ isActive }) => (isActive ? "border-b-4" : "")}
              >
                Signup
              </NavLink>
            </ul>
          </nav>
        </section>

      
     
      

        <section>
          <form className="relative flex items-center gap-5 md:px-2 rounded-md">
          <input
  type="text"
  placeholder="What are you looking for?"
  className="w-full px-4 py-2  md:px-6 md:py-2 lg:px-2 lg:py-2 rounded-md bg-[#FFFFFF] text-black placeholder-gray-500"
  style={{ fontSize: '0.875rem' }} 
  onChange={handleChange}
  value={query}
/>


{showSuggestions && (
        <ul className="absolute bg-white border w-full mt-20 z-20">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion:SuggestionType, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {suggestion?.title}
              </li>
            ))
          ) : (
            <li className="p-2">Product not found</li>
          )}
        </ul>
      )}

            {/* <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div> */}
          </form>
        </section>

        <section className="flex gap-5">
          <div className="relative px-4">
          <span className="absolute top-0 right-0 ml-7 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {wishlists?.length}
      </span>
      <NavLink to={'/wishlist'}>
      <HeartIcon className="cursor-pointer" />

      </NavLink>

         
          </div>
        
          <div className="relative px-4">
      {/* Display the total number of items on the top-right of the cart icon */}
      <span className="absolute top-0 right-0 ml-7 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {products?.length}
      </span>
      <NavLink to={'/cart'}>
        <ShoppingCart className="cursor-pointer" />
      </NavLink>
    </div>
          <div onClick={toggleDropdown} className="relative cursor-pointer z-10">
            <UserIcon />
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md"
              >
               <ul className="py-2">
        <li className="px-2 py-2 hover:bg-gray-100 flex items-center gap-2">
          <UserIcon size={16} />
          <NavLink to={"/account"}>Manage Account</NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 flex items-center gap-2">
          <ShoppingBagIcon size={16} />
          <NavLink to={""}>My Orders</NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 flex items-center gap-2">
          <XCircle size={16} />
          <NavLink to={"/account/my-cancellations"}>My Cancellations</NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 flex items-center gap-2">
          <Star size={16} />
          <NavLink to={""}>My Reviews</NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 flex items-center gap-2" onClick={Logout}>
          <LogInIcon size={16} />
          <NavLink to={""}>Logout</NavLink>
        </li>
      </ul>
              </div>
            )}
          </div>
        </section>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-10 w-64 bg-black text-white transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">KinMel</h2>
          <XIcon onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        </div>
        <nav>
          <ul className="flex flex-col p-4 gap-4 ">
            <NavLink
              to={"/"}
              onClick={toggleSidebar}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to={"/contact"}
              onClick={toggleSidebar}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Contact
            </NavLink>
            <NavLink
              to={"/about"}
              onClick={toggleSidebar}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              About
            </NavLink>
            <NavLink
              to={"/auth/signup"}
              onClick={toggleSidebar}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Signup
            </NavLink>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50  md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
