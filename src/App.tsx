import React from 'react';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Landingpage/Home';
import Contact from './Landingpage/Contact';
import About from './Landingpage/About';
import Signup from './Registration/Signup';
import Login from './Registration/Login';
import Error404 from './Pages/Error404';
import Account from './Pages/Account';
import MyProfile from './Components/MyProfile';
import AddressBook from './Components/AddressBook';
import PaymentsOptions from './Components/PaymentsOptions';
import MyReturns from './Components/MyReturns';
import MyCancellations from './Components/MyCancellations';
import Cart from './Pages/Cart';

// Define the type for cart items


interface cartItems{
  id:String,
  img:String,
}


const App: React.FC = () => {
  // Define the router configuration inside the App component
  const [carts,addCarts] = React.useState<cartItems[]>([]);
const handleAddCart =(id:string,img:string)=>{
addCarts((previousCart: any)=>[...previousCart,{id,img}])

}
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      ),
      children: [
        {
          path: '',
          element: <Home handleAddCart={handleAddCart} />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'cart',
          element: <Cart userCart={carts} />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: '*',
          element: <Error404 />,
        },
        {
          path: 'account',
          element: <Account />,
          children: [
            {
              path: 'my-profile',
              element: <MyProfile />,
            },
            {
              path: 'address-book',
              element: <AddressBook />,
            },
            {
              path: 'payment-options',
              element: <PaymentsOptions />,
            },
            {
              path: 'my-returns',
              element: <MyReturns />,
            },
            {
              path: 'my-cancellations',
              element: <MyCancellations />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
