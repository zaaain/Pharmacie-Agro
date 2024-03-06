import React,{useState} from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userRegisterSchema } from "helpers/schema";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SignUpForm = ({onSubmit}) => {

  const  authReducer = useSelector((state) => state.auth);
  const {registerProfileLoader, role} = authReducer
  const [shopFlag , setShopFlag] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema(role, shopFlag)),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[100%]">
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("name")}
                  placeholder="Enter Name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.name && errors.name.message}
                />
              )}
            />
          </div>
          {role && role === "seller" && (
          <>
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
          <FormControlLabel control={<Checkbox  checked={shopFlag} onChange={()=>setShopFlag(!shopFlag)}/>} 
          label="Are you a shopkeeper?" />
          </div>
          {shopFlag && (
          <div className="col-span-1">
            <Controller
              name="shopName"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...register("shopName")}
                  placeholder="Enter shop name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.shopName && errors.shopName.message}
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
          </>
          )}
          <div className="col-span-1 flex items-center justify-center">
            <Button value="Submit" type="submit" variant="primary" width={140} height={45} disabled={registerProfileLoader} loader={registerProfileLoader}/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
