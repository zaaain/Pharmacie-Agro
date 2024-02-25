import React,{useState} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  packagingType,
  weightUnitType,
  taxOpt,
  shippingOption,
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { FertilizersFormSchema } from "helpers/schema";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import useSnackMsg from "hooks/useSnackMsg";

const FertilizersForm = ({ onSubmit, onImages, images  }) => {

  const loader = useSelector((state)=> state.products.newProductLoader)
  const [chemicals, setChemicals] = useState([{ name: "", percentage: "" }]);
  const [flag, setFlag] = useState(true);
  const {eSnack} = useSnackMsg()
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FertilizersFormSchema),
  });

  const handleInputChange = (index, fieldName, value) => {
    const updatedChemicals = [...chemicals];
    updatedChemicals[index][fieldName] = value;
    setChemicals(updatedChemicals);
    checkEmptyFields(updatedChemicals);
  };

  const checkEmptyFields = (chemicalsArray) => {
    const isEmpty = chemicalsArray.some(
      (chem) => chem.name.trim() === "" || chem.percentage.trim() === ""
    );
    setFlag(isEmpty);
  };

  const handleAddNewChem = () => {
    setChemicals([...chemicals, { name: "", percentage: "" }]);
    setFlag(true); // Reset flag when adding a new chemical
  };

  const onSubmitNow = (val) => {
    if (flag) {
      eSnack("Please complete formula");
      return;
    }
  
    Object.assign(val, { composition: JSON.stringify(chemicals) });
    onSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitNow)}>
      <div className="grid grid-cols-6 gap-4 items-center">
        <div className="col-span-3">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("brand")}
                placeholder="Brand brand"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.brand && errors.brand.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="name"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
              {...register("name")}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={packagingType}
                placeholder="Product Name"
                value={field.value}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        {chemicals.map((chem, index) => (
        <>
        <div className="col-span-3">
 
              <FormInput
                options={packagingType}
                placeholder="Composition Name"
                value={chem.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                error={errors?.composition && errors.composition.message}
              />
    
        </div>
        <div className="col-span-2">
  
              <FormInput
                type="number"
                placeholder="Enter Percentage"
                value={chem.percentage}
                onChange={(e) => handleInputChange(index, "percentage", e.target.value)}
              />
      
        </div>
        <div className="grid grid-cols-1 justify-end">
              <div className="bg-primary p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer" onClick={handleAddNewChem}>
                <AddIcon style={{color:"white"}}/>
              </div>
        </div>
        </>
        ))}
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
        <div className="col-span-2">
          <Controller
            name="pkgType"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("pkgType")}
                placeholder="Packaging Type"
                value={field.value}
                options={packagingType}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="weightUnit"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("weightUnit")}
                placeholder="Weight Unit"
                value={field.value}
                options={weightUnitType}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="pkgQuantity"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
              {...register("pkgQuantity")}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                placeholder="Packages Quantity"
                type="number"
                value={field.value}
                error={errors?.pkgQuantity && errors.pkgQuantity.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="price"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FormInput
              {...register("price")}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                placeholder="Price per package"
                type="number"
                value={field.value}
                error={errors?.price && errors.price.message}
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
              {...register("shipping")}
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
            name="tax"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("tax")}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={taxOpt}
                placeholder="Tax"
                value={field.value}
                error={errors?.tax && errors.tax.message}
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
            loader={loader}
            disabled={(images && images.length <= 0) || loader}
          />
        </div>
      </div>
    </form>
  );
};

export default FertilizersForm;

