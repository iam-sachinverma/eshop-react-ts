import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wooCommerceRequest } from "services/axios";

const initialState = {
  products: [],
  loading: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await wooCommerceRequest.get(`/products`);
    return response?.data;
  }
);

const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = "rejected";
    },
  },
});

export default productSlice.reducer;
