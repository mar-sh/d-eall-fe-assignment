import React from "react";
import Image from "next/image";

function Card({ book, onBookmark, bookmarked }) {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <Image
          className="rounded-t-lg"
          alt="book cover"
          src={book.cover_url}
          width={400}
          height={250}
        />

        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {book.title} - {book.authors.join(", ")}
          </h5>
          <p className="text-gray-700 text-base mb-4">{book.description}</p>
          <button
            onClick={onBookmark}
            type="button"
            disabled={bookmarked}
            className=" inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
