import Image from "next/image";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import heroImage from "../assets/img/hero.jpg";

function Hero() {
  return (
    <div className="h-96 rounded-md overflow-hidden bg-cover bg-center relative max-w-6xl mx-auto">
      <Image
        src={heroImage}
        alt="Hero Image"
        fill
        style={{objectFit:"cover"}}
        className="absolute z-0"
      />
      <div className="bg-gray-900 bg-opacity-50 flex items-center h-full absolute w-full z-10">
        <div className="px-10 max-w-xl">
          <h2 className="text-2xl text-white font-semibold">
            Welcome to Comart
          </h2>
          <p className="mt-2 text-gray-400">
            Discover an extensive range of high-quality building materials,
            tools, and equipment to fulfill all your construction needs.
          </p>
          <Link href={`/products`}>
            <button className="flex items-center mt-4 px-3 py-2 bg-gray-600 text-white text-sm uppercase font-medium rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
              <span>Shop Now </span>
              <FaAngleDoubleRight className="w-5 h-5 ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
