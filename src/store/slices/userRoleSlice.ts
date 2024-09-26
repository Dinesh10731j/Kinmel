
import { createSlice } from "@reduxjs/toolkit";

const userRoleSlice = createSlice({
    name:'userrole',
    initialState:{
        role:null,
    },
    reducers:{
      setUserRole(state,action){
        state.role = action.payload;

      },

    },
});

export const {setUserRole} = userRoleSlice.actions



export default userRoleSlice.reducer;