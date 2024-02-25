import { createSlice } from "@reduxjs/toolkit";
import { enterOtp, getProfile, userRegister, getAllAddress, deleteAddress, addAddress } from "./authAction";

// Initial state
const initialState = {
  profileData: {
  },
  token:"",
  otpLoader: false,
  profileLoader: false,
  registerProfileLoader: false,
  allAddressLoader: false,
  allAddressData:[],
  deleteAddressLoader: false,
  addAddressLoader: false,
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
    //Enter OTP
    builder.addCase(enterOtp.pending, (state) => {
      state.otpLoader = true;
    });
    builder.addCase(enterOtp.fulfilled, (state, { payload }) => {
      state.otpLoader = false;
      state.token = payload.data.token
      localStorage.setItem("jwt", payload.data.token);
    });
    builder.addCase(enterOtp.rejected, (state, { payload }) => {
      state.otpLoader = false;
    });
    //Get Profile
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
    //Register Profile
    builder.addCase(userRegister.pending, (state) => {
      state.registerProfileLoader = true;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.registerProfileLoader = false;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.registerProfileLoader = false;
    });
    //All Address
    builder.addCase(getAllAddress.pending, (state) => {
      state.allAddressLoader = true;
    });
    builder.addCase(getAllAddress.fulfilled, (state, { payload }) => {
      state.allAddressLoader = false;
      state.allAddressData = payload.data
    });
    builder.addCase(getAllAddress.rejected, (state, { payload }) => {
      state.allAddressLoader = false;
    });
    //Delete Address
        builder.addCase(deleteAddress.pending, (state) => {
          state.deleteAddressLoader = true;
        });
        builder.addCase(deleteAddress.fulfilled, (state, { payload }) => {
          state.deleteAddressLoader = false;
        });
        builder.addCase(deleteAddress.rejected, (state, { payload }) => {
          state.deleteAddressLoader = false;
        });
        //Add Address
        builder.addCase(addAddress.pending, (state) => {
          state.addAddressLoader = true;
        });
        builder.addCase(addAddress.fulfilled, (state, { payload }) => {
          state.addAddressLoader = false;
        });
        builder.addCase(addAddress.rejected, (state, { payload }) => {
          state.addAddressLoader = false;
        });    
  },
});

export const { logoutAuth } = authSlice.actions;
export default authSlice.reducer;
