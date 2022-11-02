import React from "react";
import { useRouter } from "next/router";

const Books = () => {
  const {query} = useRouter();
  return <div>{JSON.stringify(query, null ,4)}</div>;
};

export default Books;
