import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;       
  quantity: number;  
  price: number;     

}

type ProductState = Product[];

const productSlice = createSlice({
  name: "products",
  initialState: [] as ProductState,
  reducers: {
    addProduct(state, action: { payload: Product }) {
      const existingIndex = state.findIndex(product => product.id === action.payload.id);

      if (existingIndex >= 0) {
      
        state[existingIndex].quantity += action.payload.quantity;
      } else {
        
        state.push(action.payload);
      }
    },

    removeProduct(state, action: { payload: number }) {
      return state.filter(product => product.id !== action.payload);
    },

    updateProductQuantity(state, action: { payload: { id: number; quantity: number } }) {
      const existingProduct = state.find(product => product.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity = action.payload.quantity; 
      }
    }
  },
});

export const { addProduct, removeProduct, updateProductQuantity } = productSlice.actions;
export default productSlice.reducer;
