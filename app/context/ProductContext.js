"use client";
import { createContext, useState } from "react";
import axios from "axios";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isProductLoading, setLoading] = useState(true);
  const [isFeaturedProductsLoading, setFeaturedProductsLoading] =
    useState(true);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isCategoryProductsLoading, setIsCategoryProductsLoading] =
    useState(true);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearchedProductsLoading, setIsSearchedProductsLoading] =
    useState(true);

  // Get products by category
  const getProductsByCategory = async (category) => {
    try {
      const res = await axios.get(`/api/products/categories/${category}`);
      setCategoryProducts(res.data.products);
      setIsCategoryProductsLoading(false);
    } catch (error) {
      setIsCategoryProductsLoading(false);
      console.error("Error:", error);
    }
  };

  // Get products by name
  const getProductsByName = async (query) => {
    try {
      const res = await axios.get(`/api/products/search/${query}`);
      setSearchedProducts(res.data.products);
      setIsSearchedProductsLoading(false);
    } catch (error) {
      setIsSearchedProductsLoading(false);
      console.error("Error:", error);
    }
  };

  // Get all products
  const searchAllProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  // Get products owned by a vendor
  const searchProducts = async (userId) => {
    try {
      const res = await axios.get(`/api/products/vendor/${userId}`);
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  // Get featured products
  const searchFeaturedProducts = async () => {
    try {
      const res = await axios.get("/api/products/featured");
      setFeaturedProducts(res.data.products);
      setFeaturedProductsLoading(false);
    } catch (error) {
      setFeaturedProductsLoading(false);
      console.error("Error:", error);
    }
  };

  // Get a single product
  const getProduct = async (productId) => {
    try {
      const res = await axios.get(`/api/products/product/${productId}`);
      setProduct(res.data.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        isProductLoading,
        products,
        product,
        categoryProducts,
        featuredProducts,
        searchedProducts,
        isFeaturedProductsLoading,
        isCategoryProductsLoading,
        isSearchedProductsLoading,
        setIsCategoryProductsLoading,
        setIsSearchedProductsLoading,
        searchProducts,
        searchAllProducts,
        searchFeaturedProducts,
        getProductsByCategory,
        getProductsByName,
        getProduct,
        setProduct,
        setCategoryProducts,
        setSearchedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
