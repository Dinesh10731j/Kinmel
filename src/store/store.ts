import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import wishListSlice from "./slices/wishListSlice";

const store = configureStore({
    reducer:{
        product:productSlice,
        wishlist:wishListSlice,
    },
});


export default store;