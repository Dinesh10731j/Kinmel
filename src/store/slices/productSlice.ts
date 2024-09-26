import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
 
  initialState: [],
  reducers: {
    addProduct(state:any, action) {
      state.push(action.payload);
    },
  
   
  },
});





export const {addProduct} = productSlice.actions

export default productSlice.reducer;
