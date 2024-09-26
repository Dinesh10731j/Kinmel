import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
    name:'wishlists',
    initialState:[],
    reducers:{
        addToWishList(state:any,action){

            state.push(action.payload);

            return state
        }
    }
});


export const {addToWishList} = wishListSlice.actions


export default wishListSlice.reducer