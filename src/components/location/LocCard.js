import React from 'react'
import { Button } from "components/common/base/button";
import { useSelector } from "react-redux";

const LocCard = ({data, handleDeleteAddress, countFlag, onUpdate}) => {

  const authReducer = useSelector((state) => state.auth);
  const { deleteAddressLoader } = authReducer;

  return (
    <div className="w-full flex p-5 flex-col shadow-card  rounded-2xl">
        <p className="font-Roboto text-[16px] truncate">
      <span className="font-Roboto text-primary text-[18px]">
      District:
      </span>{" "}
      {data.district && data.district}
    </p>
    <p className="font-Roboto text-[16px] truncate">
      <span className="font-Roboto text-primary text-[18px]">
        Tehsil:
      </span>{" "}
      {data.tehsil && data.tehsil}
    </p>
    <p className="font-Roboto text-[16px] truncate">
      <span className="font-Roboto text-primary text-[18px]">
        City:
      </span>{" "}
      {data.city && data.city}
    </p>
    {data.shop &&  (
          <p className="font-Roboto text-[16px] truncate">
          <span className="font-Roboto text-primary text-[18px]">
            Shop Name:
          </span>{" "}
          {data.shop && data.shop}
        </p>
    )}
    <p className="font-Roboto text-[16px] truncate">
      <span className="font-Roboto text-primary text-[18px]">
        Addreess:
      </span>{" "}
      {data.address && data.address}
    </p>

    <div className="flex items-center justify-between mt-5">
      <Button
        variant="primary"
        width={120}
        value="Update"
        height={40}
        onClick={()=>onUpdate(data)}
      />
      {/* <Button
        variant="primary"
        width={120}
        value="Delete"
        height={40}
        // loader={deleteAddressLoader}
        disabled={deleteAddressLoader || countFlag}
        onClick={()=>handleDeleteAddress(data.id)}
      /> */}
    </div>
  </div>
  )
}

export default LocCard
