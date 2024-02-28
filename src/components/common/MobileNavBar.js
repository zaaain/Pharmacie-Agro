import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./base/button";
import { imgPath, imgUrl } from "helpers/path";
import { useSelector } from "react-redux";
import useLogout from "hooks/useLogout";
import { useWindowSize } from 'react-use';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { isEmpty } from 'lodash';

const MobileNavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const authData = useSelector((state) => state.auth)
    const { profileData } = authData
    const logout = useLogout()
    const [open, setOpen] = React.useState(false)
    const { width } = useWindowSize()

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""; // Reset overflow to its default value
        }
        // Clean up function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleRoute = (name) => {
        navigate(`/${name}`)
        setOpen(false)
    }

    
  const handleClick = () =>{
    if(jwt){
      navigate("/dashboard")
    }else{
      navigate("/auth/login")
    }
  }

    return (
        <>
            <div className="bg-white border-b-2 border-primary  w-full z-140 p-2 flex items-center justify-between sticky top-0">
                <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    alt="logo"
                    draggable={false}
                    className="w-[150px] h-[50px] bg-cover"
                />
                <MenuIcon style={{ color: "#668968", fontSize: "28px" }} onClick={() => setOpen(true)} />
            </div>
            {open && (
                <div className='flex fixed top-0 left-0 right-0 bottom-0 bg-modal z-150'>
                    <div className='w-[70%] h-full bg-white py-3'>
                        <img
                            src={profileData && !isEmpty(profileData) && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
                            alt="logo"
                            draggable={false}
                            className="rounded-full mx-auto pb-3 w-[100] h-[100px]"
                        />
                        {jwt && profileData && !isEmpty(profileData) && profileData.firstName && profileData.lastName && (
                        <p className='text-primary font-Roboto text-[24px] pb-2 text-center font-extrabold'>
                            {profileData.firstName && profileData.lastName && `${profileData.firstName} ${profileData.lastName}`}
                        </p>
                        )}
                        <div className='border-b-2 border-primary '/>
                        <div className='pt-3 px-3 flex flex-col items-center justify-center'>
                        <Button
          value={jwt ? "Dashboard" : "Sign In"}
          width={120}
          height={40}
          font="Roboto"
          onClick={handleClick}
        />
                            <p className={`text-[16px] font-RobotoBold pt-3 pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/" && "text-primary"}`}
                                onClick={()=>handleRoute("")}
                            >
                                Home
                            </p>
                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/products/all" && "text-primary"}`}
                                onClick={()=>handleRoute("products/all")}
                            >
                                Productus
                            </p>
                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/agri-network" && "text-primary"}`}
                                onClick={()=>handleRoute("agri-network")}
                            >
                                Agri Network
                            </p>
                            {jwt && (
                            <div>
                                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/profile" && "text-primary"}`}
                                onClick={()=>handleRoute("profile")}
                            >
                                Profile
                                <p className={`text-[16px] font-RobotoBold pt-1 hover:text-primary hover:cursor-pointer`}
                                onClick={logout}
                            >
                                Log Out
                            </p>
                            </p>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className='bg-gradient w-[50px] h-[50px] flex items-center justify-center' onClick={() => setOpen(false)}>
                        <CloseIcon style={{ color: "#fff" }} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileNavBar
