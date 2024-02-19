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
  seedTypeOption,
  seedRegionOption
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { SeedFormSchema } from "helpers/schema";

const SeedVarietiesForm = ({ onSubmit, onImages, images }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SeedFormSchema),
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("brand")}
                placeholder="Enter Brand Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.brand && errors.brand.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="seed"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("seed")}
                placeholder="Enter Seed Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.seed && errors.seed.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="seedVariety"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("seedVariety")}
                placeholder="Enter Seed Variety"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.seedVariety && errors.seedVariety.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="seedType"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("seedType")}
                placeholder="Select Seed Type"
                options={seedTypeOption}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.seedType && errors.seedType.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="suitableRegion"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("suitableRegion")}
                placeholder="Select Suitable Region"
                options={seedRegionOption}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.suitableRegion && errors.suitableRegion.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="seedWeight"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("seedWeight")}
                placeholder="Enter Seed Weight (gram)"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.seedWeight && errors.seedWeight.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
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
        <div className="col-span-2">
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
        <div className="col-span-2">
          <Controller
            name="pkgWeight"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("pkgWeight")}
                placeholder="Enter Package Weight"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgWeight && errors.pkgWeight.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
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
        <div className="col-span-3">
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
        <div className="col-span-3">
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
        <div className="col-span-6">
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
        <div className="col-span-6">
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

export default SeedVarietiesForm;
