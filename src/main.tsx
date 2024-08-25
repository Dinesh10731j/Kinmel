import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Landingpage/Home';
import Contact from './Landingpage/Contact';
import About from './Landingpage/About';
import Signup from './Registration/Signup';
import Login from './Registration/Login';
import Error404 from './Pages/Error404';
import Account from './Pages/Account';
import MyProfile from './Components/MyProfile';
import './index.css';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path:'about',
        element:<About/>
      },
      {
        path:'signup',
        element:<Signup/>

      },{
        path:'login',
        element:<Login/>
      },{
        path:'*',
        element:<Error404/>
      },
      {
        path:'account',
        element:<Account/>,
        children:[
          {
            path:'my-profile',
            element:<MyProfile/>
          }
        ]
    
      }
    ],
  },

 
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
