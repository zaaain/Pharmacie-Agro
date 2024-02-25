import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice/authReducer";
import { productSlice } from "./slices/productsSlice/productsReducer"
import { agriSlice } from "./slices/agriNetwork/agriNetworkReducer"

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products: productSlice.reducer,
  agri:agriSlice.reducer
});