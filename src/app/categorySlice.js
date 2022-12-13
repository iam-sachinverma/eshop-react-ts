import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wooCommerceRequest } from "services/axios";

const initialState = {
  categories: [],
  loading: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await wooCommerceRequest.get(`/products/categories`);
    return response?.data;
  }
);

const catgeorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = "rejected";
    },
  },
});

export default catgeorySlice.reducer;
