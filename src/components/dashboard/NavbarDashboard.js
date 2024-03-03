import React,{useState} from "react";
import { Button } from "components/common/base/button";
import { imgUrl } from "helpers/path";
import useSwitch from "hooks/useSwitch";
import Modal from "components/common/base/Modal";
import { useSelector } from "react-redux";


const NavbarDashboard = () => {

    const switchUser = useSwitch()
    const [roleOpen, setRoleOpen] = useState(false)
    const authData = useSelector((state) => state.auth)
    const { roleLoader } = authData
 

    return (

        <>
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
                onClick={()=> setRoleOpen(true)}
            />
        </div>
        <Modal isOpen={roleOpen} toggle={()=> setRoleOpen(false)} title="Confirmation">
      <h1 className="text-primary font-bold text-[18px]">Are you really willing to define your role as a buyer ?</h1>
      <div className="flex justify-center mt-6"> 
            <Button width={150} height={45} value="Yes Sure" loader={roleLoader} disabled={roleLoader} onClick={switchUser}/>
      </div>
    </Modal>
        </>
    );
};

export default NavbarDashboard;
