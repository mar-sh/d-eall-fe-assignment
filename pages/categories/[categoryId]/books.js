import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

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
    <div>
      <button
        onClick={() =>
          setQueries((prev) => ({ ...queries, page: Number(prev.page) + 1 }))
        }
      >
        Next Page
      </button>
      <button
        onClick={() =>
          setQueries((prev) => ({
            ...queries,
            page: Math.max(Number(prev.page) - 1, 0),
          }))
        }
      >
        Prev Page
      </button>
      <p>{data.length}</p>

      {JSON.stringify(data, null, 2)}
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
