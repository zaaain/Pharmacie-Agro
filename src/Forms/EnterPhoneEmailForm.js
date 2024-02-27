import React from "react";
import { Button } from "components/common/base/button";
import FormInput from "components/common/base/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { LoginSchema } from "helpers/schema";
import {useWindowSize} from 'react-use';

const EnterPhoneEmailForm = ({ onSubmit, loader , role }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema(role)),
  });

  const {width} = useWindowSize()
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        {(role === "farmer" || role === "vendor") && (
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("phone")}
                placeholder="Enter your phone number"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.phone && errors.phone.message}
              />
            )}
          />
        )}
        {role === "company" && (
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("email")}
                placeholder="Enter your email"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.email && errors.email.message}
              />
            )}
          />
        )}
        <div className="mt-10 flex justify-center items-center">
          <Button
            width={width > 400 ? 200 : 150}
            height={50}
            variant="primary"
            value="Sign In"
            type="submit"
            disabled={loader}
            loader={loader}
          />
        </div>
      </div>
    </form>
  );
};

export default EnterPhoneEmailForm;
