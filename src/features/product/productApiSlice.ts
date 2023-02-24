import { apiSlice } from "app/api/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "products",
    }),
    getProduct: build.query({
      query: (productID) => `products/${productID}`,
    }),
    getFeaturedProducts: build.query({
      query: (feature) => {
        return {
          url: `products`,
          params: { featured: feature },
        }
      }
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
      query: (upsell_ids) => {
        return {
          url: 'products',
          params: {include: upsell_ids}
        }
      }
      // query: (upsell_ids) => `products?include=${upsell_ids}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
  useGetProductVariationsQuery,
  useGetAttributeTermsQuery,
  useGetSearchedProductsQuery,
  useGetUpsellsProductsQuery,
} = productApiSlice;
