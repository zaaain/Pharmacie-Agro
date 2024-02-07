import { createSlice } from "@reduxjs/toolkit";
import { enterOtp, getProfile, userRegister } from "./authAction";

// Initial state
const initialState = {
  profileData: {
  },
  otpLoader: false,
  profileLoader: false,
  registerProfileLoader:false
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAuth: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(enterOtp.pending, (state) => {
      state.otpLoader = true;
    });
    builder.addCase(enterOtp.fulfilled, (state, { payload }) => {
      state.otpLoader = false;
    });
    builder.addCase(enterOtp.rejected, (state, { payload }) => {
      state.otpLoader = false;
    });

    builder.addCase(getProfile.pending, (state) => {
      state.profileLoader = true;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.profileLoader = false;
      state.profileData = payload.data
    });
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.profileLoader = false;
    });

    builder.addCase(userRegister.pending, (state) => {
      state.registerProfileLoader = true;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.registerProfileLoader = false;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.registerProfileLoader = false;
    });
  },
});

export const { logoutAuth } = authSlice.actions;
export default authSlice.reducer;
