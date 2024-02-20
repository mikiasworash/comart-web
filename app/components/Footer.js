import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-800 w-full">
      <div className="max-w-7xl h-30 pt-8 pb-4 mt-24 flex flex-col mx-auto  items-center shadow-inner relative">
        <Link href="/" className="mb-6 inline-block max-w-[160px]">
          <Image className="h-5 w-auto" src={logo} alt="" />
        </Link>
        <p className="text-white">
          Copyright <span className="text-lg">&copy; </span>{" "}
          {new Date().getFullYear()} - All Rights Reserved.
        </p>
        {/* <p className="text-sm text-gray-400 sm:text-center mt-3">
          Made with ❤️ by{" "}
          <a
            href="http://mikiasworash.vercel.app"
            target="_blank"
            className="text-green-500 hover:underline underline-offset-4"
          >
            M
          </a>
        </p> */}
        <div className="flex items-center gap-5 my-4 text-white">
          <Link href="#">
            <div className="rounded-full shadow-lg shadow-gray-600 p-3 cursor-pointer hover:scale-125 ease-in duration-300">
              <FaInstagram />
            </div>
          </Link>
          <Link href="#">
            <div className="rounded-full shadow-lg shadow-gray-600 p-3  cursor-pointer hover:scale-125 ease-in duration-300">
              <FaFacebook />
            </div>
          </Link>
          <Link href="#">
            <div className="rounded-full shadow-lg shadow-gray-600 p-3  cursor-pointer hover:scale-125 ease-in duration-300">
              <FaTwitter />
            </div>
          </Link>
          <Link href="#">
            <div className="rounded-full shadow-lg shadow-gray-600 p-3  cursor-pointer hover:scale-125 ease-in duration-300">
              <FaTelegram />
            </div>
          </Link>
        </div>

        <div>
          <span className="absolute top-10 right-10 ">
            <svg
              width={75}
              height={75}
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
                fill="url(#paint0_linear_1179_4)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1179_4"
                  x1="-1.63917e-06"
                  y1="37.5"
                  x2={75}
                  y2="37.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#13C296" stopOpacity="0.31" />
                  <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
