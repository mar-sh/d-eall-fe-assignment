import React, { useState } from "react";
import NextLink from "next/link";

const HeaderDefault = () => {
  const [expandMobileMenu, setExpandMobileMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <NextLink
          className="text-white no-underline hover:text-white hover:no-underline"
          href="/"
        >
          <span className="text-2xl pl-2">
            <i className="em em-grinning"></i> B3K3N
          </span>
        </NextLink>
      </div>

      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
          onClick={() => setExpandMobileMenu((prevState) => !prevState)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto  lg:block pt-6 lg:pt-0 ${
          expandMobileMenu ? "flex" : "hidden"
        }`}
      >
        <ul className="list-reset lg:flex justify-start flex-1 items-center">
          <li className="mr-3">
            <NextLink
              className="inline-block py-2 px-4 text-white no-underline"
              href="/categories"
            >
              Categories
            </NextLink>
          </li>
          <li className="mr-3">
            <NextLink
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="/bookmark"
            >
              My Bookmark
            </NextLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderDefault;
