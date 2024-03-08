import React,{useState} from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { updateAddLocationSchema } from "helpers/schema";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { districtsOption, tehsilsOption, citiesOptions } from "helpers/constant";
import SelectInput from "components/common/base/SelectInput";
import { isEmpty } from "lodash";

const AddUpdateAdddress = ({onSubmit, defaultValues}) => {

  const  authReducer = useSelector((state) => state.auth);
  const {addAddressLoader} = authReducer
  const [shopFlag , setShopFlag] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAddLocationSchema(shopFlag)),
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
                <SelectInput
                  {...register("district")}
                  placeholder="Select District"
                  value={field.value}
                  options={districtsOption}
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
                <SelectInput
                  {...register("tehsil")}
                  placeholder="Select Tehsil"
                  value={field.value}
                  options={tehsilsOption}
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
                <SelectInput
                  {...register("city")}
                  placeholder="Select City"
                  value={field.value}
                  options={citiesOptions}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.city && errors.city.message}
                />
              )}
            />
          </div>
          {isEmpty(defaultValues) && (
          <div className="col-span-1">
          <FormControlLabel control={<Checkbox  checked={shopFlag} onChange={()=>setShopFlag(!shopFlag)}/>} 
          label="Are you a shopkeeper?" />
          </div>
          )}
          {((shopFlag) || (!isEmpty(defaultValues) && defaultValues.shop)) && (
          <div className="col-span-1">
            <Controller
              name="shop"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("shop")}
                  placeholder="Enter shop name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.shop && errors.shop.message}
                />
              )}
            />
          </div>
          )}
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
