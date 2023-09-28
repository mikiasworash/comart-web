"use client";
import { createContext, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isProductLoading, setLoading] = useState(true);
  const [isFeaturedProductsLoading, setFeaturedProductsLoading] =
    useState(true);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Search for products owned by a vendor
  const searchAllProducts = (userId) => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  };

  // Search for products owned by a vendor
  const searchProducts = (userId) => {
    fetch(`/api/products/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  };

  // Search for featured products
  const searchFeaturedProducts = () => {
    fetch(`/api/products/featured`)
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.data);
        setFeaturedProductsLoading(false);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        isProductLoading,
        products,
        featuredProducts,
        isFeaturedProductsLoading,
        searchProducts,
        searchAllProducts,
        searchFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
