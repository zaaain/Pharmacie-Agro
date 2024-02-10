import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const addNewProduct = createAsyncThunk("product/add", async (payload) => {
  const response = await api.post("/api/product/add", payload);
  return response.data;
});