import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice/authReducer";
import { productSlice } from "./slices/productsSlice/productsReducer"

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products: productSlice.reducer
});