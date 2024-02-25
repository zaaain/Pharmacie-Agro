import React,{useState, useEffect} from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout";
import BioInfoForm from "Forms/BioInfoForm";
import { Button } from "components/common/base/button";
import ProfileCard from "components/common/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { userRegister, getProfile } from "../redux/slices/authSlice/authAction";
import useSnackMsg from "hooks/useSnackMsg";
import LocCard from "components/location/LocCard";
import Modal from "components/common/base/Modal";
import Map from "components/common/Map";
import { isEmpty } from "lodash";
import { CircularProgress } from "@mui/material";
import {getAllAddress, deleteAddress, addAddress} from "../redux/slices/authSlice/authAction"

const Profile = () => {

  const authReducer = useSelector((state) => state.auth);
  const { profileData, allAddressLoader, allAddressData, addAddressLoader } = authReducer;
  const { id } = profileData
  const dispatch = useDispatch()
  const {eSnack, sSnack} = useSnackMsg()
  const [locOpen, setLocOpen] = useState(false)
  const [newAddress, setNewAddress] = useState({})

  const handleGetAllAddress = () => {
    dispatch(getAllAddress())
  }

  useEffect(()=>{
    handleGetAllAddress()
  },[])

  const handleUpdateBio = (val) => {

    dispatch(userRegister(val)).unwrap()
    .then((res)=>{
      sSnack("Successfully Profile Updated")
      dispatch(getProfile())
    })
    .catch((err)=>{
      eSnack("Sorry something is went wrong")
    })
  }

  const handleAddNewAddress = () => {
    if(!id) return
    // Object.assign(newAddress,{id:id})
    dispatch(addAddress(newAddress)).unwrap()
    .then((res)=>{
      handleGetAllAddress()
      setLocOpen(false)
      setNewAddress({})
      sSnack("Successfully new address added")
    })
    .catch((err)=>{
      setLocOpen(false)
      setNewAddress({})
      eSnack("Sorry something is went wrong")
    })
  }

  const handleDeleteAddress = (idx) => {
    if(!idx) return
    dispatch(deleteAddress({id:idx})).unwrap()
    .then((res)=>{
      handleGetAllAddress()
      sSnack("Successfully address deleted")
    })
    .catch((err)=>{
      eSnack("Sorry something is went wrong")
    })
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-5">
            <ProfileCard/>
          <div className="col-span-2 flex flex-col border-2 border-secondary rounded-3xl p-3">
            <BioInfoForm handleUpdateBio={handleUpdateBio}/>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-10">
          <div className="col-span-3 flex justify-between items-center">
            <p className="font-JosefinBold text-primary text-[28px]">
              My Location
            </p>
            <Button
              variant="secondary"
              width={160}
              value="Add New Location"
              height={50}
              onClick={()=>setLocOpen(true)}
            />
          </div>
          {allAddressLoader && (
            <div className="flex justify-center col-span-3">
              <CircularProgress size={42} style={{color:"#668968"}}/>
            </div>
          )}
          {!allAddressLoader && allAddressData && allAddressData.length === 0 && (
           <p className="col-span-3  font-Josefin text-[18px]">You have not added any address !</p>
          )}
          {!allAddressLoader && allAddressData && allAddressData.length > 0 && allAddressData.map((item)=>(
            <div>
              <LocCard data={item} handleDeleteAddress={handleDeleteAddress} countFlag={allAddressData && allAddressData.length === 1}/>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={locOpen} title="Add New Location" 
      toggle={()=>{
        setNewAddress({})
        setLocOpen(false)
      }}>
        <Map setAddress={setNewAddress}/>
        <div className="flex justify-center">
        <Button
              variant="primary"
              width={160}
              value="Add Now"
              height={50}
              disabled={isEmpty(newAddress) || addAddressLoader}
              loader={addAddressLoader}
              onClick={handleAddNewAddress}
            />
          </div>
      </Modal>
    </Layout>
  );
};

export default withAuth(Profile);
