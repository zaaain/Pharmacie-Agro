import React,{useState, useMemo} from "react";
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
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { FruitsFormSchema } from "helpers/schema";
import { useSelector } from "react-redux";
import useClient from "hooks/useClient";
import debounce from 'lodash/debounce';
import { CircularProgress } from "@mui/material";
import AddressInput from "components/common/base/AddressInput";
import { isEmpty } from "lodash";

const GrainsCerealsForm = ({ onSubmit, onImages, images, defaultValues, category }) => {

  const schemaFlag = isEmpty(defaultValues) ? true : false
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FruitsFormSchema(schemaFlag)),
    defaultValues
  });

  const [searchLoader,setSearchLoader] = useState(false)
  const [searchNameData, setNameSearchData] = useState([])
  const {api} = useClient()
  const loader = useSelector((state)=> state.products.newProductLoader)


  const handleSearchProduct = useMemo(() => debounce((value) => {
    if(!value){
      setNameSearchData([])
      setSearchLoader(false)
    }
    if(!value) return
    const payload = {
      query:value,
      category:category
    }
    setNameSearchData([])
    setSearchLoader(true)
    api.post("/api/product/search", payload)
    .then((res)=>{
      const response = res.data && res.data.data ? res.data.data : []
      setSearchLoader(false)
      setNameSearchData(response)
    })
    .catch((err)=>{
      setSearchLoader(false)
      setNameSearchData([])
    })
  }, 500), []);


  const handleSetName = (name) => {
    if(!name) return
    setValue("name", name);
    setNameSearchData([])
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-6 gap-4">
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6 relative">
        <>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormInput
              {...register("name")}
              placeholder="Enter Commodity Name"
              value={field.value}
              onChange={(e) => {
                handleSearchProduct(e.target.value)
                field.onChange(e.target.value)
              }}
              disabled={defaultValues.name ? true : false}
              error={errors?.name && errors.name.message}
            />
          )}
        />
           {((searchLoader) || (searchNameData && searchNameData.length > 0)) && (
            <div className="absolute top-[60px] right-0 left-0 max-h-[200px] p-5 overflow-y-auto bg-white shadow-dashboard rounded-lg z-50">
              {searchLoader && (
              <CircularProgress sze={28} style={{color:"#668968"}}/>
              )}
              {!searchLoader && searchNameData && searchNameData.length > 0 && searchNameData.map((item, index) => (
                <div key={index} className="hover:bg-[#f5f6f7] hover:cursor-pointer p-1" onClick={()=> handleSetName(item.name)}>
                <p className="font-Roboto text-[16px]">{item.name && item.name}</p>
                </div>
              ))}
            </div>
             )}
        </>
      </div>
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
        <Controller
          name="pkgType"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <SelectInput
            {...register("pkgType")}
              options={packagingType}
              placeholder="Select Packaging Type"
              value={field.value}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              disabled={defaultValues.pkgWeight ? true : false}
              error={errors?.pkgType && errors.pkgType.message}
            />
          )}
        />
      </div>
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
        <Controller
          name="weightUnit"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <SelectInput
            {...register("weightUnit")}
              options={weightUnitType}
              placeholder="Select Unit Type"
              value={field.value}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              disabled={defaultValues.weightUnit ? true : false}
              error={errors?.weightUnit && errors.weightUnit.message}
            />
          )}
        />
      </div>
      <div className={`${isEmpty(defaultValues) ? `2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6` : `2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6`}`}>
        <Controller
          name="pkgWeight"
          control={control}
          render={({ field }) => (
            <FormInput
              {...register("pkgWeight")}
              placeholder="Enter Package Weight"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type="number"
              disabled={defaultValues.pkgWeight ? true : false}
              error={errors?.pkgWeight && errors.pkgWeight.message}
            />
          )}
        />
      </div>
      {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <FormInput
              {...register("price")}
              placeholder="Enter Price Per Package"
              value={field.value}
              type="number"
              onChange={(e) => field.onChange(e.target.value)}
              error={errors?.price && errors.price.message}
            />
          )}
        />
      </div>
       )}
       {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
        <Controller
          name="bidding"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <SelectInput
            {...register("bidding")}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              options={yesNoOption}
              placeholder="Select Bidding Type"
              value={field.value}
              error={errors?.bidding && errors.bidding.message}
            />
          )}
        />
      </div>
       )}
       {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
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
       )}
       {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
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
       )}
       {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-6 xs:col-span-6">
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
       )}
       {!isEmpty(defaultValues) && (
      <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6">
        <Controller
          name="addressId"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <AddressInput
            {...register("addressId")}
              placeholder="Select Address"
              value={field.value ? field.value : []}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              error={errors?.addressId && errors.addressId.message}
            />
          )}
        />
      </div>
       )}
      <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...register("description")}
              placeholder="Enter Product Description"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={defaultValues.description ? true : false}
              error={errors?.description && errors.description.message}
            />
          )}
        />
      </div>
      {isEmpty(defaultValues) && (
      <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6">
            <ImageInput
            placeholder="Enter Product Image"
            onChange={onImages}            
            />
      </div>
      )}
      {images && images.length > 0 && (
      <>
        {images.map((img, index) => (
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-3 xs:col-span-6">
        <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-cover h-[150px] min-w-full max-w-full  rounded-2xl"/>
        </div>
     ))}
          </>

      )}
      <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6 flex mx-auto">
        <Button
          value="Submit"
          width={150}
          height={45}
          disabled={(isEmpty(defaultValues) && images && images.length <= 0) || loader}
          loader={loader}
          variant="primary"
          type="submit"
        />
      </div>
    </div>
  </form>
  );
};

export default GrainsCerealsForm;
