import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  allProducts: [],
  featuredProducts: [],
  productsForAutoComplete: [],
  productsByCategory: [],
  searchedProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setProductsForAutoComplete: (state, action) => {
      state.productsForAutoComplete = action.payload;
    },
    setProductsByCategory: (state, action) => {
      state.productsByCategory = action.payload;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
  },
});

export const {
  setProduct,
  setProducts,
  setAllProducts,
  setFeaturedProducts,
  setProductsForAutoComplete,
  setProductsByCategory,
  setSearchedProducts,
} = productSlice.actions;

export default productSlice.reducer;
