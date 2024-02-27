import React from "react";
import { Button } from "components/common/base/button";
import FormInput from "components/common/base/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { otpSchema } from "helpers/schema";
import { useSelector } from "react-redux";
import {useWindowSize} from 'react-use';

const EnterPhoneEmailForm = ({ onSubmit, num, email}) => {
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
const {width} = useWindowSize()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-Catamaran text-[16px] mt-5">
        <span className="font-bold text-primary font-JosefinBold text-[18px]">
          Note:{" "}
        </span>{" "}
        {num ? `We can send otp code in this number (0${num})` : `We can send otp code in this email (${email})`}
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
        <div className="mt-10 flex justify-center items-center">
          <Button
            width={width > 400 ? 200 : 150}
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
