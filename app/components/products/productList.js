"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { setProducts, setProduct } from "../../../redux/slices/productSlice";
import {
  useGetProductsMutation,
  useGetProductsByVendorMutation,
} from "../../../redux/slices/productsApiSlice";
import Pagination from "../pagination";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import Spinner from "../Spinner";

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
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToChange, setProductToChange] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  const [getProducts, { isLoading: isProductLoading }] =
    useGetProductsMutation();
  const [getProductsByVendor, { isLoading: isProductsByVendorLoading }] =
    useGetProductsByVendorMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getAllProducts = async () => {
    try {
      const res = await getProducts({ page: currentPage, limit: 5 }).unwrap();
      dispatch(setProducts(res.products));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const getAllProductsByVendor = async () => {
    try {
      const res = await getProductsByVendor({
        userId: userInfo._id,
        page: currentPage,
      }).unwrap();
      dispatch(setProducts(res.products));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    userInfo.role == "admin" ? getAllProducts() : getAllProductsByVendor();
  }, [currentPage]);

  const handleFeature = async (product) => {
    try {
      await axios.put(`/api/products/feature/${product._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Feature status updated");
      getAllProducts({ page: currentPage, limit: 5 });
    } catch (error) {
      toast.error("Feature status update failed");
      console.error("Error:", error);
    }
  };

  if (isProductLoading || isProductsByVendorLoading) {
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
          Products
        </h2>
        {userInfo?.role == "vendor" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="w-32 mr-8 rounded-md flex items-center justify-center bg-gray-800 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <IoMdAdd className="mr-2" /> Add New
          </button>
        )}
      </div>

      <div>
        {showAddModal && (
          <AddProductModal
            showAddModal={showAddModal}
            page={currentPage}
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
                {userInfo?.role === "admin" && (
                  <th scope="col" className="px-6 py-3">
                    Vendor
                  </th>
                )}

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
            {products?.map((product) => (
              <tbody key={product._id}>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                  >
                    <img
                      className="h-12 w-12 mb-2 rounded-lg mx-auto"
                      src={
                        product.photo == "default"
                          ? "https://placehold.co/100x100"
                          : product.photo
                      }
                      alt="product image"
                      width={300}
                      height={300}
                    />
                    <Link
                      href={`/products/${product._id}`}
                      onClick={() => dispatch(setProduct(product))}
                    >
                      {product.name}
                    </Link>
                  </th>
                  {userInfo?.role === "admin" && (
                    <td className="px-6 py-4">{product.vendor.name}</td>
                  )}
                  <td className="px-6 py-4">{product.category.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className={`px-6 py-4 font-bold`}>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      {product.featured ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>
                      )}
                    </span>
                    {product.featured ? "Featured" : "Not Featured"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-center">
                      {userInfo?.role === "vendor" ? (
                        <>
                          <button
                            onClick={() => {
                              setProductToChange(product);
                              setShowEditModal(true);
                            }}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-400 to-blue-600 group-hover:from-yellow-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-200"
                          >
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                              Edit
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setProductToChange(product);
                              setShowDeleteModal(true);
                            }}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
                          >
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                              Delete
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setProductToChange(product);
                            handleFeature(product);
                          }}
                          className={`${
                            product.featured
                              ? "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
                              : "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
                          }`}
                        >
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            {product.featured
                              ? "Remove Feature"
                              : "Feature Product"}
                          </span>
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
                page={currentPage}
                closeEditModal={() => setShowEditModal(false)}
              />
            )}

            {showDeleteModal && (
              <DeleteProductModal
                showDeleteModal={showDeleteModal}
                product={productToChange}
                page={currentPage}
                closeDeleteModal={() => setShowDeleteModal(false)}
              />
            )}
          </div>
        </div>
      </div>

      <Pagination page={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default ProductList;
