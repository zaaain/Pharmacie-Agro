import React from "react";
import Layout from "layout/DashboardLayout"

const HomeDashboard = () => {
  return (
    <Layout>
    <div className="p-4">
      <div className="grid grid-cols-2 space-x-5">
        <div className="bg-white col-span-1 p-5 rounded-2xl border-t-secondary border-b-secondary border-l-primary border-r-primary border-2">
          <p className="text-[28px] font-bold font-JosefinBold text-primary">
            Total Order
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-primary">
              <p className="font-CatamaranBold text-white text-[50px]">10</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white p-5 rounded-2xl border-t-primary border-b-primary border-l-secondary border-r-secondary border-2">
          <p className="text-[28px] font-bold font-JosefinBold text-primary">
            Total Products
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-primary">
              <p className="font-CatamaranBold text-white text-[50px]">10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default HomeDashboard;
