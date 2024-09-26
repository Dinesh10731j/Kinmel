import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
    name:'wishlists',
    initialState:[],
    reducers:{
        addToWishList(state:any,action){

            state.push(action.payload);

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