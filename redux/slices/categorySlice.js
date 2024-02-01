import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesPaginated: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesPaginated: (state, action) => {
      state.categoriesPaginated = action.payload;
    },
  },
});

export const { setCategories, setCategoriesPaginated } = categorySlice.actions;

export default categorySlice.reducer;
