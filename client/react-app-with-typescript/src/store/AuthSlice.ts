import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
  } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

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
  async (userData: { userName: string; password: string }) => {
    const response = await axios.post(
      `http://localhost:3001/api/auth/userLogin`,
      userData
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
