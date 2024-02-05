import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice/userReducer";
import { authSlice } from "./slices/authSlice/authReducer";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
  auth: authSlice.reducer
});