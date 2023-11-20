"use client";
import { createContext, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [isOrderLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Get all orders
  const getOrders = async () => {
    try {
      const res = await axios.get(`/api/orders`);
      setOrders(res.data.orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  // Get all orders
  const getOrdersByVendor = async (vendorId) => {
    try {
      const res = await axios.get(`/api/orders/${vendorId}`);
      setOrders(res.data.orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        isOrderLoading,
        orders,
        getOrders,
        getOrdersByVendor,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
