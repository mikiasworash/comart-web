"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import OrderContext from "../../context/OrderContext";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../Spinner";

function OrderList() {
  const { orders, getOrders, getOrdersByVendor, isOrderLoading } =
    useContext(OrderContext);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo.role == "admin" ? getOrders() : getOrdersByVendor(userInfo._id);
  }, []);

  if (isOrderLoading) {
    return (
      <div className="h-screen mt-32 mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="mt-6  gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Buyer
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
              </tr>
            </thead>
            {orders?.map((orderItem) =>
              orderItem.products.map((order) => (
                <tbody key={orderItem._id}>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                    >
                      {orderItem.buyer.name}
                    </th>
                    <td className="px-6 py-4">{order.product.name}</td>
                    <td className="px-6 py-4">{order.product.vendor.name}</td>
                    <td className="px-6 py-4">{orderItem.paymentStatus}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 justify-center">
                        <button>
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
              ))
            )}
          </table>
          {/* <div>

      {showDeleteModal && (
        <DeleteCategoryModal
          showDeleteModal={showDeleteModal}
          category={categoryToChange}
          closeDeleteModal={() => setDeleteShowModal(false)}
        />
      )}
    </div> */}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
