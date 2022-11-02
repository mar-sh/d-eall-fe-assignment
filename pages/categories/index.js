import React from "react";
import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "../../utils/config";

async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  const data = await res.json();

  return data;
}

function CategoriesPage(props) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    initialData: props.categories,
  });
  return <>{data && JSON.stringify(data, null, 4)}</>;
}

export async function getStaticProps() {
  const categories = await fetchCategories();

  return { props: { categories } };
}

export default CategoriesPage;
