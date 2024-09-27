
import Logo from "../assets/Codynn_Logo.png";
import { NavLink } from 'react-router-dom';
import { Bell } from "lucide-react";
import user from "../assets/Frame 875.png";
import { ShoppingCart, Coins, Tag } from "lucide-react";
import ChartComponent from "../Components/ChartComponent";
import { ChartOptions } from 'chart.js';

const SellerDashBoard = () => {
  const totalOrdersData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Total Orders',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const totalSalesData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Total Sales',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const productsData = {
    labels: ['Electronics', 'Clothing', 'Groceries', 'Books'],
    datasets: [
      {
        label: 'Products',
        data: [20, 15, 30, 25],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Ensure this is a valid position
      },
      title: {
        display: true,
        text: 'Sales Data',
      },
    },
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <section>
          <img src={Logo} alt='kinmel_logo' className="h-12" />
        </section>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink to={'/dashboard/seller'} className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500'}>Dashboard</NavLink>
          <NavLink to={'/orders'} className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500'}>Orders</NavLink>
          <NavLink to={'/promotions'} className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500'}>Promotions</NavLink>
          <NavLink to={'/inbox'} className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500'}>Inbox</NavLink>
        </nav>

        <section className="flex items-center space-x-4">
          <button className="bg-[#DB4444] text-white px-4 py-2 rounded hover:bg-red-700">
            Add New Product
          </button>
          <button className="p-2 text-gray-600">
            <Bell />
          </button>
          <section>
            <img src={user} alt="user_image" className="h-10 w-10 rounded-full cursor-pointer" />
          </section>
        </section>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-20">
        <section className="flex flex-col items-center">
          <section className="flex gap-2">
          <ShoppingCart />
          <h1>Total Orders</h1>
         
          </section>
          <h1>5000</h1>
       
          
          <ChartComponent data={totalOrdersData} options={options} />
        </section>

        <section className="flex flex-col items-center">
          <section className="flex gap-2">
          <Coins />
          <h1>Total Sales</h1>
          </section>
          <h1>4000</h1>
        
          <ChartComponent data={totalSalesData} options={options} />
        </section>

        <section className="flex flex-col items-center">

          <section className="flex gap-2">
          <Tag />
          <h1>Total Products</h1>
          </section>
        
          <ChartComponent data={productsData} options={options} />
        </section>
      </div>
    </>
  );
};

export default SellerDashBoard;
