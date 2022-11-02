import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import Card from "../../../components/card";
import Pagination from "../../../components/pagination";
import InputFilter from "../../../components/inputFilter";

import { BASE_URL } from "../../../utils/config";

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

  const onNextPage = () => {
    setQueries((prev) => ({ ...prev, page: Number(queries.page) + 1 }));
  };

  const onPreviousPage = () => {
    setQueries((prev) => ({ ...prev, page: Number(queries.page) - 1 }));
  };

  const { isLoading, data } = useQuery({
    queryKey: ["books", queries.categoryId, queries.size, queries.page],
    queryFn: () => fetchBooks(new URLSearchParams(queries).toString()),
    initialData: props.books,
    keepPreviousData: true,
    select: (books) => {
      return books.filter((book) => {
        return (
          book.title.includes(searchValue) ||
          book.authors.some((author) => author.includes(searchValue))
        );
      });
    },
  });

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2">
        {data.map((book) => (
          <div className="p-3" key={book.id}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { categoryId, page, size } = query;

    const queries = new URLSearchParams({
      categoryId: categoryId,
      page: page || 0,
      size: size || 10,
    });

    const books = await fetchBooks(queries.toString());

    return { props: { books } };
  } catch (error) {
    console.error(error);
    return { props: { books: [] } };
  }
}

export default Books;
