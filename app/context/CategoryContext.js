"use client";
import { createContext, useState } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [isCategoryLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Get all categories
  const searchCategories = async () => {
    try {
      const res = await axios.get(`/api/categories`);
      setCategories(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        isCategoryLoading,
        categories,
        searchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
