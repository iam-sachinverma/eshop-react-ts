import { apiSlice } from "app/api/apiSlice";

export const categoryProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategoryProducts: build.query({
      query: (categoryID) => `products?category=${categoryID}`,
    }),
  }),
});

export const { useGetCategoryProductsQuery } = categoryProductApiSlice;
