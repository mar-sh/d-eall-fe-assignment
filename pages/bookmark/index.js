import React, { Component } from "react";
import parseCookie from "../../utils/parseCookie";

import Card from "../../components/card";

const BookmarkPage = (props) => {
  const bookmark = JSON.parse(props.initialBookmark);

  if (!bookmark)
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

export function getServerSideProps({ req }) {
  const cookie = parseCookie(req);

  return {
    props: {
      initialBookmark: cookie.bookmark || null,
    },
  };
}

export default BookmarkPage;
