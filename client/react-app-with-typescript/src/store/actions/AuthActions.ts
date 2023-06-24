import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserLogin } from "../../types/types";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: Partial<User>) => {
    const response = await axios.post(
      `http://localhost:3001/api/auth/userRegister`,
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: UserLogin) => {
    const response = await axios.post(
      `http://localhost:3001/api/auth/userLogin`,
      userData
    );
    return response.data;
  }
);