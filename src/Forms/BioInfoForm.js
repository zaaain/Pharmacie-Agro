import React from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { BioUpdateSchema } from "helpers/schema";

const BioInfoForm = ({handleUpdateBio}) => {
  const authReducer = useSelector((state) => state.auth);
  const { profileData , registerProfileLoader} = authReducer;
  const {type} = profileData

  const defaultValues = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    phone: profileData.phone,
    email: profileData.email,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BioUpdateSchema),
    defaultValues,
  });



  return (
    <form onSubmit={handleSubmit(handleUpdateBio)}>
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
        {type && type !== "company" ?
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
        :
        <div className="col-span-2">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormInput
              {...register("email")}
              placeholder="Enter email"
              value={field.value}
              disabled={true}
              onChange={(e) => field.onChange(e.target.value)}
              error={errors?.email && errors.email.message}
            />
          )}
        />
      </div>
        }
        <div className="col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("description")}
                placeholder="Enter description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.description && errors.description.message}
              />
            )}
          />
        </div>
        <div className="col-span-2 flex justify-center">
              <Button value="Update Bio" width={150} height={45} type="submit" loader={registerProfileLoader} disabled={registerProfileLoader}/>
        </div>
      </div>
    </form>
  );
};

export default BioInfoForm;
