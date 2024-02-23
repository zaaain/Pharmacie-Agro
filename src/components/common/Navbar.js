import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./base/button";

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const handleClick = () =>{
    if(jwt){
      navigate("/dashboard")
    }else{
      navigate("/auth/login")
    }
  }

  return (
    <div className="bg-white border-b-2 border-primary  w-full z-140 px-5 py-2 flex items-center justify-between sticky top-0">
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        draggable={false}
        className="w-[200px] h-[60px]"
      />
      <div className="flex">
        <p
          onClick={() => navigate("/")}
          className={`font-Josefin text-[18px] cursor-pointer hover:text-primary mr-6 ${
            location.pathname === "/" ? "text-primary" : ""
          }`}
        >
          Home
        </p>
        <p
          onClick={() => navigate("/products/all", { replace: true })}
          className={`font-Josefin text-[18px] cursor-pointer hover:text-primary mr-6 ${
            location.pathname.includes("/products") ? "text-primary" : ""
          }`}
        >
          Products
        </p>
        <p
          onClick={() => navigate("/agri-network", { replace: true })}
          className={`font-Josefin text-[18px] cursor-pointer hover:text-primary ${
            location.pathname === "/agri-network" ? "text-primary" : ""
          }`}
        >
          Agri Network
        </p>
      </div>
      <div>
        <Button
          value={jwt ? "Dashboard" : "Sign In"}
          width={150}
          height={50}
          font="Josefin"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
