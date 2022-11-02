import React, { useState } from "react";
import NextLink from "next/link";

function CategoryPicker(props) {
  const { categories } = props;

  return (
    <ul className="nav nav-pills flex flex-wrap flex-col md:flex-row list-none pl-0 mb-4">
      {categories.map((category) => {
        return (
          <li
            className="nav-item  text-center my-2 md:mr-2 text-white"
            role="presentation"
            key={category.id}
          >
            <NextLink
              href={`/categories/${category.id}/books?page=0&size=10`}
              className="
          nav-link
          bg-gray-800
          border-solid
          border-2
          border-white-500
          w-full
          block
          font-medium
          text-l
          leading-tight
          uppercase
          rounded-full
          px-6
          py-4
          focus:outline-none focus:ring-0
          hover:bg-gray-700
          
        "
            >
              {category.name}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryPicker;
