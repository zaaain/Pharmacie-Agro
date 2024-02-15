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

const FruitsForm = ({ onSubmit, onImages, images }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FruitsFormSchema),
  });

  console.log("images", images)

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
                placeholder="Enter Commodity Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="pkgType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={packagingType}
                placeholder="Select Packaging Type"
                value={field.value}
                error={errors?.pkgType && errors.pkgType.message}
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
            name="pkgWeight"
            control={control}
            render={({ field }) => (
              <FormInput
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
        <div className="col-span-1">
          <Controller
            name="pkgQuantity"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Package Quantity"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgQuantity && errors.pkgQuantity.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Price Per Package"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.price && errors.price.message}
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
        <div className="col-span-1">
          <Controller
            name="shelfLifeStart"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DateInput
                {...register("shelfLifeStart")}
                placeholder="Select Shelf Life Start Date"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.shelfLifeStart && errors.shelfLifeStart.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="shelfLifeEnd"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DateInput
                {...register("shelfLifeEnd")}
                placeholder="Select Shelf Life End Date"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.shelfLifeEnd && errors.shelfLifeEnd.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="availableFrom"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DateInput
                {...register("availableFrom")}
                placeholder="Select Available From"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.availableFrom && errors.availableFrom.message}
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
                placeholder="Enter Product Description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.description && errors.description.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
              <ImageInput
              placeholder="Enter Product Image"
              onChange={onImages}            
              />
        </div>
        {images && images.length > 0 && (
        <>
          {images.map((img, index) => (
          <div className="col-span-1">
          <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-contain h-[150px]  rounded-2xl"/>
          </div>
       ))}
            </>

        )}
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
