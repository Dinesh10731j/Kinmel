import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Provider} from "react-redux"
import App from './App';
import './index.css';
import store from './store/store';


// Initialize Query Client
const queryClient = new QueryClient();

// Render the application
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <App />

      </Provider>
     
    
     
    
      
    </QueryClientProvider>
  </React.StrictMode>
);
