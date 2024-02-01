"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsMutation } from "../../../redux/slices/productsApiSlice";
import { setAllProducts, setProduct } from "../../../redux/slices/productSlice";
import Pagination from "../pagination";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";

function AllProductsList() {
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(true);
  const [getProducts] = useGetProductsMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await getProducts({ page: currentPage }).unwrap();
        dispatch(setAllProducts(res.products));
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="h-screen mt-32 lg:mt-48">
        <Spinner />
      </div>
    );
  }

  if (allProducts.length === 0 && currentPage > 1)
    return (
      <h1 className="text-center text-3xl w-fit h-screen mx-auto mt-48">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          No other Products
        </span>{" "}
        found!
        <button
          onClick={() => setCurrentPage(1)}
          className={`flex w-fit mx-auto mt-4 items-center justify-center px-4 h-10 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          } bg-white border border-gray-300 rounded-lg`}
        >
          Go Back
        </button>
      </h1>
    );

  if (allProducts.length === 0)
    return (
      <h1 className="text-center text-3xl w-fit h-screen mx-auto mt-48">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          No Products
        </span>{" "}
        found!
      </h1>
    );

  return (
    <div className="flex flex-col p-4 mt-8 max-w-6xl mx-auto min-h-screen">
      <div className="">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-800 md:text-4xl w-fit mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            All Our
          </span>{" "}
          Products
        </h1>
      </div>
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="group relative hover:cursor-pointer"
              onClick={() => dispatch(setProduct(product))}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={
                    product.photo === "default"
                      ? "https://placehold.co/400x300"
                      : product.photo
                  }
                  alt={product.name + " picture"}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-900 font-bold">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ETB {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Pagination page={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default AllProductsList;
