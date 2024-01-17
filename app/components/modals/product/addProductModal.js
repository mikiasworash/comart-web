import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useGetCategoriesMutation } from "../../../../redux/slices/categoriesSlice";

function addProductModal({ showAddModal, closeAddModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [getCategories, { isLoading }] = useGetCategoriesMutation();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await getCategories().unwrap();
        setCategories(res.categories);
      } catch (err) {
        toast.error(err?.data?.message);
      }
    };

    getAllCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      let productPhoto = "default";
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

      await axios.post("/api/products", {
        name,
        description,
        category,
        price,
        quantity,
        photo: productPhoto,
      });

      toast.success("Product added");
      closeAddModal();
    } catch (error) {
      toast.error("Adding Product failed");
      console.error("Error:", error);
    }
  };

  if (!showAddModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 w-96 mx-auto rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Product</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product photo
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-600 file:text-white
                    hover:file:bg-gray-500
                  "
                    />
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
                      placeholder="Enter price in ETB"
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
                    onClick={closeAddModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700"
                  >
                    Add
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

export default addProductModal;
