import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import Card from "../../../components/card";
import Pagination from "../../../components/pagination";

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

  const { isLoading, data } = useQuery({
    queryKey: ["books", queries.categoryId, queries.size, queries.page],
    queryFn: () => fetchBooks(new URLSearchParams(queries).toString()),
    initialData: props.books,
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-col">
      <div className="flex ">
        <Pagination currentPage={Number(queries.page) + 1} />
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
