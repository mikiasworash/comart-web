"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import ProductContext from "../../context/ProductContext";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";

const AddProductModal = dynamic(
  () => import("../modals/product/addProductModal"),
  {
    ssr: false,
  }
);
const EditProductModal = dynamic(
  () => import("../modals/product/editProductModal"),
  {
    ssr: false,
  }
);
const DeleteProductModal = dynamic(
  () => import("../modals/product/deleteProductModal"),
  {
    ssr: false,
  }
);

function ProductList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToChange, setProduct] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const { products, searchProducts, searchAllProducts } =
    useContext(ProductContext);

  useEffect(() => {
    userInfo.role == "vendor"
      ? searchProducts(userInfo._id)
      : searchAllProducts();
  }, [showAddModal, showEditModal, showDeleteModal]);

  const handleFeature = async (product) => {
    try {
      await axios.put(`/api/products/feature/${product._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Feature status updated");
      searchAllProducts();
    } catch (error) {
      toast.error("Feature status update failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
          Manage Products
        </h2>
        {userInfo.role == "vendor" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="w-40 mr-8 rounded-md flex items-center justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        )}
      </div>

      <div>
        {showAddModal && (
          <AddProductModal
            showAddModal={showAddModal}
            closeAddModal={() => setShowAddModal(false)}
          />
        )}
      </div>

      <div className="mt-6 gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>

                <th scope="col" className="px-6 py-3">
                  Product category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
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
                    <img
                      className="h-12 w-12 mb-2 rounded-full hover:scale-[3] mx-auto"
                      src={
                        product.photo == "default"
                          ? "https://placehold.co/100x100"
                          : product.photo
                      }
                      alt="product image"
                      width={300}
                      height={300}
                    />
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.category.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td
                    className={`px-6 py-4 font-bold ${
                      product.featured ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.featured ? "Featured" : "Not Featured"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-center">
                      {userInfo.role === "vendor" ? (
                        <>
                          <button
                            onClick={() => {
                              setProduct(product);
                              setShowEditModal(true);
                            }}
                          >
                            <div class="flex items-center justify-center">
                              <div>
                                <button class="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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
                                </button>
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setProduct(product);
                              setShowDeleteModal(true);
                            }}
                          >
                            <div class="flex items-center justify-center">
                              <div>
                                <button class="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                                  <AiFillDelete className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setProduct(product);
                            handleFeature(product);
                          }}
                          className={`${
                            product.featured
                              ? "rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-300"
                              : "rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                          }`}
                        >
                          {product.featured
                            ? "Remove Feature"
                            : "Feature Product"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div>
            {showEditModal && (
              <EditProductModal
                showEditModal={showEditModal}
                product={productToChange}
                closeEditModal={() => setShowEditModal(false)}
              />
            )}

            {showDeleteModal && (
              <DeleteProductModal
                showDeleteModal={showDeleteModal}
                product={productToChange}
                closeDeleteModal={() => setShowDeleteModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
