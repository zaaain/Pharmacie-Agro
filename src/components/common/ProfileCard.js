import React from 'react'
import { imgUrl , imgPath} from "helpers/path";
import { useSelector } from "react-redux";
import ImageInputButton from "components/common/base/ImageInputButton";

const ProfileCard = ({handleUpdateAvatar, loader}) => {
    const authReducer = useSelector((state) => state.auth);
    const { profileData } = authReducer;
    const name = profileData && profileData.firstName && profileData.lastName && profileData.firstName +" "+ profileData.lastName
  return (
    <div className="col-span-1 rounded-3xl border-2 border-primary p-5 flex flex-col  items-center justify-center">
    <img
      className="rounded-full mx-auto W-[150px] h-[150px]"
      draggable={false}
      src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
      alt="img"
    />
    <p className="font-RobotoBold text-[24px] my-5">{name && name}</p>
    <ImageInputButton onChange={handleUpdateAvatar} loader={loader}/>
  </div>
  )
}

export default ProfileCard