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
  const response = await api.post(`api/product/listings`,{productType:category});
  return response.data;
});

export const getProductDetails = createAsyncThunk("product/details", async (id) => {
  const response = await api.get(`/api/product/details/${id}`);
  return response.data;
});

export const getProductsAnalytic = createAsyncThunk("product/analytic", async () => {
  const response = await api.get(`/api/product/analytic`);
  return response.data;
});


export const listProduct = createAsyncThunk("product/list", async (payload) => {
  const response = await api.postFormData("/api/product/add", payload);
  return response.data;
});