"use client";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductContext from "../../context/ProductContext";
import Spinner from "../Spinner";
import { toast as hotToast } from "react-hot-toast";
import { getCartItems } from "../../../redux/slices/cartSlice";

function ProductDetail() {
  const { product, getProduct } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    getProduct(productId);
  }, []);

  const handleAddToCart = async () => {
    if (!userInfo || userInfo.role !== "buyer") {
      hotToast.error("please sign in as a customer first");
    } else {
      try {
        const res = await axios.post(`/api/cart/${product._id}`, {
          amount: quantity,
        });

        dispatch(getCartItems(userInfo._id));

        hotToast.success("product added to cart");
      } catch (error) {
        hotToast.error(error.response.data.message || "Adding Cart failed");
      }
    }
  };

  if (!product) {
    return (
      <div className="mt-32 h-screen">
        <Spinner />
        <h1 className="text-center mt-8 text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading
          </span>{" "}
          product info...
        </h1>
      </div>
    );
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mb-48 min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap lg:gap-16">
          <img
            className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200"
            src={
              product.photo === "default"
                ? "https://placehold.co/450x450"
                : product.photo
            }
            alt={product.name + " picture"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              PRODUCT NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">12 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex flex-col mt-6 pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="text-lg mr-3">CATEGORY :</span>
                <button className="text-lg font-bold">
                  {product.category.name}
                </button>
              </div>
              <div className="flex mt-4">
                <span className="text-lg mr-3">SELLER :</span>
                <button className="text-lg font-bold">
                  {product.vendor.name}
                </button>
              </div>
            </div>
            <div>
              <span className="title-font font-medium text-2xl text-gray-900">
                ETB {product.price}
              </span>
            </div>
            {userInfo ? (
              userInfo.role == "buyer" ? (
                <div className="flex mt-6 gap-6 items-left">
                  <input
                    type="number"
                    className="flex w-20 items-center rounded-lg border-none font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                    placeholder="1"
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button
                    className="flex text-white bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded-lg"
                    onClick={handleAddToCart}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinecap="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              ) : (
                ""
              )
            ) : (
              <div className="flex mt-6 gap-6 items-left">
                <input
                  type="number"
                  className="flex w-20 items-center rounded-lg border-none font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                  placeholder="1"
                  min="1"
                />
                <button
                  className="flex text-white bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded-lg"
                  onClick={handleAddToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinecap="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
