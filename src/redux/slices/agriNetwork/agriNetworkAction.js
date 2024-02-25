import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const getAgriNetwork = createAsyncThunk("agri/user", async () => {
  const response = await api.get("/api/auth/all/user");
  return response.data;
});

export const getPersonProducts = createAsyncThunk("agri/user/products", async (payload) => {
    const response = await api.get(`/api/product/user/${payload}`);
    return response.data;
});
 