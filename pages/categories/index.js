import React from "react";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";

import CategoryPicker from "../../components/categoryPicker";
import { BASE_URL } from "../../utils/config";

async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  const data = await res.json();

  return data;
}

function CategoriesPage() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  return (
    <div className="page">
      <div className="mb-4">
        <h1 className="text-bold text-4xl mb-2">Browse Categories</h1>

        <hr />
      </div>
      <CategoryPicker categories={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default CategoriesPage;
