import React from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";

import useBookmarkStore from "../../store/bookmark";
import Card from "../../components/card";

const BookmarkPage = () => {
  const bookmark = useBookmarkStore((state) => state.bookmarks);

  if (!bookmark.length)
    return (
      <div className="wrapper-no-items flex flex-col items-center">
        <span className="mb-4">You don&apos;t have any books in your bookmark section yet.</span>
        <NextLink href="/categories" className="button bg-gray-800">
          Browse Books
        </NextLink>
      </div>
    );

  return (
    <div className="page">
      <div className="mb-4">
        <h1 className="text-bold text-4xl mb-2">My Bookmark</h1>

        <hr />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        {bookmark.map((book) => (
          <div className="p-3" key={book.id}>
            <Card
              book={book}
              bookmarked={Boolean(
                (bookmark || []).find((item) => item.id === book.id)
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const DynamicBookmarkPage = dynamic(() => Promise.resolve(BookmarkPage), {
  ssr: false,
});

export default DynamicBookmarkPage;
