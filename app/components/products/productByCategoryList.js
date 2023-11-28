"use client";
import { useEffect, useContext } from "react";
import Link from "next/link";
import ProductContext from "../../context/ProductContext";
import { useParams } from "next/navigation";
import Spinner from "../Spinner";

function ProductsByCategoryList() {
  const params = useParams();
  const category = params.category;

  const {
    categoryProducts,
    getProductsByCategory,
    isCategoryProductsLoading,
    setIsCategoryProductsLoading,
    setProduct,
    setCategoryProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    setCategoryProducts([]);
    setIsCategoryProductsLoading(true);
    getProductsByCategory(category);
  }, [category]);

  if (!categoryProducts || isCategoryProductsLoading) {
    return (
      <div className="h-screen mt-32 lg:mt-48">
        <Spinner />
      </div>
    );
  }

  if (!categoryProducts || categoryProducts.length == 0)
    return (
      <h1 className="text-center text-3xl w-fit h-screen mx-auto mt-32">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          No Products found
        </span>{" "}
        under "{category}"
      </h1>
    );

  return (
    <div className="flex flex-col p-4 mt-8 max-w-6xl mx-auto min-h-screen">
      <div className="">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-800 md:text-4xl w-fit mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Category:
          </span>{" "}
          {category}
        </h1>
      </div>
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="group relative hover:cursor-pointer"
              onClick={() => setProduct(product)}
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
    </div>
  );
}

export default ProductsByCategoryList;