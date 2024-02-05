import { createAsyncThunk } from "@reduxjs/toolkit";
import axious from "axios";

export const getUser = createAsyncThunk("get/user", async () => {
  const response = await axious.get("https://thronesapi.com/api/v2/Characters");
  return response.data;
});