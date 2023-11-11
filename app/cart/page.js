"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Link from "next/link";
import CartItem from "../components/cart/cartItem";

export default function Cart() {
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, isLoading, total, amount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "buyer") {
      router.replace("/");
    }
  }, []);

  if (isLoading)
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

  if (!isLoading && amount < 1)
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
    <div className="w-fit mx-auto min-h-screen">
      <div className="inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex h-full flex-col justify-center items-center bg-white">
          <div className="flex-1 px-4 py-6 sm:px-6">
            <h1 className="mb-4 text-xl font-extrabold text-gray-800 md:text-2xl w-fit mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Shopping
              </span>{" "}
              Cart
            </h1>

            <div className="mt-8">
              <div className="">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((cartItem) => (
                    <CartItem key={cartItem._id} cartItem={cartItem} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6 z-0">
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
                className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
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
