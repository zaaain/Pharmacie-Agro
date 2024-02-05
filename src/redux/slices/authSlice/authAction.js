import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const enterOtp = createAsyncThunk("otp", async (payload) => {
  const response = await api.post("/api/auth/verify/otp", payload);
  return response.data;
});