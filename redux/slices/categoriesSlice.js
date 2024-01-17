import { apiSlice } from "./apiSlice";
const CATEGORIES_URL = "/api/categories";

export const categoriesApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
    }),
    getCategoriesPaginated: builder.mutation({
      query: (page) => ({
        url: `${CATEGORIES_URL}/paginated?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesMutation, useGetCategoriesPaginatedMutation } =
  categoriesApiSlices;
