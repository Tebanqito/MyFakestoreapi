import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../types';
import axios from "axios";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/products`);
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false, error: null } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error desconocido';
      });
  },
});

export const selectProducts = (state: RootState) => state.products;
export default productSlice.reducer;