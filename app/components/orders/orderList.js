"use client";
import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import OrderContext from "../../context/OrderContext";
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
      <h2 className="mt-4 text-2xl ml-10 font-bold tracking-tight text-gray-900">
        Orders
      </h2>
      <div className="mt-6  gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Buyer
                </th>
                {userInfo.role == "admin" && (
                  <th scope="col" className="px-6 py-3">
                    Vendor
                  </th>
                )}
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
              </tr>
            </thead>
            {orders?.map((orderItem) =>
              orderItem.products.map((order) => (
                <tbody key={orderItem._id}>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 text-gray-900">
                      <img
                        className="h-12 w-12 mb-2 rounded-lg mx-auto"
                        src={
                          order.product.photo == "default"
                            ? "https://placehold.co/100x100"
                            : order.product.photo
                        }
                        alt="user image"
                        width={300}
                        height={300}
                      />
                      {order.product.name}
                    </td>
                    <td className="px-6 py-4">{order.quantity}</td>{" "}
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">
                      {order.price * order.quantity}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      <img
                        className="h-12 w-12 mb-2 rounded-lg mx-auto"
                        src={
                          orderItem.buyer.photo == "default"
                            ? "https://placehold.co/100x100"
                            : orderItem.buyer.photo
                        }
                        alt="user image"
                        width={300}
                        height={300}
                      />
                      {orderItem.buyer.name}
                    </td>
                    {userInfo.role == "admin" && (
                      <td className="px-6 py-4 text-gray-900">
                        <img
                          className="h-12 w-12 mb-2 rounded-lg mx-auto"
                          src={
                            order.product.vendor.photo == "default"
                              ? "https://placehold.co/100x100"
                              : order.product.vendor.photo
                          }
                          alt="user image"
                          width={300}
                          height={300}
                        />
                        {order.product.vendor.name}
                      </td>
                    )}
                    <td className={`px-6 py-4 font-bold`}>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {orderItem.paymentStatus == "paid" ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
                        ) : (
                          <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>
                        )}
                      </span>
                      {orderItem.paymentStatus}
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
