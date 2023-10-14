"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    }

    const fetchCart = async () => {
      try {
        setIsLoading(false);
        const res = await axios.get(`/api/cart/${userInfo._id}`);
        setCart(res.data.cart);
        console.log(res.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsLoading(false);
      }
    };

    fetchCart();
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

  return (
    <div className="w-fit mx-auto">
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
                  {cart.map((cartItem) => (
                    <li
                      key={cartItem.product._id}
                      className="flex py-6 lg:w-[32rem]"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={cartItem.product.photo}
                          alt={cartItem.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={cartItem.product._id}>
                                {cartItem.product.name}
                              </a>
                            </h3>
                            <p className="ml-4">{cartItem.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {cartItem.product.category.name}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex gap-2 items-center">
                            <p className="text-gray-500">Qty </p>
                            <input
                              type="number"
                              class="flex w-14 items-center rounded-lg border-none font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                              placeholder="1"
                              value={cartItem.amount}
                              min="1"
                            />
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-[32rem]">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p className="mr-2">Total</p>
              <p>$3260.50</p>
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
