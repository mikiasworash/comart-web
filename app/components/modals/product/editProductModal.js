import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import CategoryContext from "../../../context/CategoryContext";

function editProductModal({ showEditModal, product, closeEditModal }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [category, setCategory] = useState(product.category._id);

  const [selectedImage, setSelectedImage] = useState(null);

  const { categories, searchCategories } = useContext(CategoryContext);

  useEffect(() => {
    searchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
    } else {
      try {
        let productPhoto = product.photo;
        if (selectedImage) {
          const formData = new FormData();
          formData.append("file", selectedImage);
          formData.append("upload_preset", "comart_product_images");

          const cloudinaryRes = await axios.post(
            process.env.cloudinaryURL,
            formData
          );

          const { secure_url } = cloudinaryRes.data;
          productPhoto = secure_url;
        }

        await axios.put(`/api/products/${product._id}`, {
          name,
          description,
          category,
          price,
          quantity,
          photo: productPhoto,
        });
        toast.success("Product updated");
        closeEditModal();
      } catch (error) {
        toast.error("Updating product failed");
        console.error("Error:", error);
      }
    }
  };

  if (!showEditModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 w-96 mx-auto rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Product</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="space-y-6" onSubmit={submitHandler}>
                <div className="flex gap-1 justify-center w-fit mx-auto">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={
                      product.photo === "default"
                        ? "https://placehold.co/100x100"
                        : product.photo
                    }
                    alt="user image"
                    width={300}
                    height={300}
                  />
                  <div className="mt-2">
                    <input
                      type="file"
                      id="imageInput"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageInput"
                      className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-400 file:text-white
                    hover:file:bg-indigo-500 cursor-pointer"
                    >
                      <div>
                        <div class="flex mt-10 rounded-xl hover:rounded-3xl transition-all duration-300 text-green">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </div>
                      </div>
                    </label>
                    {selectedImage && (
                      <p className="text-gray-500 mt-2">{selectedImage.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="productname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter product name"
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Quantity
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      >
                        <option disabled selected>
                          Choose Category
                        </option>
                        {categories.map((category) => (
                          <Fragment key={category._id}>
                            <option value={category._id}>
                              {category.name}
                            </option>
                          </Fragment>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

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
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default editProductModal;
