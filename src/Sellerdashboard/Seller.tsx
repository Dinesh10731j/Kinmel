
import { useQuery } from '@tanstack/react-query';// Assuming you're using React Query for fetching data
import { Link } from 'react-router-dom'; // React Router DOM for navigation

const SellerDashboard = () => {
  const { data: orders, isLoading: ordersLoading } = useQuery({queryKey:['fetchproutorder'],queryFn:fetchOrders});
  const { data: products, isLoading: productsLoading } = useQuery({queryKey:['fetchProducts'],queryFn: fetchProducts});

  if (ordersLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl">$20,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl">{orders?.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$15,000</p>
        </div>
      </div>

      {/* Product Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">Your Products</h3>
          <Link to="/seller/add-product" className="btn btn-primary">Add New Product</Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {products?.map(product => (
            <div key={product.id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <div className="flex justify-between mt-4">
                <Link to={`/seller/edit-product/${product.id}`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Management */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {orders?.map(order => (
            <div key={order.id} className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg">Order #{order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <Link to={`/seller/order/${order.id}`} className="btn btn-primary mt-2">View Order</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mocked data fetching functions
const fetchOrders = async () => {
  // Fetch orders from backend API
  return [
    { id: '1', status: 'Delivered', total: '500' },
    { id: '2', status: 'Pending', total: '300' },
  ];
};

const fetchProducts = async () => {
  // Fetch products from backend API
  return [
    { id: '1', name: 'Product A', price: '100', stock: '10' },
    { id: '2', name: 'Product B', price: '200', stock: '5' },
  ];
};

export default SellerDashboard;
