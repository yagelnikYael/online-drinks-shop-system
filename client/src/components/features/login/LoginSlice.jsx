import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null
}

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {            
            state.currentUser = action.payload;            
            console.log(state.currentUser);
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
});

export const {login, logout} = LoginSlice.actions;
export default LoginSlice.reducer;