import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
 
  initialState: [],
  reducers: {
    addProduct(state:any, action) {
      state.push(action.payload);
      return state;
    },

    removeProduct(state:any,action:any){
     const updatedState = state.filter ((product: { id: any })=>product.id !== action.payload);

      return updatedState;
    

    }
  
   
  },
});





export const {addProduct,removeProduct} = productSlice.actions

export default productSlice.reducer;
