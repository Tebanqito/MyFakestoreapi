import { User, UserLogin } from "../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`http://localhost:3001/api/users`);
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "id">) => {
    const response = await axios.post(
      `http://localhost:3001/api/users`,
      userData
    );
    return response.data;
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:3001/api/users/${userId}`
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: { attributes: Partial<Omit<User, "id">>; id: string }) => {
    const response = await axios.put(
      `http://localhost:3001/api/users/update/${userData.id}`,
      userData.attributes
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:3001/api/users/delete/${id}`
    );
    return response.data;
  }
);

export const linkProduct = createAsyncThunk(
  "users/addProduct",
  async (data: { productId: string; userId: string }) => {
    const response = await axios.put(
      `http://localhost:3001/api/users/linkProduct/${data.productId}`,
      { id: data.userId }
    );
    return response.data;
  }
);

export const unlinkProduct = createAsyncThunk(
  "users/removeProduct",
  async (data: { productId: string; userId: string }) => {
    const response = await axios.put(
      `http://localhost:3001/api/users/unlinkProduct/${data.productId}`,
      { id: data.userId }
    );
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData: Partial<User>) => {
    const response = await axios.post(
      `http://localhost:3001/api/users/userRegister`,
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (userData: UserLogin) => {
    const response = await axios.post(
      `http://localhost:3001/api/users/userLogin`,
      userData
    );
    return response.data;
  }
);