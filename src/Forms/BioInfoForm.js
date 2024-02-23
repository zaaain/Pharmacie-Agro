import React from "react";
import { isEmpty } from "lodash";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userRegisterSchema } from "helpers/schema";

const BioInfoForm = () => {
  const authReducer = useSelector((state) => state.auth);
  const { profileData } = authReducer;
  console.log("profileData", profileData)
  const defaultValues = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    phone: profileData.phone,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
    defaultValues,
  });
  
  return (
    <form>
      <div className="grid grid-cols-2 gap-5 p-3">
        <div className="col-span-1">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("firstName")}
                placeholder="Enter First Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.firstName && errors.firstName.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("lastName")}
                placeholder="Enter Last Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.lastName && errors.lastName.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("phone")}
                placeholder="Enter Phone"
                value={field.value}
                disabled={true}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.phone && errors.phone.message}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default BioInfoForm;
