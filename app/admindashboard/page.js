"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import FormModal from "../components/formModal";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "admin") {
      router.replace("/vendordashboard");
    } else {
      setName(userInfo.name);

      fetch(`/api/categories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.data);
          setLoading(false);
        });
    }
  }, [router, userInfo, isLoading]);

  if (isLoading || !userInfo) {
    return (
      <div className="mt-16">
        <Spinner />
      </div>
    );
  }

  function handleDeleteCategory(categoryId) {
    fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        toast.error("Deleting Category failed");
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Link
        href="/admindashboard/addcategory"
        className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add a new Category
      </Link>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-sm font-bold tracking-tight text-gray-900">
            ADMIN DASHBOARD
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome, {name}!
          </h1>

          {/* Category Management */}
          <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
            Manage Categories
          </h2>

          <div className="mt-6  gap-x-6 gap-y-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Category name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Description</div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                {categories.map((category) => (
                  <tbody key={category._id}>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4">{category.description}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-end">
                          <Link
                            href={`/admindashboard/updatecategory/${category._id}`}
                          >
                            <AiTwotoneEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
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

          {/* Vendor Management */}
          <h2 className="mt-16 text-2xl tracking-tight text-gray-900">
            Manage Vendors
          </h2>

          <div className="mt-6  gap-x-6 gap-y-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Vendor name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Account Status</div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                {categories.map((category) => (
                  <tbody key={category._id}>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                      >
                        to do
                      </th>
                      <td className="px-6 py-4">to do</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
