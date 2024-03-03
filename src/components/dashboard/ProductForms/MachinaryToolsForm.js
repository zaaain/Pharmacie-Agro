import React, {useState, useMemo} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  machinaryToolsOption,
  toolCondition
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { MachinaryFormSchema } from "helpers/schema";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import useClient from "hooks/useClient";
import debounce from 'lodash/debounce';
import { CircularProgress } from "@mui/material";

const MachinaryToolsForm = ({ onSubmit, onImages, images, defaultValues }) => {

  const [proType, setProType] =useState("")

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MachinaryFormSchema(proType)),
    defaultValues
  });
  const [searchLoader,setSearchLoader] = useState(false)
  const [searchNameData, setNameSearchData] = useState([])
  const {api} = useClient()
  const loader = useSelector((state)=> state.products.newProductLoader)
  const flag = defaultValues && isEmpty(defaultValues) ? false : true

  const handleSearchProduct = useMemo(() => debounce((value, category) => {
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
      <div className="grid col-cols-4 gap-4">
      <div className="col-span-2 xs:col-span-4 relative">
          <>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Product Name"
                value={field.value}
                onChange={(e) => {
                  handleSearchProduct(e.target.value)
                  field.onChange(e.target.value)
                }}
                disabled={flag}
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
        <div className="col-span-2 xs:col-span-4">
        <Controller
            name="type"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("type")}
                onChange={(selectedOption) => {
                  setProType(selectedOption.target.value)
                  field.onChange(selectedOption)
                }}
                options={machinaryToolsOption}
                placeholder="Select Product Type"
                value={field.value}
                error={errors?.type && errors.type.message}
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
                    options={toolCondition}
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
        <div className="col-span-2 xs:col-span-4">
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
     
        <div className="col-span-2 xs:col-span-4">
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
        <div className="col-span-4 ">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextAreaInput
                {...register("description")}
                placeholder="Enter Product Description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={flag}
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
          <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-2 xs:col-span-4">
          <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-cover h-[150px] min-w-full max-w-full  rounded-2xl"/>
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
