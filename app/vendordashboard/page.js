"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [tabIndex, setTabIndex] = useState("1");

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

      fetch(`/api/products/${userInfo._id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data);
          setLoading(false);
        });
    }
  }, [router, userInfo]);

  if (isLoading || !userInfo) {
    return (
      <div className="mt-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div class="flex flex-col h-screen bg-gray-100">
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
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
                Manage Products
              </h2>
              <Link
                href="/vendordashboard/addproduct"
                className="w-48 rounded-md flex items-center justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add a new product
              </Link>
            </div>

            <div className="mt-6  gap-x-6 gap-y-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Product category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">Price</div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {products.map((product) => (
                    <tbody key={product._id}>
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                        >
                          {product.name}
                        </th>
                        <td className="px-6 py-4">{product.category.name}</td>
                        <td className="px-6 py-4">{product.price}</td>
                        <td className="px-6 py-4 text-right">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-4 justify-end">
                            <Link
                              href={`/vendordashboard/updateproduct/${product._id}`}
                            >
                              <AiTwotoneEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteCategory(product._id)}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
                Manage Products
              </h2>
              <Link
                href="/vendordashboard/addproduct"
                className="w-48 rounded-md flex items-center justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add a new product
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorDashboard;
