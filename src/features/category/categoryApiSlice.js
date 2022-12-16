import { apiSlice } from "app/api/apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: `products/categories`,
        credentials: "include",
      }),
    }),
    overrideExisting: false,
  }),
});

export const { useGetAllCategoryQuery } = categoryApiSlice;
