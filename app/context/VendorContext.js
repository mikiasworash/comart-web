"use client";
import { createContext, useState } from "react";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [isVendorLoading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);

  // Search for all vendors
  const searchVendors = () => {
    fetch(`/api/users/vendors`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendors(data.data);
          setLoading(false);
        }
      });
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
