"use client";
import { createContext, useState } from "react";
import axios from "axios";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [isVendorLoading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);

  // Search for all vendors
  const searchVendors = async () => {
    try {
      const res = await axios.get(`/api/users/vendors`);
      if (res.data.success) {
        setVendors(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <VendorContext.Provider
      value={{
        isVendorLoading,
        vendors,
        searchVendors,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export default VendorContext;
