import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types/types";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  linkProduct,
} from "./actions/UserActions";

interface UsersState {
  user: Partial<User> | null;
  users: Partial<User>[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
      });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
