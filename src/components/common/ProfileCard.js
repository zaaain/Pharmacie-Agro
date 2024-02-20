import React from 'react'
import { imgUrl } from "helpers/path";
import { Button } from "components/common/base/button";
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const authReducer = useSelector((state) => state.auth);
    const { profileData } = authReducer;
    const name = profileData && profileData.firstName && profileData.lastName && profileData.firstName +" "+ profileData.lastName
  return (
    <div className="col-span-1 rounded-3xl border-2 border-primary p-5 flex flex-col  items-center justify-center">
    <img
      className="rounded-full mx-auto W-[150px] h-[150px]"
      draggable={false}
      src={imgUrl + "/kisan.png"}
      alt="img"
    />
    <p className="font-CatamaranBold text-[24px] my-5">{name && name}</p>
    <Button value="Update Avatar" width={220} height={50} />
  </div>
  )
}

export default ProfileCard