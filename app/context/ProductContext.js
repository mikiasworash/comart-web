"use client";
import { createContext, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isProductLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Search for products owned by a vendor
  const searchProducts = (userId) => {
    fetch(`/api/products/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  };
  return (
    <ProductContext.Provider
      value={{
        isProductLoading,
        products,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
