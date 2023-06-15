import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await fetch(`http://localhost:3001/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al obtener los productos.');
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