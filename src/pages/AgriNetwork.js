import React,{useEffect} from "react";
import Layout from "layout/BaseLayout";
import Card from "components/agriNetwork/Card";
import { imgUrl } from "helpers/path";
import { useDispatch, useSelector } from "react-redux";
import {getAgriNetwork} from "../redux/slices/agriNetwork/agriNetworkAction"
import { CircularProgress } from "@mui/material"


const AgriNetwork = () => {
 
  const agriReducer = useSelector((state)=> state.agri)
  const {users,  usersLoader} = agriReducer
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAgriNetwork())
  },[])

  return (
    <Layout>
      <div className="my-10">
        <p className="text-center font-RobotoBold text-primary text-[32px]">
          Agri Network
        </p>
        <img
          src={imgUrl + "/basil-leaf.png"}
          alt="leaf"
          className="mx-auto mt-5"
        />
        
        <div className="w-[80%] mx-auto grid grid-cols-6 gap-5 mt-10">
          {usersLoader &&  (
            <div className="col-span-6 flex justify-center">
              <CircularProgress size={42} style={{color:"#668968"}}/>
            </div>
          )}
          {!usersLoader && users && users.length === 0 &&  (
            <div className="col-span-6 flex justify-center">
              <p className="font-Roboto text-[18px]">No users register !</p>
            </div>
          )}
           {!usersLoader && users && users.length > 0 && users.map((item, index)=>(
                <div key={item.id} className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 sm:col-span-3 md:col-span-3 xs:col-span-6">
                <Card data={item} />
              </div>
           ))}
        </div>
      </div>
    </Layout>
  );
};

export default AgriNetwork;
