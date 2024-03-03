import React from "react";
import SideBar from "components/dashboard/DashboardSidebar";
import NavbarDashboard from "components/dashboard/NavbarDashboard";
import Modal from "components/common/base/Modal";
import { useSelector, useDispatch } from "react-redux";
import {getAllAddress, addAddress} from "../redux/slices/authSlice/authAction"
import useSnackMsg from "hooks/useSnackMsg";
import AddUpdateAdddress from "Forms/AddUpdateAdddress";
import { useWindowSize } from "react-use";
import SmallNavBar from "components/dashboard/MobileNavbarDashboard"


const DashboardLayout = ({ children }) => {

  const authReducer = useSelector((state) => state.auth);
  const { allAddressData, allAddressLoader } = authReducer;
  const {eSnack, sSnack} = useSnackMsg()
  const dispatch = useDispatch()
  const {width} = useWindowSize()

  const handleAddAddress = (val) => {
    dispatch(addAddress(val)).unwrap()
    .then((res)=>{
      dispatch(getAllAddress())
      sSnack(res.message ? res.message : "Successfully !")
    })
    .catch((err)=>{
      eSnack(err.message ? err.message : "Sorry something is went wrong");
    })
  }

  const flag = !allAddressLoader && allAddressData && allAddressData.length === 0 ? true : false


  return (
    <>
    <div className="h-screen w-full grid grid-cols-12 2xl:p-5 xl:p-5 lg:p-5 md:p-5 2xl:space-x-10 xl:space-x-10 lg:space-x-8 md:space-x-5 ">
      <div className="h-full 2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-3 2xl:flex xl:flex lg:flex md:flex sm:hidden xs:hidden bg-white rounded-2xl shadow-dashboard">
        <SideBar />
      </div>
      <div className="h-full  2xl:col-span-10 xl:col-span-10 lg:col-span-10 md:col-span-9 sm:col-span-12 xs:col-span-12 flex flex-col">
        {width > 768 ?
        <div className="w-full h-[80px] bg-white rounded-2xl shadow-dashboard">
          <NavbarDashboard />
        </div>
        :<SmallNavBar/>
        }
        {width > 768 ? (
        <div
          className="flex-1 w-full bg-white shadow-dashboard rounded-2xl mt-5"
          style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}
        >
          {children}
        </div>
        ):
        <div>
          {children}
        </div>
      }
      </div>
    </div>
    {flag && (
      <Modal isOpen={flag} title="Add Location">
        <AddUpdateAdddress onSubmit={handleAddAddress} defaultValues={{}}/>
      </Modal>
    )}
    </>
  );
};

export default DashboardLayout;
