"use client";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import ProductContext from "../context/ProductContext";
import ProductList from "../components/products/productList";

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
        <h1 className="text-center mt-8 text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading
          </span>{" "}
          Vendor Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <div
          className="p-2 bg-white w-60 flex flex-col hidden md:flex min-h-screen"
          id="sideNav"
        >
          <div className="max-w-2xl px-4 pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-md mb-4 font-bold tracking-tight text-gray-900">
              VENDOR DASHBOARD
            </h1>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Welcome,
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {name}!
            </h1>
          </div>
          <nav>
            <button
              onClick={() => setTabIndex(1)}
              className={`block text-gray-500 w-56 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-300 hover:text-white ${
                tabIndex === 1 ? "bg-indigo-500 text-white" : ""
              }`}
            >
              <i className="fas fa-home mr-2"></i>Product Management
            </button>
            <button
              onClick={() => setTabIndex(2)}
              className={`block text-gray-500 w-56 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-300 hover:text-white ${
                tabIndex === 2 ? "bg-indigo-500 text-white" : ""
              }`}
            >
              <i className="fas fa-file-alt mr-2"></i>Order Management
            </button>
          </nav>
        </div>

        {tabIndex === 1 ? <ProductList /> : <h1>Order Management</h1>}
      </div>
    </div>
  );
}

export default VendorDashboard;
