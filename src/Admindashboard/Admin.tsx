
import { NavLink } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r border-gray-200">
        <nav className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                Product Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                Order Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reports"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                Sales Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-gray-800 p-2 block rounded"
                    : "text-gray-700 hover:bg-gray-200 p-2 block rounded"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example Dashboard Widgets */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800">Total Sales</h3>
            <p className="mt-2 text-2xl font-semibold text-green-500">$50,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800">Orders Today</h3>
            <p className="mt-2 text-2xl font-semibold text-blue-500">150</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800">New Customers</h3>
            <p className="mt-2 text-2xl font-semibold text-purple-500">30</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800">Low Stock Products</h3>
            <p className="mt-2 text-2xl font-semibold text-red-500">10</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
