import { apiSlice } from "app/api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (customerID) => ({
        url: `orders?customer=${customerID}`,
        credentials: "include",
      }),
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    overrideExisting: false,
  }),
});

export const { useGetOrderQuery, useCreateOrderMutation } = orderApiSlice;
