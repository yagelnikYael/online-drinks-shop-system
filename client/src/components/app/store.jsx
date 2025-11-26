import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/LoginSlice'
import cartReducer from '../features/cart/CartSlice';
export const store = configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
    },
})