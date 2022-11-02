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
    <>
      <CategoryPicker categories={data} />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default CategoriesPage;
