import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import wishListSlice from "./slices/wishListSlice";
import userRoleSlice from "./slices/userRoleSlice";

const store = configureStore({
    reducer:{
        product:productSlice,
        wishlist:wishListSlice,
        userRole :userRoleSlice
        
    },
});


export default store;