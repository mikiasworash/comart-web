"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import ProductContext from "../../context/ProductContext";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
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

  const { products, searchProducts } = useContext(ProductContext);

  useEffect(() => {
    searchProducts(userInfo._id);
  }, [showAddModal, showEditModal, showDeleteModal]);

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
          Manage Products
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-40 rounded-md flex items-center justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </button>
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
                  <td className="px-6 py-4 text-right">{product.quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => {
                          setProduct(product);
                          setShowEditModal(true);
                        }}
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button
                        onClick={() => {
                          setProduct(product);
                          setShowDeleteModal(true);
                        }}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
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
                    <div>
                      {showAddModal && (
                        <AddProductModal
                          showAddModal={showAddModal}
                          closeAddModal={() => setShowAddModal(false)}
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

export default ProductList;
