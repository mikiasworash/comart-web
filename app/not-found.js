import { FaHome } from "react-icons/fa";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex justify-center mx-auto h-screen mt-16">
      <div className="text-center mt-16">
        <div className="max-w-lg">
          <h1 className="text-7xl font-bold mb-8">Oops!</h1>
          <p className="text-4xl mb-8">404 - Page not found!</p>
          <Link
            className="w-fit mx-auto rounded-md flex items-center justify-center bg-gray-800 px-3 py-4 text-lg font-semibold leading-6 text-white  hover:bg-gray-700"
            href={"/"}
          >
            <FaHome className="mr-2" />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
