import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const wishListSlice = createSlice({
    name:'wishlists',
    initialState:[],
    reducers:{
        addToWishList(state:any,action){

            state.push(action.payload);
            toast.success('Wishlist added successfully');

            return state;
        },

        removeWishList(state,action){
            const updatedState = state.filter((product:{id:number}) => product.id !== action.payload);
         

            return updatedState;
        }
    }
});


export const {addToWishList,removeWishList} = wishListSlice.actions


export default wishListSlice.reducer