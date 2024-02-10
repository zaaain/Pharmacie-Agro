import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { addNewProduct } from "./productsAction";

// Initial state
const initialState = {
  newProductLoader: false,
};

// Actual Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getUser.pending, (state) => {
    //   state.userLoading = true;
    // });
    // builder.addCase(getUser.fulfilled, (state, { payload }) => {
    //   console.log("payload", payload);
    //   state.userState = !isEmpty(payload) ? payload : [];
    //   state.userLoading = false;
    // });
    // builder.addCase(getUser.rejected, (state) => {
    //   state.userLoading = false;
    // });
  },
});

export default productSlice.reducer;