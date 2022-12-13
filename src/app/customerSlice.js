import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const consumerKey = "ck_43431f987e7c2c06ac7ed43d9435c9196c62724a";
// const consumerSecret = "cs_6c203f7ca12dae935cd27188b71bd6f44ab65093";

// Localhost
const consumerKey = "ck_6b930278029a3b1ff9aa5d67398a5eece868e56f";
const consumerSecret = "cs_e4cede534905be5c38ba81b488aee74589d16e23";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://ecofreaky.backto.ga/wp-json/wc/v3/",
    baseUrl: "https://localhost/ecofreaky/wp-json/wc/v3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Basic " + btoa(consumerKey + ":" + consumerSecret)
      );
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => `/customer/${id}`,
    }),
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        body: customer,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCustomer, useCreateCustomerMutation } = customersApi;
