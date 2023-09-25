"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
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

  const { isCategoryLoading, categories, searchCategories } =
    useContext(CategoryContext);

  useEffect(() => {
    searchCategories();
  }, [isCategoryLoading, showAddModal, showEditModal, showDeleteModal]);

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
          Manage Categories
        </h2>
        <button
          onClick={() => setAddShowModal(true)}
          className="w-40 rounded-md flex items-center justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Category
        </button>
      </div>

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
                      <button
                        onClick={() => {
                          setCategory(category);
                          setEditShowModal(true);
                        }}
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button
                        onClick={() => {
                          setCategory(category);
                          setDeleteShowModal(true);
                        }}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
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
                    <div>
                      {showAddModal && (
                        <AddCategoryModal
                          showAddModal={showAddModal}
                          closeAddModal={() => setAddShowModal(false)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
