import { createSlice } from "@reduxjs/toolkit";
import { Product, User } from "../types/types";
import { RootState } from "../store";
import {
  fetchProducts,
  getProductById,
} from "./actions/ProductActions";

interface ProductState {
  products: Product[];
  product: Partial<Product>;
  ownUser: Partial<User>;
  loading: boolean;
  error: string | null;
}

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, error: null, ownUser: {}, product: {} } as ProductState,
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
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error desconocido";
      });
  },
});

export const selectProducts = (state: RootState) => state.products;
export default productSlice.reducer;