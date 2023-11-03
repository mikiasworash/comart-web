"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Link from "next/link";
import CartItem from "../components/cart/cartItem";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart/${userInfo._id}`);
        setCart(res.data.cart);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsLoading(false);
      }
    };

    fetchCart();
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

  if (!cart || cart.length === 0)
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
                    <CartItem cartItem={cartItem} />
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
