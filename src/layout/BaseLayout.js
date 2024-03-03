import React from "react";
import Navbar from "components/common/Navbar";
import Footer from "components/common/Footer";
import MobileNavBar from "components/common/MobileNavBar";
import {useWindowSize} from 'react-use';

const BaseLayout = ({ children }) => {
  
  const {width} = useWindowSize()
  return (
    <main className="min-h-screen min-w-[100%] flex flex-col">
      {width < 641 ? <MobileNavBar/> : <Navbar/>}
      <div className="flex-1 grow">{children}</div>
      <Footer />
    </main>
  );
};

export default BaseLayout;
