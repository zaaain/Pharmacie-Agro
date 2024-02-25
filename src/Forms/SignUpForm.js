import React,{useState} from "react";
import { isEmpty } from "lodash";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userRegisterSchema } from "helpers/schema";
import Map from "components/common/Map"

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
  const [address, setAddress] = useState(null)

  const Submit = (val) => {
    Object.assign(val,{location:address})
    onSubmit(val)
  }

  return (
    <form onSubmit={handleSubmit(Submit)}>
      <div className="w-[100%
      ]">
        <div className="grid grid-cols-1 gap-5">
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
          <div className="col-span-1">
            <Map setAddress={setAddress}/>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Button value="Submit" type="submit" variant="primary" width={140} height={45} disabled={loader || isEmpty(address)} loader={false}/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
