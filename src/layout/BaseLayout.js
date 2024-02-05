import React from "react";
import Navbar from "components/common/Navbar";
import Footer from "components/common/Footer";

const BaseLayout = ({ children }) => {
  return (
    <main className="min-h-screen min-w-[100%] flex flex-col">
      <Navbar />
      <div className="flex-1 grow">{children}</div>
      <Footer />
    </main>
  );
};

export default BaseLayout;
