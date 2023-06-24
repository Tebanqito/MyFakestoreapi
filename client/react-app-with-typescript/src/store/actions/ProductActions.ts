import { Product } from "../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`http://localhost:3001/api/products`);
    return response.data;
});

export const getProductById = createAsyncThunk("products/getProductById", async (productId: string) => {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
    return response.data;
});