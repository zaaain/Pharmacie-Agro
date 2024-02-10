import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice/userReducer";
import { authSlice } from "./slices/authSlice/authReducer";
import { productSlice } from "./slices/productsSlice/productsReducer"

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  auth: authSlice.reducer,
  products: productSlice.reducer
});