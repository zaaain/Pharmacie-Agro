import React from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { updateAddLocationSchema } from "helpers/schema";

const AddUpdateAdddress = ({onSubmit, defaultValues}) => {

  const  authReducer = useSelector((state) => state.auth);
  const {addAddressLoader} = authReducer
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAddLocationSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1">
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("district")}
                  placeholder="Enter District Name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.district && errors.district.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="tehsil"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("tehsil")}
                  placeholder="Enter Tehsil Name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.tehsil && errors.tehsil.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("city")}
                  placeholder="Enter City Name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.city && errors.city.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("address")}
                  placeholder="Enter Address"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.address && errors.address.message}
                />
              )}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Button value="Submit" type="submit" variant="primary" width={140} height={45} disabled={addAddressLoader} loader={addAddressLoader}/>
          </div>
        </div>
    </form>
  );
};

export default AddUpdateAdddress;
