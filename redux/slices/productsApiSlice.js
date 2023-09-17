import { apiSlice } from "./apiSlice";
const PRODUCTS_URL = "/api/products";

export const productsApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}/:id`,
        method: "PUT",
        body: data,
      }),
    }),
    getProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "GET",
      }),
    }),
    getProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/:id`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductsMutation,
  useGetProductMutation,
} = productsApiSlices;
