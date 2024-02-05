import React from "react";
import { Button } from "components/common/base/button";
import FormInput from "components/common/base/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { otpSchema } from "helpers/schema";
import { useSelector } from "react-redux";

const EnterPhoneEmailForm = ({ onSubmit, num ,err}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    // defaultValues,
  });
const authReducer = useSelector((state)=> state.auth)
const {otpLoader} = authReducer

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-Catamaran text-[16px] mt-5">
        <span className="font-bold text-primary font-JosefinBold text-[18px]">
          Note:{" "}
        </span>{" "}
        {`We can send otp code in this number (0${num})`}
      </p>
      <div className="mt-5">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <FormInput
              {...register("otp")}
              placeholder="Enter 4 digit number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={errors?.otp && errors.otp.message}
            />
          )}
        />
        {err && (
         <p className="text-red-600 font-Catamaran text-[16px] mt-2">{err}</p>
        )}
        <div className="mt-10 flex justify-center items-center">
          <Button
            width={200}
            height={50}
            variant="primary"
            value="Sign In"
            type="submit"
            disabled={otpLoader}
            loader={otpLoader}
          />
        </div>
      </div>
    </form>
  );
};

export default EnterPhoneEmailForm;
