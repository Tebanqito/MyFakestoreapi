import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types/types";
import {
  fetchUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  linkProduct,
  unlinkProduct,
  registerUser,
  loginUser,
} from "./actions/UserActions";

interface UsersState {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  users: Partial<User>[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  isAuthenticated: false,
  user: null,
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(linkProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(linkProduct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(linkProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(unlinkProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlinkProduct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(unlinkProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      });
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

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;