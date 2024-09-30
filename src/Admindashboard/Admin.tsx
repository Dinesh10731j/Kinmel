import { Bell, Menu, Users, BoxIcon, LineChartIcon, TimerIcon,Blocks,Table,Heart, Inbox,ListOrderedIcon,Store, } from "lucide-react"; 
import { NavLink } from "react-router-dom";
import kinMel_logo from "../assets/Codynn_Logo.png";
import adminprofile from "../assets/Frame 876.png";
import ChartLineGraph from "../Components/ChartLineGraph";
import { useState } from "react";

const Admin = () => {


  const [sidenav,setSidenav] = useState(false);
  
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center transition-opacity px-10 md:px-40 py-5 bg-white shadow-md">

        {/* Logo and Search */}
        <div className="flex items-center space-x-4">
          <img src={kinMel_logo} alt="kinMel_logo" className="h-10 w-10" />

          <Menu className="block h-6 w-6 text-gray-600 cursor-pointer" onClick={()=>setSidenav(!sidenav)} />

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-black"
            />
          </div>
        </div>

        {/* Notification and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* Admin Profile */}
          <img src={adminprofile} alt="Admin Profile" className="h-10 w-10 cursor-pointer rounded-full" />
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="block md:hidden px-6 py-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-black"
        />
      </div>

      {/* Sidebar */}
      <aside className={`z-20 fixed bg-black top-20  rounded-r-md min-h-screen left-0 md:fixed md:min-h-screen md:w-56 p-4 transition-all shadow-md ${sidenav?'-translate-x-full bg-opacity-50 backdrop-blur':'-translate-x-0'}`}>
        <nav className="space-y-4">
          <h2 className="text-xl font-semibold text-white ">KinMel</h2>
          <ul className="space-y-3">
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/admin"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <Blocks  className="text-gray-600" />
      <span>Dashboard</span>
    </NavLink>
  </li>
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/products"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <Table className="text-gray-600" />
      <span>Product</span>
    </NavLink>
  </li>
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/favorites"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <Heart  className="text-gray-600" />
      <span>Favorite</span>
    </NavLink>
  </li>
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/inbox"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <Inbox  className="text-gray-600" />
      <span>Inbox</span>
    </NavLink>
  </li>
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/orders"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <ListOrderedIcon  className="text-gray-600" />
      <span>Orders</span>
    </NavLink>
  </li>
  <li className="text-gray-700 rounded">
    <NavLink
      to="/dashboard/product-stock"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 ${isActive ? 'bg-[#DB4444] text-white shadow-md rounded-md' : 'text-white'}`
      }
    >
      <Store  className="text-gray-600" />
      <span>Product Stock</span>
    </NavLink>
  </li>
</ul>


        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 px-14 md:px-32 md:ml-60">
        <h1 className="text-2xl font-bold mb-6 px-2 py-4">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <section className="shadow-xl p-6 bg-white rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium">Total Users</h2>
            <section className="flex gap-4 mt-3">
            <p className="text-2xl font-bold">5000</p>
            <Users className="h-7 w-7 text-violet-700 bg-violet-100 p-1 rounded-xl" />
            </section>
         
          </section>

          {/* Total Orders */}
          <section className="shadow-xl p-6 bg-white rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium">Total Orders</h2>

            <section className="flex gap-4 mt-3">
            <p className="text-2xl font-bold">4000</p>
            <BoxIcon className="h-8 w-8 text-yellow-400 p-1 rounded-xl bg-yellow-100" />

            </section>
           
          </section>

          {/* Total Sales */}
          <section className="shadow-xl p-6 bg-white rounded-lg flex flex-col items-center justify-center">
            <h2 className=" text-md md:text-lg font-medium">Total Sales</h2>
            <section className="flex gap-4 mt-3">
            <p className="text-2xl font-bold">$4000</p>
            <LineChartIcon className="h-8 w-8 text-green-400 bg-green-100 p-1 rounded-xl" />

            </section>
          
          </section>

          {/* Total Pending */}
          <section className="shadow-xl p-6 bg-white rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-md md:text-lg font-medium">Total Pending</h2>

            <section className="flex gap-4 mt-3" >
            <p className="text-2xl font-bold">3000</p>
            <TimerIcon className="h-8 w-8 text-orange-400 bg-orange-100 p-1 rounded-xl" />
            </section>
         
          </section>
        </div>
        <div>
<ChartLineGraph/>
          
        </div>
      </main>
    </>
  );
};

export default Admin;
