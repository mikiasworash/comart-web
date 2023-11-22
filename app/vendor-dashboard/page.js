"use client";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import ProductContext from "../context/ProductContext";
import ProductList from "../components/products/productList";
import OrderList from "../components/orders/orderList";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

function VendorDashboard() {
  const [name, setName] = useState("");
  const [tabIndex, setTabIndex] = useState("1");

  const { isProductLoading, searchProducts, products } =
    useContext(ProductContext);

  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "vendor") {
      router.replace("/");
    } else {
      setName(userInfo.name);
      setTabIndex(1);
      searchProducts(userInfo._id);
    }
  }, [router, userInfo, isProductLoading]);

  if (isProductLoading || !userInfo) {
    return (
      <div className="h-screen mt-32">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" bg-white flex flex-1">
      <div
        className="p-2 bg-[#eff1fa] w-72 flex flex-col min-h-screen -mt-10 -mb-24"
        id="sideNav"
      >
        <div className="max-w-2xl px-4 pt-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-4">
          <h1 className="text-lg w-full text-center mb-4 font-bold tracking-tight text-gray-900 border-b border-solid border-gray-800">
            VENDOR DASHBOARD
          </h1>
          <h1 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Welcome,{" "}
            <span className="text-xl font-bold tracking-tight text-gray-900">
              {name}!
            </span>
          </h1>
        </div>
        <nav>
          <button
            onClick={() => setTabIndex(1)}
            className={`block text-gray-500 w-64 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white ${
              tabIndex === 1 ? "bg-gray-800 text-white" : ""
            }`}
          >
            <div className="flex gap-x-2 justify-center items-center">
              <MdProductionQuantityLimits /> Products
            </div>
          </button>
          <button
            onClick={() => setTabIndex(2)}
            className={`block text-gray-500 w-64 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white ${
              tabIndex === 2 ? "bg-gray-800 text-white" : ""
            }`}
          >
            <div className="flex gap-x-2 justify-center items-center">
              <CiBoxList /> Orders
            </div>
          </button>
        </nav>
      </div>

      {tabIndex === 1 ? <ProductList /> : <OrderList />}
    </div>
  );
}

export default VendorDashboard;
