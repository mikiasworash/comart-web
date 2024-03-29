import React from "react";
import { useDispatch } from "react-redux";
import { useGetCategoriesPaginatedMutation } from "../../../../redux/slices/categoriesApiSlice";
import { setCategoriesPaginated } from "../../../../redux/slices/categorySlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function DeleteCategoryModal({
  showDeleteModal,
  category,
  page,
  closeDeleteModal,
}) {
  const dispatch = useDispatch();

  const [getCategoriesPaginated] = useGetCategoriesPaginatedMutation();

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.delete(`/api/categories/${category._id}`);
      if (res) {
        const newCategories = await getCategoriesPaginated(page).unwrap();
        dispatch(setCategoriesPaginated(newCategories.categories));
      }
      toast.success("Category deleted");
      closeDeleteModal();
    } catch (error) {
      toast.error(error.response.data.message || "Deleting Category failed");
      console.error("Error:", error);
    }
  };

  if (!showDeleteModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Delete Category</h3>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Are you sure you want to delete this category?
              </p>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeDeleteModal}
              >
                Close
              </button>
              <button
                className="bg-red-500  text-white font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleDeleteCategory()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default DeleteCategoryModal;
