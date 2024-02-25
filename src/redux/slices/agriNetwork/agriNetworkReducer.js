import { createSlice } from "@reduxjs/toolkit";
import { getAgriNetwork, getPersonProducts } from "./agriNetworkAction";

// Initial state
const initialState = {
  users:[],
  personProducts:[],
  usersLoader: false,
  personProductLoader: false,
};

// Actual Slice
export const agriSlice = createSlice({
  name: "agri",
  initialState,
  reducers: {
    logoutAgri: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    //Get Agri Network User
    builder.addCase(getAgriNetwork.pending, (state) => {
      state.usersLoader = true;
    });
    builder.addCase(getAgriNetwork.fulfilled, (state, { payload }) => {
      state.usersLoader = false;
      state.users = payload.data
    });
    builder.addCase(getAgriNetwork.rejected, (state, { payload }) => {
      state.usersLoader = false;
    });
    //Get Person Product
    builder.addCase(getPersonProducts.pending, (state) => {
        state.personProductLoader = true;
        state.personProducts= []
      });
      builder.addCase(getPersonProducts.fulfilled, (state, { payload }) => {
        state.personProductLoader = false;
        state.personProducts = payload.data;
      });
      builder.addCase(getPersonProducts.rejected, (state) => {
        state.personProductLoader = false;
      });
  },
});

export const { logoutAgri } = agriSlice.actions;
export default agriSlice.reducer;
