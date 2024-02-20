import React from "react";
import Layout from "layout/DashboardLayout";
import BioInfoForm from "Forms/BioInfoForm";
import { Button } from "components/common/base/button";
import ProfileCard from "components/common/ProfileCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const authReducer = useSelector((state) => state.auth);
  const { profileData } = authReducer;
  const { address } = profileData;
  return (
    <Layout>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-5">
            <ProfileCard/>
          <div className="col-span-2 flex flex-col border-2 border-secondary rounded-3xl p-3">
            <BioInfoForm/>
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
            />
          </div>
          {address && address.length === 0 && (
           <p className="col-span-3  font-Josefin text-[18px]">You have not added any product !</p>
          )}
          {address && address.length > 0 && address.map((item)=>(
          <div className="col-span-1 flex p-5 flex-col shadow-card  rounded-2xl">
            <p className="font-Catamaran text-[16px] truncate">
              <span className="font-Josefin text-primary text-[18px]">
                Addreess:
              </span>{" "}
              {item.address && item.address}
            </p>
            <div className="flex items-center justify-between mt-10">
              <Button
                variant="primary"
                width={120}
                value="Update"
                height={40}
              />
              <Button
                variant="primary"
                width={120}
                value="Delete"
                height={40}
              />
            </div>
          </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
