import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./base/button";
import { imgPath, imgUrl } from "helpers/path";
import { useSelector } from "react-redux";
import useLogout from "hooks/useLogout";
import {useWindowSize} from 'react-use';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const authData = useSelector((state)=> state.auth)
  const {profileData} = authData
  const logout = useLogout()
  const [open, setOpen] = React.useState(false)
  const {width} = useWindowSize()

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
      <div className="2xl:flex xl:flex lg:flex md:hidden sm:hidden xs:hidden">
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
      <div className="flex relative items-center">
        <Button
          value={jwt ? "Dashboard" : "Sign In"}
          width={150}
          height={50}
          font="Josefin"
          onClick={handleClick}
        />
           {jwt && (
      <div className="ml-5" onClick={()=> setOpen(!open)}>
          <img className="w-[50px] h-[50px] rounded-full cursor-pointer" alt="avatar" 
          src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
          />
      </div>
      )}
      {width < 1024 && !jwt && (
         <div className="ml-5" onClick={()=> setOpen(!open)}>
          {/* <img className="w-[50px] h-[50px] rounded-full cursor-pointer" alt="avatar" 
          src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
          /> */}
          <MenuIcon style={{color:"#668968", fontSize:"36px"}}/>
      </div>
      )}
      </div>
       {open && ( 
        <div className="absolute top-[80px] p-1 right-2 w-[150px] bg-white shadow-dashboard rounded-2xl">
          <div className="flex justify-end" >
            <CancelIcon style={{color:"#668968"}}/>
          </div>
          <div className="pl-3 pb-2">
          {jwt && (
          <div onClick={()=> navigate("/profile")}>
            <p className="font-CatamaranBold text-[16px] hover:text-primary cursor-pointer">My Profile</p>
          </div>
          )}
          {width < 1024 && (
            <>
             <div onClick={()=> navigate("/")}>
             <p className="font-CatamaranBold text-[16px] hover:text-primary cursor-pointer">Home</p>
           </div>
            <div onClick={()=> navigate("/products/all")}>
            <p className="font-CatamaranBold text-[16px] hover:text-primary cursor-pointer">Products</p>
          </div>
           <div onClick={()=> navigate("/agri-network")}>
           <p className="font-CatamaranBold text-[16px] hover:text-primary cursor-pointer">Agri Network</p>
         </div>
         </>
          )}
           {jwt && (
          <div onClick={logout}>
            <p className="font-CatamaranBold text-[16px] hover:text-primary cursor-pointer mt-2">Log out</p>
          </div>
           )}
        </div>
        </div>
      )} 
    </div>
  );
};

export default Navbar;
