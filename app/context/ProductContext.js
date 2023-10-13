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

  // Get all products
  const searchAllProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
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
      console.error("Error:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        isProductLoading,
        products,
        product,
        featuredProducts,
        isFeaturedProductsLoading,
        searchProducts,
        searchAllProducts,
        searchFeaturedProducts,
        getProduct,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
