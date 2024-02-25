import React, {useState} from "react";
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
  machinaryToolsOption
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { MachinaryFormSchema } from "helpers/schema";
import { useSelector } from "react-redux";

const MachinaryToolsForm = ({ onSubmit, onImages, images }) => {

  const [proType, setProType] =useState("")

  console.log("proType",proType)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MachinaryFormSchema(proType)),
  });
  const loader = useSelector((state)=> state.products.newProductLoader)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
        <Controller
            name="ProductType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("ProductType")}
                onChange={(selectedOption) => {
                  setProType(selectedOption.target.value)
                  field.onChange(selectedOption)
                }}
                options={machinaryToolsOption}
                placeholder="Select Product Type"
                value={field.value}
                error={errors?.ProductType && errors.ProductType.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
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
        {(proType === "Tool" || proType === "Machinary") && (
            <div className="col-span-4">
            <Controller
                name="condition"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <SelectInput
                  {...register("condition")}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    options={machinaryToolsOption}
                    placeholder="Select Condition"
                    value={field.value}
                    error={errors?.condition && errors.condition.message}
                  />
                )}
              />
            </div>
        )}
         {proType === "Machinary" && (
          <div className="col-span-4">
         <Controller
         name="horsePower"
         control={control}
         render={({ field }) => (
           <FormInput
             {...register("horsePower")}
             placeholder="Enter Horse Power"
             type="number"
             value={field.value}
             onChange={(e) => field.onChange(e.target.value)}
             error={errors?.horsePower && errors.horsePower.message}
           />
         )}
       />
            </div>
        )}
        <div className="col-span-2">
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("model")}
                placeholder="Enter Model"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.model && errors.model.message}
              />
            )}
          />
        </div>
     
        <div className="col-span-2">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("price")}
                placeholder="Enter price"
                type="numbrer"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.price && errors.price.message}
              />
            )}
          />
        </div>
        <div className="col-span-4">
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
        <div className="col-span-4">
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
        <div className="col-span-4 flex mx-auto">
          <Button
            value="Submit"
            width={150}
            height={45}
            disabled={(images && images.length <= 0) || loader}
            loader={loader}
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default MachinaryToolsForm;
