import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
import { User } from "../types/types";
import { loginUser, registerUser } from "./actions/AuthActions";

interface AuthState {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

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
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
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
