"use client";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import CategoryContext from "../context/CategoryContext";
import CategoryList from "../components/categories/categoryList";
import ProductContext from "../context/ProductContext";
import ProductList from "../components/products/productList";
import VendorList from "../components/vendors/vendorList";

function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState("1");
  const [name, setName] = useState("");

  const { isCategoryLoading, searchCategories } = useContext(CategoryContext);
  const { isProductLoading, searchAllProducts, products } =
    useContext(ProductContext);

  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "admin") {
      router.replace("/");
    } else {
      setName(userInfo.name);
      setTabIndex(1);
      searchCategories();
      searchAllProducts();
    }
  }, [router, userInfo, isCategoryLoading]);

  if (isCategoryLoading || isProductLoading || !userInfo) {
    return (
      <div className="h-screen mt-32">
        <Spinner />
        <h1 className="text-center mt-8 text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading
          </span>{" "}
          Admin Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-white z-0">
      <div
        className="px-2 bg-[#eff1fa] w-72 flex flex-col min-h-screen -mt-10 -mb-24"
        id="sideNav"
      >
        <div className="max-w-2xl px-4 pt-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-4">
          <h1 className="text-lg w-full text-center mb-4 font-bold tracking-tight text-gray-900 border-b border-solid border-gray-800">
            ADMIN DASHBOARD
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
            <i className="fas fa-home mr-2"></i>Category Management
          </button>
          <button
            onClick={() => setTabIndex(2)}
            className={`block text-gray-500 w-64 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white ${
              tabIndex === 2 ? "bg-gray-800 text-white" : ""
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>Product Management
          </button>
          <button
            onClick={() => setTabIndex(3)}
            className={`block text-gray-500 w-64 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white ${
              tabIndex === 3 ? "bg-gray-800 text-white" : ""
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>Vendor Management
          </button>
          <button
            onClick={() => setTabIndex(4)}
            className={`block text-gray-500 w-64 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white ${
              tabIndex === 4 ? "bg-gray-800 text-white" : ""
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>Order Management
          </button>
        </nav>
      </div>

      {tabIndex === 1 ? (
        <CategoryList />
      ) : tabIndex === 2 ? (
        <ProductList />
      ) : tabIndex === 3 ? (
        <VendorList />
      ) : (
        <h1 className="text-center text-4xl m-32">Order Management</h1>
      )}
    </div>
  );
}

export default AdminDashboard;
