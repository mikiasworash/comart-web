import { apiSlice } from "./apiSlice";
const PRODUCTS_URL = "/api/products";

export const productsApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/product/${productId}`,
        method: "GET",
      }),
    }),
    getProducts: builder.query({
      query: ({ page, limit = 8 }) => ({
        url: `${PRODUCTS_URL}/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getProductsByVendor: builder.query({
      query: ({ userId, page }) => ({
        url: `${PRODUCTS_URL}/vendor/${userId}?page=${page}`,
        method: "GET",
      }),
    }),
    getProductsByCategory: builder.query({
      query: ({ category, page, limit = 8 }) => ({
        url: `${PRODUCTS_URL}/categories/${category}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getProductsByName: builder.mutation({
      query: (query) => ({
        url: `${PRODUCTS_URL}/search/${query}`,
        method: "GET",
      }),
    }),
    getProductsForAutocomplete: builder.mutation({
      query: (query) => ({
        url: `${PRODUCTS_URL}/search/autocomplete/${query}`,
        method: "GET",
      }),
    }),
    getFeaturedProducts: builder.query({
      query: ({ page, limit = 8 }) => ({
        url: `${PRODUCTS_URL}/featured?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductMutation,
  useGetProductsQuery,
  useGetProductsByVendorQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByNameMutation,
  useGetProductsForAutocompleteMutation,
  useGetFeaturedProductsQuery,
} = productsApiSlices;
