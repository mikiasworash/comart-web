import { apiSlice } from "./apiSlice";
const ORDERS_URL = "/api/orders";

export const ordersApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.mutation({
      query: (page) => ({
        url: `${ORDERS_URL}?page=${page}`,
        method: "GET",
      }),
    }),
    getOrdersByVendor: builder.mutation({
      query: (vendorId, page) => ({
        url: `${ORDERS_URL}/${vendorId}?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrdersMutation, useGetOrdersByVendorMutation } =
  ordersApiSlices;
