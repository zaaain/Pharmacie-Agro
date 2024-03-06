import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./base/button";
import { imgPath, imgUrl } from "helpers/path";
import { useSelector } from "react-redux";
import useLogout from "hooks/useLogout";
import { useWindowSize } from 'react-use';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Tooltip } from "@mui/material";
import Modal from "./base/Modal"
import useSwitch from "hooks/useSwitch";


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const authData = useSelector((state) => state.auth)
  const { profileData, role, roleLoader } = authData
  const logout = useLogout()
  const [open, setOpen] = React.useState(false)
  const { width } = useWindowSize()
  const [roleOpen, setRoleOpen] = useState(false)
  const switchUser = useSwitch()


  const handleClick = () => {
    if (jwt) {
      setRoleOpen(true)
    }
    if (!jwt) {
      logout()
    }
  }

  return (
    <>
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
          className={`font-Roboto text-[18px] cursor-pointer hover:text-primary mr-6 ${location.pathname === "/" ? "text-primary" : ""
            }`}
        >
          Home
        </p>
        <p
          onClick={() => navigate("/products/all", { replace: true })}
          className={`font-Roboto text-[18px] cursor-pointer hover:text-primary mr-6 ${location.pathname.includes("/products") ? "text-primary" : ""
            }`}
        >
          Products
        </p>
        <p
          onClick={() => navigate("/agri-network", { replace: true })}
          className={`font-Roboto text-[18px] cursor-pointer hover:text-primary ${location.pathname === "/agri-network" ? "text-primary" : ""
            }`}
        >
          Agri Network
        </p>
      </div>
      <div className="flex relative items-center">
        <Button
          value={jwt ? `Switch ${role === "seller" ? "Buyer" : "Seller"}` : "Sign In"}
          width={150}
          height={50}
          font="Roboto"
          onClick={handleClick}
        />
        {jwt && role === "seller" && (
          <div className="ml-5" onClick={() => setOpen(!open)}>
            <img className="w-[50px] h-[50px] rounded-full cursor-pointer" alt="avatar"
              src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
            />
          </div>
        )}
        {jwt && role === "buyer" && width > 1023 && (
          <Tooltip arrow placement="bottom" title="Log Out" className="bg-primary ml-5">
          <IconButton  onClick={logout} style={{marginLeft:"10px", background:"#668968" }}>
            <ExitToAppIcon style={{ color:"#fff"}}/>
          </IconButton>
          </Tooltip>
        )}
        {((width < 1024 && !jwt) || (width < 1024 && jwt && role === "buyer")) && (
          <div className="ml-5" onClick={() => setOpen(!open)}>
            <MenuIcon style={{ color: "#668968", fontSize: "36px" }} />
          </div>
        )}
      </div>
      {open && (
        <div className="absolute top-[80px] p-1 right-2 w-[150px] bg-white shadow-dashboard rounded-2xl">
          <div className="flex justify-end" >
            <CancelIcon style={{ color: "#668968" }} className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>
          <div className="pl-3 pb-2">
            {jwt && role === "seller" && (
              <div onClick={() => navigate("/profile")}>
                <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer">My Profile</p>
              </div>
            )}
                    {jwt && role === "seller" && (
              <div onClick={() => navigate("/dashboard")}>
                <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer">Dashboard</p>
              </div>
            )}
            {width < 1024 && (
              <>
                <div onClick={() => navigate("/")}>
                  <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer">Home</p>
                </div>
                <div onClick={() => navigate("/products/all")}>
                  <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer">Products</p>
                </div>
                <div onClick={() => navigate("/agri-network")}>
                  <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer">Agri Network</p>
                </div>
              </>
            )}
            {jwt && (
              <div onClick={logout}>
                <p className="font-RobotoBold text-[16px] hover:text-primary cursor-pointer mt-2">Log out</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    <Modal isOpen={roleOpen} toggle={()=> setRoleOpen(false)} title="Confirmation">
      <h1 className="text-primary font-bold text-[18px]">{`Are you willing to define your role as a ${role === "seller" ? "Buyer" : "Seller"} ?`}</h1>
      <div className="flex justify-center mt-6"> 
            <Button width={150} height={45} value="Yes Sure" loader={roleLoader} disabled={roleLoader} onClick={switchUser}/>
      </div>
    </Modal>
    </>
  );
};

export default Navbar;
