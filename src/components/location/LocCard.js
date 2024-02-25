import React from 'react'
import { Button } from "components/common/base/button";
import { useSelector } from "react-redux";

const LocCard = ({data, handleDeleteAddress, countFlag}) => {

  const authReducer = useSelector((state) => state.auth);
  const { deleteAddressLoader } = authReducer;

  return (
    <div className="w-full flex p-5 flex-col shadow-card  rounded-2xl">
    <p className="font-Catamaran text-[16px] truncate">
      <span className="font-Josefin text-primary text-[18px]">
        Addreess:
      </span>{" "}
      {data.address && data.address}
    </p>
    <div className="flex items-center justify-center mt-5">
      {/* <Button
        variant="primary"
        width={120}
        value="Update"
        height={40}
      /> */}
      <Button
        variant="primary"
        width={120}
        value="Delete"
        height={40}
        loader={deleteAddressLoader}
        disabled={deleteAddressLoader || countFlag}
        onClick={()=>handleDeleteAddress(data.id)}
      />
    </div>
  </div>
  )
}

export default LocCard
