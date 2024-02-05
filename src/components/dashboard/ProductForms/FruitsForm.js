import React from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  packagingType,
  weightUnitType,
  yesNoOption,
  taxOpt,
  shippingOption,
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
// import { otpSchema } from "helpers/schema";

const FruitsForm = ({ onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(otpSchema),
    // defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Product Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="packagingType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={packagingType}
                placeholder="Select Packaging Type"
                value={field.value}
                error={errors?.packagingType && errors.packagingType.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="weightUnit"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={weightUnitType}
                placeholder="Select Unit Type"
                value={field.value}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="packageWeight"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Package Weight"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.packageWeight && errors.packageWeight.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="packageQuantity"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Package Quantity"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={
                  errors?.packageQuantity && errors.packageQuantity.message
                }
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="packagePrice"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Package Price"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.packagePrice && errors.packagePrice.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="bidding"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={yesNoOption}
                placeholder="Select Bidding Type"
                value={field.value}
                error={errors?.bidding && errors.bidding.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="tax"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={taxOpt}
                placeholder="Select Tax Type"
                value={field.value}
                error={errors?.tax && errors.tax.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="shipping"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={shippingOption}
                placeholder="Select Shipping Type"
                value={field.value}
                error={errors?.shipping && errors.shipping.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextAreaInput
                {...register("description")}
                placeholder="Enter Product description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.description && errors.description.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <ImageInput
                onChange={(e) => {
                  field.onChange(e);
                }}
                value={field.value}
                error={errors?.img && errors.img.message}
                {...register("img")}
                placeholder="Enter Product Image"
              />
            )}
          />
        </div>
        <div className="col-span-3 flex mx-auto">
          <Button
            value="Submit"
            width={150}
            height={45}
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default FruitsForm;
