import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { imgUrl , imgPath} from "helpers/path";
import useLogout from "hooks/useLogout";
import { useSelector } from "react-redux";

const DashboardSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout()
  const {profileData} = useSelector((state)=> state.auth)

  return (
    <div className="py-5 w-full">
      <img
        className="rounded-full object-cover mx-auto pb-3 w-[120] h-[120px]"
        draggable={false}
        src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
        alt="avatar"
      />
      <hr />
      <div className="pt-5 pl-5 leading-10">
        <p
        onClick={()=>navigate("/dashboard")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/dashboard" ? "text-primary" : ""
          }`}
        >
          Dashboard
        </p>
        <p
        onClick={()=>navigate("/")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/" ? "text-primary" : ""
          }`}
        >
          Home
        </p>
        <p
         onClick={()=>navigate("/products/my")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname.includes("/products") ? "text-primary" : ""
          }`}
        >
          Products
        </p>

        <p
        onClick={()=>navigate("/profile")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/profile" ? "text-primary" : ""
          }`}
        >
          Profile
        </p>

        <p
         onClick={()=>navigate("/requests")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/requests" ? "text-primary" : ""
          }`}
        >
          Requests
        </p>
        <p
         onClick={()=>navigate("/bids")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/bids" ? "text-primary" : ""
          }`}
        >
          Bids
        </p>

        <p className="font-Roboto text-[20px] hover:text-primary hover:cursor-pointe" onClick={logout}>
          Log Out
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
