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
    getProducts: builder.mutation({
      query: ({ page, limit = 8 }) => ({
        url: `${PRODUCTS_URL}/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getProductsByVendor: builder.mutation({
      query: ({ userId, page }) => ({
        url: `${PRODUCTS_URL}/vendor/${userId}?page=${page}`,
        method: "GET",
      }),
    }),
    getProductsByCategory: builder.mutation({
      query: ({ category, page }) => ({
        url: `${PRODUCTS_URL}/categories/${category}?page=${page}`,
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
    getFeaturedProducts: builder.mutation({
      query: (page) => ({
        url: `${PRODUCTS_URL}/featured?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductMutation,
  useGetProductsMutation,
  useGetProductsByVendorMutation,
  useGetProductsByCategoryMutation,
  useGetProductsByNameMutation,
  useGetProductsForAutocompleteMutation,
  useGetFeaturedProductsMutation,
} = productsApiSlices;
