"use client";
import { createContext, useState } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [isCategoryLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [isCategoryPaginatedLoading, setLoadingPaginated] = useState(true);
  const [categoriesPaginated, setCategoriesPaginated] = useState([]);

  // Get all categories
  const searchCategories = async () => {
    try {
      const res = await axios.get(`/api/categories`);
      setCategories(res.data.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  // Get all categories paginated
  const searchCategoriesPaginated = async (page) => {
    try {
      const res = await axios.get(`/api/categories/paginated?page=${page}`);
      setCategoriesPaginated(res.data.categories);
      setLoadingPaginated(false);
    } catch (error) {
      setLoadingPaginated(false);
      console.error("Error:", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        isCategoryLoading,
        categories,
        searchCategories,

        isCategoryPaginatedLoading,
        categoriesPaginated,
        searchCategoriesPaginated,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
