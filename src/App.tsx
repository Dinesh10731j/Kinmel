import React from 'react';
import { CartProvider } from './context/cartContext';
import { ProductDetailsProvider } from './context/productdetailsContext';
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
import Checkout from './Pages/Checkout';
import Payment from './Pages/Payment';
import PaymentCompletion from './Pages/Paymentcompletion';
import Productdetails from './Pages/Productdetails';

const App: React.FC = () => {
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
        { path: '', element: <Home/> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'auth/signup', element: <Signup /> },
        { path: 'cart', element: <Cart /> },
        { path: 'auth/login', element: <Login /> },
        { path: 'checkout', element: <Checkout /> },
        {path:'/payment',element:<Payment/>},
        { path: '*', element: <Error404 /> },
        {path:'/completion', element:<PaymentCompletion/>},
        {path:'productdetails/:id',element:<Productdetails/>},
        {
          path: 'account',
          element: <Account />,
          children: [
            { path: 'my-profile', element: <MyProfile /> },
            { path: 'address-book', element: <AddressBook /> },
            { path: 'payment-options', element: <PaymentsOptions /> },
            { path: 'my-returns', element: <MyReturns /> },
            { path: 'my-cancellations', element: <MyCancellations /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ProductDetailsProvider>
        <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>

    </ProductDetailsProvider>
  
  );
};

export default App;
