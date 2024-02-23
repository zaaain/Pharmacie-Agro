import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const addNewProduct = createAsyncThunk("product/add", async (payload) => {
  const response = await api.postFormData("/api/product/add", payload);
  return response.data;
});


export const getAllProduct = createAsyncThunk("product/all", async () => {
  const response = await api.get("/api/product/listings?skip=0");
  return response.data;
});

export const getProductWithCategory = createAsyncThunk("product/category", async (category) => {
  const response = await api.get(`/api/product/listings/${category}?skip=0`);
  return response.data;
});

export const getProductDetails = createAsyncThunk("product/details", async (id) => {
  const response = await api.get(`/api/product/details/${id}`);
  return response.data;
});