import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, CurrencyIcon, PackageIcon } from 'lucide-react'; // Icons from Heroicons

const SellerDashboard = () => {
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['fetchproutorder'], queryFn: fetchOrders
  });
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['fetchProducts'], queryFn: fetchProducts
  });

  if (ordersLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-[#DB4444] min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Seller Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <CurrencyIcon className="w-10 h-10 text-[#DB4444] mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-3xl">$20,000</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <ShoppingCartIcon className="w-10 h-10 text-[#DB4444] mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl">{orders?.length}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <PackageIcon className="w-10 h-10 text-[#DB4444] mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-3xl">$15,000</p>
          </div>
        </div>
      </div>

      {/* Product Management */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Product Management</h2>
          <Link to="/seller/add-product" className="bg-white text-[#DB4444] font-bold py-2 px-4 rounded hover:bg-gray-100">
            Add New Product
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map(product => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="mt-2">Price: ${product.price}</p>
              <p className="mt-2">Stock: {product.stock}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/seller/edit-product/${product.id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Management */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Order Management</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {orders?.map(order => (
            <div key={order.id} className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl">Order #{order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <Link to={`/seller/order/${order.id}`} className="bg-green-500 text-white py-2 px-4 rounded mt-2 inline-block hover:bg-green-600">
                View Order
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mocked data fetching functions
const fetchOrders = async () => {
  return [
    { id: '1', status: 'Delivered', total: '500' },
    { id: '2', status: 'Pending', total: '300' },
  ];
};

const fetchProducts = async () => {
  return [
    { id: '1', name: 'Product A', price: '100', stock: '10' },
    { id: '2', name: 'Product B', price: '200', stock: '5' },
  ];
};

export default SellerDashboard;
