import { useState } from "react";
import KinMel_Logo from "../assets/Codynn_Logo.png";
import { NavLink } from "react-router-dom";
import { SearchIcon, HeartIcon, ShoppingCart, MenuIcon, XIcon } from "lucide-react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="flex flex-row justify-evenly items-center gap-7 py-5 px-3">
        <section>
          <img src={KinMel_Logo} alt="KinMel_Logo" />
        </section>
        
        {/* Menu Icon for Mobile */}
        <section className="md:hidden flex items-center">
          <MenuIcon onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        </section>

        {/* Navigation for Desktop */}
        <section className="hidden md:block">
          <nav>
            <ul className="flex gap-5">
              <NavLink to={"/"} className={({ isActive }) => (isActive ? "border-b-4" : "")}>
                Home
              </NavLink>
              <NavLink to={"/contact"} className={({ isActive }) => (isActive ? "border-b-4" : "")}>
                Contact
              </NavLink>
              <NavLink to={"/about"} className={({ isActive }) => (isActive ? "border-b-4" : "")}>
                About
              </NavLink>
              <NavLink to={"/signup"} className={({ isActive }) => (isActive ? "border-b-4" : "")}>
                Signup
              </NavLink>
            </ul>
          </nav>
        </section>

        <section>
          <form className="relative flex items-center  gap-5 md:px-2 rounded-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-12 py-2 rounded-md bg-[#FFFFFF]"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div>
          </form>
        </section>

        <section className="flex flex-row gap-5">
          <HeartIcon />
          <ShoppingCart />
        </section>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">KinMel</h2>
          <XIcon onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        </div>
        <nav>
          <ul className="flex flex-col p-4 gap-4">
            <NavLink to={"/"} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "font-bold" : "")}>
              Home
            </NavLink>
            <NavLink to={"/contact"} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "font-bold" : "")}>
              Contact
            </NavLink>
            <NavLink to={"/about"} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "font-bold" : "")}>
              About
            </NavLink>
            <NavLink to={"/signup"} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "font-bold" : "")}>
              Signup
            </NavLink>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
