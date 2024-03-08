import React,{useState, useMemo} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  packagingType,
  weightUnitType,
  seedTypeOption,
  seedRegionOption
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { SeedFormSchema } from "helpers/schema";
import { useSelector } from "react-redux";
import useClient from "hooks/useClient";
import debounce from 'lodash/debounce';
import { CircularProgress } from "@mui/material";
import AddressInput from "components/common/base/AddressInput";

const SeedVarietiesForm = ({ onSubmit, onImages, images, defaultValues , category}) => {

  const [searchLoader,setSearchLoader] = useState(false)
  const [searchNameData, setNameSearchData] = useState([])
  const {api} = useClient()
  const loader = useSelector((state)=> state.products.newProductLoader)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SeedFormSchema),
    defaultValues
  });


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
      <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6 relative">
          <>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Seed Name"
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
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-6 xs:col-span-6">
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
                disabled={defaultValues.pkgType ? true : false}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-6 xs:col-span-6">
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
                disabled={defaultValues.pkgType ? true : false}
                error={errors?.pkgWeight && errors.pkgWeight.message}
              />
            )}
          />
        </div>
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6">
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
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 xs:col-span-6">
              <ImageInput
              placeholder="Enter Product Image"
              onChange={onImages}            
              />
        </div>
        {images && images.length > 0 && (
        <>
          {images.map((img, index) => (
          <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-3 xs:col-span-6">
          <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-cover h-[150px] min-w-full max-w-full  rounded-2xl"/>
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
            disabled={(images && images.length <= 0) || loader}
            loader={loader}
          />
        </div>
      </div>
    </form>
  );
};

export default SeedVarietiesForm;
