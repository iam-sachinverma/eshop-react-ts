import { apiSlice } from "app/api/apiSlice";

const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCustomer: build.query({
      query: (email) => `customers?email=${email}`,
    }),
    createCustomer: build.mutation({
      query: (customer) => ({
        url: "customers",
        method: "POST",
        body: customer,
        credentials: "include",
      }),
    }),
    updateCustomer: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `customers/${id}`,
        method: "POST",
        body: rest,
        credentials: "include",
      }),
    }),
    overrideExisting: false,
  }),
});

export const {
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customerApiSlice;
