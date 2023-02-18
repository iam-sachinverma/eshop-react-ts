import { apiSlice } from "app/api/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "products",
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
    getUpsellsProducts: build.query({
      query: (upsell_ids) => `products?include=${upsell_ids}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetProductVariationsQuery,
  useGetAttributeTermsQuery,
  useGetSearchedProductsQuery,
  useGetUpsellsProductsQuery,
} = productApiSlice;
