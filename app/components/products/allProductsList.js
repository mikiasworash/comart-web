"use client";
import { useEffect, useContext } from "react";
import Link from "next/link";
import ProductContext from "../../context/ProductContext";
import Spinner from "../Spinner";

function AllProductsList() {
  const { products, searchAllProducts, isProductLoading, setProduct } =
    useContext(ProductContext);

  useEffect(() => {
    searchAllProducts();
  }, []);

  if (isProductLoading) {
    return (
      <div className="h-screen mt-32">
        <Spinner />
        <h1 className="text-center mt-8">Loading All Products...</h1>
      </div>
    );
  }

  if (!products)
    return (
      <h1 className="text-2xl w-56 mx-auto my-64">No products to show yet!</h1>
    );

  return (
    <div className="flex flex-col p-4 mt-8 max-w-6xl mx-auto">
      <div className="">
        <h2 className="text-2xl tracking-tight text-gray-900">All Products</h2>
      </div>
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
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
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
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

export default AllProductsList;
