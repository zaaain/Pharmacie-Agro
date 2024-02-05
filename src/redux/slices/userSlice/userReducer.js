import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { getUser } from "./userAction";
// Initial state
const initialState = {
  userState: [],
  userLoading: false,
};

// Actual Slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.userState = !isEmpty(payload) ? payload : [];
      state.userLoading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.userLoading = false;
    });
  },
});

export default userSlice.reducer;