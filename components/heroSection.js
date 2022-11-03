import React from "react";
import NextLink from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 h-screen w-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          The best place to browse books
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          High performing individuals use B3K3N-Books to browse books.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <NextLink
            className="button"
            href="/categories"
          >
            Browse and Bookmark Now
          </NextLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
