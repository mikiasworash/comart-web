import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsByVendorQuery } from "../../../../redux/slices/productsApiSlice";
import { setProducts } from "../../../../redux/slices/productSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function DeleteProductModal({
  showDeleteModal,
  product,
  page,
  closeDeleteModal,
}) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: vendorProductsData, refetch: refetchVendorProducts } =
    useGetProductsByVendorQuery({ userId: userInfo?._id, page: page });

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/products/${product._id}`);

      if (res) {
        refetchVendorProducts();
        dispatch(setProducts(vendorProductsData.products));
      }

      toast.success("Product deleted");
      closeDeleteModal();
    } catch (error) {
      toast.error("Deleting product failed");
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
              <h3 className="text-3xl font-semibold">Delete Product</h3>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Are you sure you want to delete this product?
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
                onClick={() => handleDelete()}
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

export default DeleteProductModal;
