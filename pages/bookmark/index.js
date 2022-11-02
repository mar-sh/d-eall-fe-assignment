import dynamic from "next/dynamic";
import React from "react";

import useBookmarkStore from "../../store/bookmark";
import Card from "../../components/card";

const BookmarkPage = () => {
  const bookmark = useBookmarkStore((state) => state.bookmarks);

  if (!bookmark.length)
    return <div>You don&lsquot have any books in your bookmark section.</div>;

  return (
    <div>
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
