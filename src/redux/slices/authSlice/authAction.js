import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const enterOtp = createAsyncThunk("auth/otp", async (payload) => {
  const response = await api.post("/api/auth/verify/otp", payload);
  return response.data;
});

export const getProfile = createAsyncThunk("auth/profile", async (payload) => {
  const response = await api.get("/api/auth/profile");
  return response.data;
});

export const userRegister = createAsyncThunk("auth/register", async (payload) => {
  const response = await api.post("/api/auth/update/profile", payload);
  return response.data;
});

export const getAllAddress = createAsyncThunk("address/all", async () => {
  const response = await api.get("/api/auth/address");
  return response.data;
});

export const deleteAddress = createAsyncThunk("address/delete", async (payload) => {
  const response = await api.post("/api/auth/delete/address", payload);
  return response.data;
});

export const addAddress = createAsyncThunk("address/add", async (payload) => {
  const response = await api.post("/api/auth/update/address", payload);
  return response.data;
});