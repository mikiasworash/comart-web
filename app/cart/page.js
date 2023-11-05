"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import Link from "next/link";
import CartItem from "../components/cart/cartItem";
import { calculateTotals, getCartItems } from "../../redux/slices/cartSlice";

export default function Cart() {
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, isLoading, total, amount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartItems(userInfo._id));
    } else {
      router.replace("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !userInfo)
    return (
      <div className="h-screen mt-32">
        <Spinner />
        <h1 className="text-center mt-8 text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading
          </span>{" "}
          cart...
        </h1>
      </div>
    );

  if (amount < 1)
    return (
      <div className="h-screen mt-32">
        <h1 className="text-center mt-8 text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Your cart is
          </span>{" "}
          empty...
        </h1>
      </div>
    );

  return (
    <div className="w-fit mx-auto h-screen">
      <div className="inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex h-full flex-col justify-center items-center bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <h1 className="mb-4 text-xl font-extrabold text-gray-800 md:text-2xl w-fit mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Shopping
              </span>{" "}
              Cart
            </h1>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((cartItem) => (
                    <CartItem key={cartItem._id} cartItem={cartItem} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900 md:w-[32rem]">
              <p className="mr-2">Total</p>
              <p>
                ETB{" "}
                <span className="font-bold">
                  {total
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
