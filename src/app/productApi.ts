import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const consumerKey = "ck_6b930278029a3b1ff9aa5d67398a5eece868e56f";
const consumerSecret = "cs_e4cede534905be5c38ba81b488aee74589d16e23";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost/ecofreaky/wp-json/wc/v3/products/",
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
    getProduct: builder.query({
      query: (id) => `${id}`,
    }),
    getCategoryProducts: builder.query({
      query: (categoryID) => `?category=${categoryID}`,
    }),
    attributes: builder.query<any, void>({
      query: () => `/attributes`,
    }),
    attributeTerms: builder.query<any, string>({
      query: (id) => `/attributes/${id}/terms`
    }),
    getProductVariations: builder.query<any, string>({
      query: (productID) => `/${productID}/variations`
    })
  }),
});

export const { 
  useGetProductQuery,
  useGetCategoryProductsQuery,
  useAttributesQuery, 
  useAttributeTermsQuery ,
  useGetProductVariationsQuery
} = productApi;
