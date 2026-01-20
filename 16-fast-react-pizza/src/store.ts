import {configureStore, type ThunkDispatch} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<StoreState, any, any>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
