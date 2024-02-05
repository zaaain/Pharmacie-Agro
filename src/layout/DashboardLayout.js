import React from "react";
import SideBar from "components/dashboard/DashboardSidebar";
import NavbarDashboard from "components/dashboard/NavbarDashboard";



const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-full grid grid-cols-12 p-5 space-x-10">
      <div className="h-full col-span-2 bg-white rounded-2xl shadow-dashboard">
        <SideBar />
      </div>
      <div className="h-full col-span-10 flex flex-col">
        <div className="w-full h-[80px] bg-white rounded-2xl shadow-dashboard">
          <NavbarDashboard />
        </div>
        <div
          className="flex-1 w-full bg-white shadow-dashboard rounded-2xl mt-5"
          style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
