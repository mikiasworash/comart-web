"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "../components/Spinner";
import CartItem from "../components/cart/cartItem";
import { toast } from "react-hot-toast";
import { clearCart } from "../../redux/slices/cartSlice";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleCheckout = async () => {
    setLoading(true);
    let inStock = true;

    for (const item of cartItems) {
      try {
        const res = await axios.get(
          `/api/products/product/${item.product._id}`
        );
        if (res) {
          if (item.amount > res.data.product.quantity) {
            toast.error(
              `Sorry, "${res.data.product.name}" is currently limited to ${res.data.product.quantity}  units in stock`,
              {
                duration: 5000,
              }
            );

            inStock = false;
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        inStock = false;
        setLoading(false);
        toast.error("Error, try again later");
      }
    }

    if (inStock) {
      try {
        const res = await axios.post("/api/payment", {
          amount: total,
          currency: "ETB",
          email: userInfo.email,
          first_name: userInfo.name.split(" ")[0],
          last_name: userInfo.name.split(" ")[1],
          phone_number: userInfo.phone,
          callback_url:
            "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
          return_url: "http://localhost:3000/payment-success",
          "customization[title]": "Payment for comart",
          "customization[description]":
            "Comart customer is paying a merchant for a product using chapa",
        });

        if (res.data.status == "success") {
          const orderRes = await axios.post("api/orders", {
            tx_ref: res.data.tx_ref,
          });
          if (orderRes) {
            dispatch(clearCart);
            setLoading(false);
            router.replace(res.data.data.checkout_url);
          }
        } else {
          setLoading(false);
          toast.error("Payment failed");
        }
      } catch (err) {
        setLoading(false);
        toast.error("Payment failed");
      }
    }
  };

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
      <div className="inset-y-0 right-0 flex max-w-full">
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
            <div className="flex justify-between text-base font-medium text-gray-900 md:w-[32rem] w-60">
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
            {loading && (
              <div className="mt-4">
                <Spinner />
                <h1 className="text-center mt-8 text-xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Checking for products
                  </span>{" "}
                  in stock...
                </h1>
              </div>
            )}
            <div className="mt-6">
              <div
                onClick={handleCheckout}
                className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 hover:cursor-pointer"
              >
                Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
