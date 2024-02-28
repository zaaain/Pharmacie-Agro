import React from "react";
import { Button } from "components/common/base/button";
import { imgUrl } from "helpers/path";
import { useNavigate } from "react-router-dom";


const NavbarDashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="px-2 flex justify-between items-center min-h-full">
            <img
                draggable={false}
                src={imgUrl + "/logo.png"}
                alt="avatar"
                className="w-[180px] h-[60px]"
            />
            <p />
          
            <Button
                value="Switch to Buyer"
                variant="primary"
                width={180}
                height={55}
                font="Roboto"
                onClick={()=> navigate("/")}
            />
        </div>
    );
};

export default NavbarDashboard;
