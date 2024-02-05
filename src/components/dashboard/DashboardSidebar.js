import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { imgUrl } from "helpers/path";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="py-5">
      <img
        className="rounded-full mx-auto pb-3 w-[120] h-[120px]"
        draggable={false}
        src={imgUrl + "/kisan.png"}
        alt="avatar"
      />
      <hr />
      <div className="pt-5 pl-5 leading-10">
        <p
        onClick={()=>navigate("/dashboard")}
          className={`font-Josefin text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/dashboard" ? "text-primary" : ""
          }`}
        >
          Dashboard
        </p>

        <p
         onClick={()=>navigate("/products/my")}
          className={`font-Josefin text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname.includes("/products") ? "text-primary" : ""
          }`}
        >
          Products
        </p>

        <p
        onClick={()=>navigate("/profile")}
          className={`font-Josefin text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/profile" ? "text-primary" : ""
          }`}
        >
          Profile
        </p>

        <p
         onClick={()=>navigate("/orders")}
          className={`font-Josefin text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/orders" ? "text-primary" : ""
          }`}
        >
          Orders
        </p>

        <p className="font-Josefin text-[20px] hover:text-primary hover:cursor-pointe">
          Log Out
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
