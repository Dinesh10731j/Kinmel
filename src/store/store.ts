import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import productSlice from './slices/productSlice';
import wishListSlice from './slices/wishListSlice';
import userRoleSlice from './slices/userRoleSlice';

const userRolePersistConfig = {
  key: 'userRole',
  storage,

};

const persistedUserRoleReducer = persistReducer(userRolePersistConfig, userRoleSlice);

const store = configureStore({
  reducer: {
    product: productSlice,
    wishlist: wishListSlice,
    userRole: persistedUserRoleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

const persistor = persistStore(store);

export { store, persistor };
