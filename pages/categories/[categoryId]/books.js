import React, { useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";

import Card from "../../../components/card";
import Pagination from "../../../components/pagination";
import InputFilter from "../../../components/inputFilter";

import { BASE_URL } from "../../../utils/config";
import parseCookie from "../../../utils/parseCookie";

async function fetchBooks(queries) {
  const fullUrl = `${BASE_URL}/api/books?${queries}`;

  const res = await fetch(fullUrl);

  const data = await res.json();

  return data;
}

function Books(props) {
  const { query } = useRouter();

  const [queries, setQueries] = useState(query);
  const [searchValue, setSearchValue] = useState("");
  const [bookmark, setBookmark] = useState(() =>
    JSON.parse(props.initialBookmark)
  );

  const { isLoading, isError, data } = useQuery({
    queryKey: ["books", queries.categoryId, queries.page],
    queryFn: () => fetchBooks(new URLSearchParams(queries).toString()),

    select: (books) => {
      return books.filter((book) => {
        return (
          book.title.includes(searchValue) ||
          book.authors.some((author) => author.includes(searchValue))
        );
      });
    },
  });

  const onNextPage = () => {
    setQueries((prev) => ({ ...prev, page: Number(queries.page) + 1 }));
  };

  const onPreviousPage = () => {
    setQueries((prev) => ({ ...prev, page: Number(queries.page) - 1 }));
  };

  const onBookmark = (book) => {
    const { id, title, description, cover_url, authors } = book;
    const bookmarked = {
      id,
      title,
      description,
      cover_url,
      authors,
    };

    if (bookmark && bookmark.length > 0) {
      const addedBookmark = bookmark.concat(bookmarked);

      setBookmark(addedBookmark);

      Cookie.set("bookmark", JSON.stringify(addedBookmark));
    } else {
      setBookmark([bookmarked]);
      Cookie.set("bookmark", JSON.stringify([bookmarked]));
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Something has gone wrong. Please try again later</div>;
    }

    if (data.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
          {data.map((book) => (
            <div className="p-3" key={book.id}>
              <Card
                book={book}
                bookmarked={Boolean(
                  (bookmark || []).find((item) => item.id === book.id)
                )}
                onBookmark={() => onBookmark(book)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No results were returned.</div>;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <InputFilter
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Pagination
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          currentPage={Number(queries.page) + 1}
          disabled={Boolean(searchValue)}
        />
      </div>
      {renderResult()}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const queryClient = new QueryClient();

  const { categoryId, page, size } = query;

  const queries = new URLSearchParams({
    categoryId: categoryId,
    page: page || 0,
    size: size || 10,
  });

  await queryClient.prefetchQuery({
    queryKey: ["books", categoryId, page],
    queryFn: () => fetchBooks(queries.toString()),
  });

  const cookies = parseCookie(req);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialBookmark: cookies.bookmark || null,
    },
  };
}

export default Books;
