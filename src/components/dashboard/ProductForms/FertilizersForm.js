import React from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import DateInput from "components/common/base/DateInput"
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
import { FruitsFormSchema } from "helpers/schema";

const FertilizersForm = ({ onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FruitsFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-4 items-center">
        <div className="col-span-3">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Brand Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="pkgType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={packagingType}
                placeholder="Product Name"
                value={field.value}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="pkgType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={packagingType}
                placeholder="Chemical Name"
                value={field.value}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="weightUnit"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={weightUnitType}
                placeholder="Enter Percentage"
                value={field.value}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 justify-end">
              <Button
                width={140}
                height={40}
                value="Add Chemical"
                variant="primary"
              />
        </div>
        <div className="col-span-2">
          <Controller
            name="pkgWeight"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("name")}
                placeholder="Enter Package Weight"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgWeight && errors.pkgWeight.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="pkgQuantity"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("name")}
                placeholder="Packaging Type"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgQuantity && errors.pkgQuantity.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("name")}
                placeholder="Weight Unit"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.price && errors.price.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="bidding"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={yesNoOption}
                placeholder="Packages Quantity"
                value={field.value}
                error={errors?.bidding && errors.bidding.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="tax"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={taxOpt}
                placeholder="Price per package"
                value={field.value}
                type="number"
                error={errors?.tax && errors.tax.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
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
            name="shipping"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={shippingOption}
                placeholder="Tax"
                value={field.value}
                error={errors?.shipping && errors.shipping.message}
              />
            )}
          />
        </div>
        <div className="col-span-6">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextAreaInput
                placeholder="Enter Product Description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.description && errors.description.message}
              />
            )}
          />
        </div>
        <div className="col-span-6">
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
        <div className="col-span-6 flex mx-auto">
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

export default FertilizersForm;

