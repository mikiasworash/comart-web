"use client";
import Link from "next/link";
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
      router.replace("/admindashboard");
    } else {
      setName(userInfo.name);
      setTabIndex(1);
      searchProducts(userInfo._id);
    }
  }, [router, userInfo, isProductLoading]);

  if (isProductLoading || !userInfo) {
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
              VENDOR DASHBOARD
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
              <i className="fas fa-home mr-2"></i>Product Management
            </button>
            <button
              onClick={() => setTabIndex(2)}
              className={`block text-gray-500 w-56 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-300 hover:text-white ${
                tabIndex === 2 ? "bg-indigo-500 text-white" : ""
              }`}
              href="#"
            >
              <i className="fas fa-file-alt mr-2"></i>Other Management
            </button>
          </nav>
        </div>

        {tabIndex === 1 ? (
          <ProductList />
        ) : (
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
                Other Management
              </h2>
            </div>
            {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src="/products/prod1.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category.name}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ETB {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorDashboard;
