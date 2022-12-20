import { apiSlice } from "app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => `products`,
    }),
    getProduct: build.query({
      query: (productID) => `products/${productID}`,
    }),
    getCategoryProducts: build.query({
      query: (categoryID) => `products?category=${categoryID}`,
    }),
    getProductVariations: build.query({
      query: (productID) => `products/${productID}/variations`,
    }),
    getAllAttributes: build.query({
      query: () => `products/attributes`,
    }),
    getAttributeTerms: build.query({
      query: (attributeID) => `products/attributes/${attributeID}/terms`,
    }),
    getCategoryProductsMaxMinPrice: build.query({
      query: ({ categoryID, min_price, max_price }) =>
        `products?category=${categoryID}&min_price=${min_price}&max_price=${max_price}`,
    }),
    getCategoryOnSaleProducts: build.query({
      query: ({ categoryID, OnSale }) =>
        `products?category=${categoryID}&on_sale=${OnSale}`,
    }),
    getSearchedProducts: build.query({
      query: ({ search }) => `products?search=${search}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetCategoryProductsQuery,
  useGetProductVariationsQuery,
  useGetAllAttributesQuery,
  useGetAttributeTermsQuery,
  useGetCategoryOnSaleProductsQuery,
  useGetCategoryProductsMaxMinPriceQuery,
  useGetSearchedProductsQuery,
} = productApiSlice;
