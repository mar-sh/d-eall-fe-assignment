import React from "react";

import HeaderDefault from "./headerDefault";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderDefault />
      <main>{children}</main>
    </>
  );
};

export default Layout;
