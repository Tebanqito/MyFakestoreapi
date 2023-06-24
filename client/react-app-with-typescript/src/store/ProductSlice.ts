import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import { RootState } from "../store";
import { fetchProducts } from "./actions/ProductActions";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const productSlice = createSlice({
  name: "products",
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
        state.error = action.error.message ?? "Error desconocido";
      });
  },
});

export const selectProducts = (state: RootState) => state.products;
export default productSlice.reducer;