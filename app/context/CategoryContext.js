"use client";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [isCategoryLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Search for all categories
  const searchCategories = () => {
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      });
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
