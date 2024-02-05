import { createSlice } from "@reduxjs/toolkit";
import { enterOtp } from "./authAction";

// Initial state
const initialState = {
  profileData: {
    firstName: "",
    lastName: "",
  },
  token: "",
  otpLoader: false,
  otpErrMsg: "",
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(enterOtp.pending, (state) => {
      state.otpLoader = true;
      state.otpErrMsg = "";
    });
    builder.addCase(enterOtp.fulfilled, (state,{payload}) => {
      state.otpLoader = false;
    //   console.log(" response payload", payload.data);
    });
    builder.addCase(enterOtp.rejected, (state, {payload}) => {
        // console.log("err payload", payload)
      state.otpLoader = false;
    });
  },
});

export default authSlice.reducer;
