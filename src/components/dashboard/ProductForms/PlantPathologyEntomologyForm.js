import React,{useState, useMemo, useEffect} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  packagingType,
  weightUnitType,
} from "helpers/constant";
import { Button } from "components/common/base/button";
import ImageInput from "components/common/base/ImageInput";
import { FertilizersFormSchema } from "helpers/schema";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import useSnackMsg from "hooks/useSnackMsg";
import useClient from "hooks/useClient";
import debounce from 'lodash/debounce';
import { CircularProgress } from "@mui/material";
import AddressInput from "components/common/base/AddressInput";

const PlantPathologyEntomologyForm = ({ onSubmit, onImages, images, defaultValues , category }) => {

  const loader = useSelector((state)=> state.products.newProductLoader)
  const [chemicals, setChemicals] = useState([{ name: "", percentage: "" }]);
  const [flag, setFlag] = useState(true);
  const {eSnack} = useSnackMsg()
  const [searchLoader,setSearchLoader] = useState(false)
  const [searchNameData, setNameSearchData] = useState([])
  const {api} = useClient()
  const [chemFlag, setChemFlag] = useState(false);
  
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FertilizersFormSchema),
    defaultValues
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

  const handleAddNewChem = (index) => {
    if(!chemFlag) return
    setChemicals([...chemicals, { name: "", percentage: "" }]);
    setFlag(true);
  };

  const handleRemoveChem = (index) => {
    if(!chemFlag || chemicals.length === 1) return
    const updatedChemicals = [...chemicals];
    updatedChemicals.splice(index, 1);
    setChemicals(updatedChemicals);
  };

  const onSubmitNow = async (val) => {
    if (flag) {
      eSnack("Please complete formula");
      return;
    }
    const count = await chemicals && chemicals.reduce((accumulator, item) => accumulator + parseFloat(item.percentage), 0);
    if (count > 100) {
      eSnack("The total sum of chemical percentages cannot exceed 100.");
      return;
    }
    Object.assign(val, { composition: JSON.stringify(chemicals) });
    onSubmit(val);
  };

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

  useEffect(()=>{
    const flag = chemicals.some((item)=> item.name && item.percentage)
    if(flag){
      setChemFlag(true)
    }else{
      setChemFlag(false)
    }
  },[chemicals])


  return (
    <form onSubmit={handleSubmit(onSubmitNow)}>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 items-center">
      <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1 relative">
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
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1 ">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("brand")}
                placeholder="Brand Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={defaultValues.brand ? true : false}
                error={errors?.brand && errors.brand.message}
              />
            )}
          />
        </div>
        {chemicals.map((chem, index) => (
        <>
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1">
 
              <FormInput
                options={packagingType}
                placeholder="Composition Name"
                value={chem.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                error={errors?.composition && errors.composition.message}
              />
    
        </div>
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <FormInput
                type="number"
                id="percentage"
                placeholder="Enter Percentage"
                value={chem.percentage}
                onChange={(e) => handleInputChange(index, "percentage", e.target.value)}
              />
      
        </div>
        <div className="2xl:col-span-1 flex items-center xl:col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <div className={`${!chemFlag ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={handleAddNewChem}>
                <AddIcon style={{color:"white"}}/>
              </div>
              <div className={`${!chemFlag || chemicals.length === 1 ? "bg-[#eaeaea]" : "bg-primary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={()=>handleRemoveChem(index)}>
                <CloseIcon style={{color:"white"}}/>
              </div>
        </div>
        </>
        ))}
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
                disabled={defaultValues.number ? true : false}
                error={errors?.pkgWeight && errors.pkgWeight.message}
              />
            )}
          />
        </div>
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
                disabled={defaultValues.weightUnit ? true : false}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div> 
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
                disabled={defaultValues.pkgType ? true : false}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div> 
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <ImageInput
              placeholder="Enter Product Image"
              onChange={onImages}            
              />
        </div>
        {images && images.length > 0 && (
        <>
          {images.map((img, index) => (
          <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-1 sm:col-span-1 xs:col-span-1">
          <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-cover h-[150px] min-w-full max-w-full  rounded-2xl"/>
          </div>
       ))}
            </>

        )}
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1 flex mx-auto">
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

export default PlantPathologyEntomologyForm;

