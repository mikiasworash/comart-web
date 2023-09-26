"use client";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import CategoryContext from "../context/CategoryContext";
import CategoryList from "../components/categories/categoryList";

function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState("1");
  const [name, setName] = useState("");

  const { isCategoryLoading, searchCategories } = useContext(CategoryContext);

  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "admin") {
      router.replace("/vendordashboard");
    } else {
      setName(userInfo.name);
      setTabIndex(1);
      searchCategories();
    }
  }, [router, userInfo, isCategoryLoading]);

  if (isCategoryLoading || !userInfo) {
    return (
      <div className="mt-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex">
        <div
          className="p-2 bg-white w-60 flex flex-col hidden md:flex"
          id="sideNav"
        >
          <div className="max-w-2xl px-4 pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-sm font-bold tracking-tight text-gray-900">
              ADMIN DASHBOARD
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
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
              href="#"
            >
              <i className="fas fa-home mr-2"></i>Category Management
            </button>
            <button
              onClick={() => setTabIndex(2)}
              className={`block text-gray-500 w-56 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-300 hover:text-white ${
                tabIndex === 2 ? "bg-indigo-500 text-white" : ""
              }`}
              href="#"
            >
              <i className="fas fa-file-alt mr-2"></i>Vendor Management
            </button>
            <button
              onClick={() => setTabIndex(3)}
              className={`block text-gray-500 w-56 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-300 hover:text-white ${
                tabIndex === 3 ? "bg-indigo-500 text-white" : ""
              }`}
              href="#"
            >
              <i className="fas fa-file-alt mr-2"></i>Order Management
            </button>
          </nav>
        </div>

        {tabIndex === 1 ? (
          <CategoryList />
        ) : tabIndex === 2 ? (
          <h1 className="text-center text-4xl m-32">Vendor Management</h1>
        ) : (
          <h1 className="text-center text-4xl m-32">Order Management</h1>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
