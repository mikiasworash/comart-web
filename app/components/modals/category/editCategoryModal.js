import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetCategoriesPaginatedMutation } from "../../../../redux/slices/categoriesApiSlice";
import { setCategoriesPaginated } from "../../../../redux/slices/categorySlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function EditCategoryModal({ showEditModal, category, page, closeEditModal }) {
  const dispatch = useDispatch();
  const [CategoryName, setCategoryName] = useState(category.name);
  const [categoryDescription, setCategoryDescription] = useState(
    category.description
  );

  const [getCategoriesPaginated] = useGetCategoriesPaginatedMutation();

  const submitEditHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/categories/${category._id}`, {
        name: CategoryName,
        description: categoryDescription,
      });
      if (res) {
        const newCategories = await getCategoriesPaginated(page).unwrap();
        dispatch(setCategoriesPaginated(newCategories.categories));
      }
      toast.success("Category updated");
      closeEditModal();
    } catch (error) {
      toast.error("Updating Category failed");
      console.error("Error:", error);
    }
  };

  if (!showEditModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 mx-auto bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Category</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={submitEditHandler}>
                  <div>
                    <label
                      htmlFor="categoryname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={CategoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Enter description"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={closeEditModal}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default EditCategoryModal;
