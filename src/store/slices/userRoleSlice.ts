import { createSlice } from "@reduxjs/toolkit";
import bs64 from "base-64";

interface UserRoleState {
    role: string | null;  
}

const initialState: UserRoleState = {
    role: null,
};

const userRoleSlice = createSlice({
    name: 'userrole',
    initialState,
    reducers: {
        setUserRole(state, action) {
         
            state.role = bs64.decode(action.payload);
        },
    },
});

export const { setUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
