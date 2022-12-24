import { apiSlice } from "app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => `products`,
    }),
    getProduct: build.query({
      query: (productID) => `products/${productID}`,
    }),
    getProductVariations: build.query({
      query: (productID) => `products/${productID}/variations`,
    }),
    getAttributeTerms: build.query({
      query: (attributeID) => `products/attributes/${attributeID}/terms`,
    }),
    getSearchedProducts: build.query({
      query: (search) => `products?search=${search}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetProductVariationsQuery,
  useGetAttributeTermsQuery,
  useGetSearchedProductsQuery,
} = productApiSlice;
