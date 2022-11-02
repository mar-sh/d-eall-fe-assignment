import React from "react";

import HeaderDefault from "./headerDefault";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderDefault />
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
