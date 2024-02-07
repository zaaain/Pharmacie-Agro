import React from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userRegisterSchema } from "helpers/schema";

// import GooglePlacesAutocomplete from "../common/GooglePlacesAutocomplete"

const SignUpForm = ({onSubmit}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
    // defaultValues,
  });

  const loader = useSelector((state) => state.auth.registerProfileLoader);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-w-[500px] ">
        <div className="grid grid-cols-1 space-y-3">
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
          <div className="col-span-1 flex items-center justify-center">
            <Button value="Submit" type="submit" variant="primary" width={140} height={45} disabled={false} loader={false}/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
