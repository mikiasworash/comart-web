"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../Spinner";

const AddCategoryModal = dynamic(
  () => import("../modals/category/addCategoryModal"),
  {
    ssr: false,
  }
);
const EditCategoryModal = dynamic(
  () => import("../modals/category/editCategoryModal"),
  {
    ssr: false,
  }
);
const DeleteCategoryModal = dynamic(
  () => import("../modals/category/deleteCategoryModal"),
  {
    ssr: false,
  }
);

function CategoryList() {
  const [showAddModal, setAddShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [categoryToChange, setCategory] = useState("");

  const { categories, searchCategories, isCategoryLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    searchCategories();
  }, [showAddModal, showEditModal, showDeleteModal]);

  if (isCategoryLoading) {
    return (
      <div className="h-screen mt-32 mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl ml-10 font-bold tracking-tight text-gray-900">
          Categories
        </h2>
        <button
          onClick={() => setAddShowModal(true)}
          className="w-40 mr-8 rounded-md flex items-center justify-center bg-gray-800 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-gray-700"
        >
          Add Category
        </button>
      </div>

      <div>
        {showAddModal && (
          <AddCategoryModal
            showAddModal={showAddModal}
            closeAddModal={() => setAddShowModal(false)}
          />
        )}
      </div>

      <div className="mt-6  gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {categories?.map((category) => (
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
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => {
                          setCategory(category);
                          setEditShowModal(true);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <div>
                            <button className="flex p-2.5 bg-gray-600 rounded-xl hover:rounded-3xl hover:bg-gray-600 transition-all duration-300 text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setCategory(category);
                          setDeleteShowModal(true);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <div>
                            <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                              <AiFillDelete className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div>
            {showEditModal && (
              <EditCategoryModal
                showEditModal={showEditModal}
                category={categoryToChange}
                closeEditModal={() => setEditShowModal(false)}
              />
            )}

            {showDeleteModal && (
              <DeleteCategoryModal
                showDeleteModal={showDeleteModal}
                category={categoryToChange}
                closeDeleteModal={() => setDeleteShowModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
