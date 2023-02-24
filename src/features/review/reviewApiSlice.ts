import { apiSlice } from "app/api/apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProductReview: build.query({
      query: (productID) => `products/reviews/${productID}`,
    }),
    createProductReview: build.mutation({
      query: (review) => ({
        url: "products/reviews",
        method: "POST",
        body: review,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetProductReviewQuery, useCreateProductReviewMutation } =
  reviewApiSlice;
