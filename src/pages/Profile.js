import React from "react";
import Layout from "layout/DashboardLayout";
import { Button } from "components/common/base/button";
import FormInput from "components/common/base/FormInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { imgUrl } from "helpers/path";

const Profile = () => {
  return (
    <Layout>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 rounded-3xl border-2 border-primary p-5 flex flex-col  items-center justify-center">
            <img
              className="rounded-full mx-auto W-[150px] h-[150px]"
              draggable={false}
              src={imgUrl + "/kisan.png"}
              alt="img"
            />
            <p className="font-CatamaranBold font-[24px] my-5">John Doe</p>
            <Button value="Update Avatar" width={220} height={50} />
          </div>
          <div className="col-span-2 flex flex-col border-2 border-secondary rounded-3xl p-3">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-1">
                <FormInput placeholder="Enter Name" defaultValue="John Doe" />
              </div>
              <div className="col-span-1">
                <FormInput
                  placeholder="Enter Number"
                  defaultValue="0300 0000000"
                />
              </div>
              <div className="col-span-2">
                <TextAreaInput
                  rows={2}
                  placeholder="Enter About"
                  defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />
              </div>
              <div className="col-span-2">
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    width={160}
                    value="Update Bio"
                    height={50}
                  />
                </div>
              </div>
              {/* <FormInput
            defaultValue="Khana Pull Rawalpindi, Pakistan"
            placeholder="Enter Address"
          />
          <div className="grow flex-1 w-full bg-blue-100 my-2 rounded-2xl" />
          <Button
            value="Update Location"
            width={150}
            height={50}
            variant="secondary"
          /> */}
            </div>
          </div>
        </div>
        {/* <div className="border-2 border-primary rounded-3xl mt-5 grid grid-cols-2 gap-2 p-3">
        <div className="col-span-1">
          <FormInput placeholder="Enter Name" defaultValue="John Doe" />
        </div>
        <div className="col-span-1">
          <FormInput placeholder="Enter Number" defaultValue="0300 0000000" />
        </div>
        <div className="col-span-2">
          <TextAreaInput
            rows={2}
            placeholder="Enter About"
            defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </div>
        <div className="col-span-2">
          <div className="flex justify-center">
            <Button
              variant="primary"
              width={160}
              value="Update Bio"
              height={50}
            />
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-3 gap-5 mt-10">
        <div className="col-span-3 flex justify-between items-center">
          <p className="font-JosefinBold text-primary text-[28px]">My Location</p>
          <Button
                    variant="secondary"
                    width={160}
                    value="Add New Location"
                    height={50}
                  />
        </div>

      <div className="col-span-1 flex p-5 flex-col shadow-card  rounded-2xl">
        <p className="font-Catamaran text-[16px]"><span className="font-Josefin text-primary text-[18px]">Addreess:</span> Rawalpindi Punjab Pakistan</p>
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
      <div className="col-span-1 flex p-5 flex-col shadow-card  rounded-2xl">
        <p className="font-Catamaran text-[16px]"><span className="font-Josefin text-primary text-[18px]">Addreess:</span> Faisalabad Punjab Pakistan</p>
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
      </div>
      </div>
    </Layout>
  );
};

export default Profile;
