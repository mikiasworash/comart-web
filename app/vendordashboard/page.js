"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/signin");
    } else if (userInfo.role !== "vendor") {
      router.replace("/admindashboard");
    } else {
      setName(userInfo.name);

      fetch(`/api/products/${userInfo._id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data);
          setLoading(false);
        });
    }
  }, [router, userInfo]);

  if (isLoading || !userInfo) {
    return (
      <div className="mt-16">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Link
        href="/vendordashboard/addproduct"
        className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add a new Product
      </Link>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-sm font-bold tracking-tight text-gray-900">
            VENDOR DASHBOARD
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome, {name}!
          </h1>
          <h2 className="text-2xl tracking-tight text-gray-900">
            Browse your listings
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src="/products/prod1.jpg"
                    alt=""
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboard;
