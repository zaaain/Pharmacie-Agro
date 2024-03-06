import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./base/button";
import { imgPath, imgUrl } from "helpers/path";
import { useSelector } from "react-redux";
import useLogout from "hooks/useLogout";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { isEmpty } from 'lodash';
import Modal from "./base/Modal"
import useSwitch from 'hooks/useSwitch';

const MobileNavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const authData = useSelector((state) => state.auth)
    const { profileData, role, roleLoader } = authData
    const logout = useLogout()
    const [open, setOpen] = React.useState(false)
    const [roleOpen, setRoleOpen] = useState(false)
   const switchUser = useSwitch()

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


    const handleClick = () => {
        if (jwt) {
            setOpen(false)
          setRoleOpen(true)
        }
        if (!jwt) {
          logout()
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
                        {role === "seller" && (
                            <img
                                src={profileData && !isEmpty(profileData) && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
                                alt="logo"
                                draggable={false}
                                className="rounded-full mx-auto pb-3 w-[100] h-[100px]"
                            />
                        )}
                        {jwt && (
                            <>
                                {profileData.name && profileData.name && (
                                    <p className='text-primary font-Roboto text-[24px] pb-2 text-center font-extrabold'>
                                        {profileData.name && profileData.name}
                                    </p>
                                )}
                                <div className='border-b-2 border-primary ' />
                            </>
                        )}

                        <div className='pt-3 px-3 flex flex-col items-center justify-center'>
                            <Button
                                value={jwt ? `Switch ${role === "seller" ? "Buyer" : "Seller"}` : "Sign In"}
                                width={140}
                                height={40}
                                font="Roboto"
                                onClick={handleClick}
                            />
                            {jwt && role && role === "seller" && (
                                 <p className={`text-[16px] font-RobotoBold pt-3 pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/dashboard" && "text-primary"}`}
                                onClick={() => handleRoute("dashboard")}
                            >
                                Dashboard
                            </p>
                            )}
                            <p className={`text-[16px] font-RobotoBold pb-2 ${role !== "seller" && `pt-3`} hover:text-primary hover:cursor-pointer ${location.pathname === "/" && "text-primary"}`}
                                onClick={() => handleRoute("")}
                            >
                                Home
                            </p>
                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/products/all" && "text-primary"}`}
                                onClick={() => handleRoute("products/all")}
                            >
                                Productus
                            </p>
                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/agri-network" && "text-primary"}`}
                                onClick={() => handleRoute("agri-network")}
                            >
                                Agri Network
                            </p>
                            {jwt && role === "seller" && (

                                <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/profile" && "text-primary"}`}
                                    onClick={() => handleRoute("profile")}
                                >
                                    Profile
                                </p>
                            )}
                            {jwt && (
                                <p className={`text-[16px] font-RobotoBold hover:text-primary hover:cursor-pointer`}
                                    onClick={logout}
                                >
                                    Log Out
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='bg-gradient w-[50px] h-[57px] flex items-center justify-center' onClick={() => setOpen(false)}>
                        <CloseIcon style={{ color: "#fff" }} />
                    </div>
                </div>
            )}
            <Modal isOpen={roleOpen} toggle={() => setRoleOpen(false)} title="Confirmation">
                <h1 className="text-primary font-bold text-[15px]">{`Are you willing to define your role as a ${role === "seller" ? "Buyer" : "Seller"} ?`}</h1>
                <div className="flex justify-center mt-6">
                    <Button width={120} height={40} value="Yes Sure" loader={roleLoader} disabled={roleLoader} onClick={switchUser} />
                </div>
            </Modal>
        </>
    )
}

export default MobileNavBar
