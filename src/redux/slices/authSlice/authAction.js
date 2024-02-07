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