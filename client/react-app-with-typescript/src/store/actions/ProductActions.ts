import { Product } from "../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`http://localhost:3001/api/products`);
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId: string) => {
    const response = await axios.get(
      `http://localhost:3001/api/products/${productId}`
    );
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/getProductById",
  async (productData: Product) => {
    const response = await axios.post(
      `http://localhost:3001/api/products`,
      productData
    );
    return response.data;
  }
);

export const updateProductById = createAsyncThunk(
  "products/getProductById",
  async (data: { productData: Partial<Omit<Product, "id">>; id: string }) => {
    const response = await axios.put(
      `http://localhost:3001/api/products/update/${data.id}`,
      data.productData
    );
    return response.data;
  }
);

export const deleteProductById = createAsyncThunk(
  "products/getProductById",
  async (productId: string) => {
    const response = await axios.delete(
      `http://localhost:3001/api/products/delete/${productId}`
    );
    return response.data;
  }
);