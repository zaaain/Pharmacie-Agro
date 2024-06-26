import React,{useState, useMemo, useEffect} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import DateInput from "components/common/base/DateInput"
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
import { isEmpty } from "lodash";

const PlantPathologyEntomologyForm = ({ onSubmit, onImages, images, defaultValues , category }) => {

  const schemaFlag = isEmpty(defaultValues) ? true : false
  const loader = useSelector((state)=> state.products.newProductLoader)
  const [chemicals, setChemicals] = useState([{ name: "", unit:"", volume:""}]);
  const [flag, setFlag] = useState(true);
  const {eSnack} = useSnackMsg()
  const [searchLoader,setSearchLoader] = useState(false)
  const [searchNameData, setNameSearchData] = useState([])
  const {api} = useClient()
  const [chemFlag, setChemFlag] = useState(false);
  const [diseases, setDiseases] = useState([''])
  
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FertilizersFormSchema(schemaFlag)),
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
      (chem) => chem.name.trim() === ""
    );
    setFlag(isEmpty);
  };

  const handleAddNewChem = () => {
    if(!chemFlag) return
    setChemicals([...chemicals, { name: "", unit:"", volume:"" }]);
    setFlag(true);
  };

  const handleRemoveChem = (index) => {
    if(!chemFlag || chemicals.length === 1) return
    const updatedChemicals = [...chemicals];
    updatedChemicals.splice(index, 1);
    setChemicals(updatedChemicals);
  };

  const onSubmitNow = async (val) => {
    if (isEmpty(defaultValues) && flag) {
      eSnack("First, add the active ingredient.");
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
    const flag = chemicals.some((item)=> item.name)
    if(flag){
      setChemFlag(true)
    }else{
      setChemFlag(false)
    }
  },[chemicals])

  useEffect(()=>{
    if(defaultValues && defaultValues.composition && defaultValues.composition.length > 0){
      const chem = defaultValues.composition.map((item)=> ({name:item.name, unit:item.unit ? item.unit : "" , volume:item.volume ? item.volume : "" }))
      setChemicals(chem)
      
    }
  },[])


  useEffect(()=>{
    if(defaultValues.disease && defaultValues.disease.length > 0){
      setDiseases(defaultValues.disease)
    }
  },[])
  
  const handleAddDisease = () => {
    const flag = diseases.some((item) => item === "")
    if(flag) return
    setDiseases([...diseases, '']);
  };

  const handleRemoveDisease = (index) => {
    if(diseases && diseases.length === 1) return
    const updatedDiseases = [...diseases];
    updatedDiseases.splice(index, 1); // Remove the disease at the specified index
    setDiseases(updatedDiseases);
  };

  const handleDiseaseChange = (value, index) => {
    const updatedDiseases = [...diseases];
    updatedDiseases[index] = value;
    setDiseases(updatedDiseases);
  };



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

        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1">
          <Controller
            name="subProductType"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("subProductType")}
                placeholder="Enter Sub Product Type"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={defaultValues.subProductType ? true : false}
                error={errors?.subProductType && errors.subProductType.message}
              />
            )}
          />
        </div>
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1">
          <Controller
            name="areaCovered"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("areaCovered")}
                placeholder="Enter Area Covered"
                value={field.value}
                // type="number"
                onChange={(e) => field.onChange(e.target.value)}
                disabled={defaultValues.areaCovered ? true : false}
                error={errors?.areaCovered && errors.areaCovered.message}
              />
            )}
          />
        </div>
        <>
        {chemicals.map((chem, index) => (
        <>
        {/* <div className={`${!isEmpty(defaultValues) ? `2xl:col-span-6 xl:col-span-6 lg:col-span-6` :`2xl:col-span-5 xl:col-span-5 lg:col-span-5`}   md:col-span-2 sm:col-span-1 xs:col-span-1`}> */}
        <div className={`2xl:col-span-2 xl:col-span-2 lg:col-span-2   md:col-span-2 sm:col-span-1 xs:col-span-1`}>
              <FormInput
                placeholder="Active Ingredients"
                value={chem.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                disabled={chem.name && !isEmpty(defaultValues) ? true : false }
              />
    
        </div>
        <div className={`${!isEmpty(defaultValues) ? `2xl:col-span-2 xl:col-span-2 lg:col-span-2` : `2xl:col-span-1 xl:col-span-1 lg:col-span-1`}    md:col-span-2 sm:col-span-1 xs:col-span-1`}>
              <FormInput
                placeholder="Concentration"
                type="number"
                value={chem.volume}
                onChange={(e) => handleInputChange(index, "volume", e.target.value)}
                disabled={chem.volume && !isEmpty(defaultValues) ? true : false }
              />
    
        </div>
        <div className={`   md:col-span-2 sm:col-span-1 xs:col-span-1`}>
              <SelectInput
                placeholder="Unit"
                value={chem.unit}
                options={weightUnitType}
                onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                disabled={chem.unit && !isEmpty(defaultValues) ? true : false }
              />
        </div>
        {isEmpty(defaultValues) && (
        <div className="2xl:col-span-1 flex items-center xl:col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <div className={`${!chemFlag ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={handleAddNewChem}>
                <AddIcon style={{color:"white"}}/>
              </div>
              <div className={`${!chemFlag || chemicals.length === 1 ? "bg-[#eaeaea]" : "bg-secondary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={()=>handleRemoveChem(index)}>
                <CloseIcon style={{color:"white"}}/>
              </div>
        </div>
      
        )}
        </>
        ))}
        </>
        {/* )} */}
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
                disabled={defaultValues.pkgWeight ? true : false}
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
        {diseases && diseases.length > 0 && diseases.map((disease,index)=>(
          <>
        <div className={`${!isEmpty(defaultValues) ? `2xl:col-span-6 xl:col-span-6 lg:col-span-6` :`2xl:col-span-5 xl:col-span-5 lg:col-span-5`}   md:col-span-2 sm:col-span-1 xs:col-span-1`}>
            <FormInput
                placeholder="Enter Disease"
                value={disease}
                onChange={(e) => handleDiseaseChange(e.target.value, index)}
                disabled={disease && !isEmpty(defaultValues) ? true : false }
            />
        </div>
        {isEmpty(defaultValues) && (
        <div className="2xl:col-span-1 flex items-center xl:col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <div onClick={handleAddDisease} className={` ${!disease ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`}>
                <AddIcon style={{color:"white"}}/>
              </div >
              <div  onClick={() => handleRemoveDisease(index)}  className={` ${!disease || diseases.length === 1 ? "bg-[#eaeaea]" : "bg-secondary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`}>
                <CloseIcon style={{color:"white"}}/>
              </div>
        </div>
        )}
        </>
        ))}
        {!isEmpty(defaultValues) && (
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
        )}
        {!isEmpty(defaultValues) && (
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1 xs:col-span-1">
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
          {!isEmpty(defaultValues) && (
            <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
            <Controller
              name="expiryDate"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DateInput
                  {...register("expiryDate")}
                  placeholder="Select Expiry Date  Date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors?.expiryDate && errors.expiryDate.message}
                />
              )}
            />
          </div>
        )}
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
        {isEmpty(defaultValues) && (
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-2 sm:col-span-1 xs:col-span-1">
              <ImageInput
              placeholder="Enter Product Image"
              onChange={onImages}            
              />
        </div>
        )}
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
            disabled={(isEmpty(defaultValues) && images && images.length <= 0) || loader}
          />
        </div>
      </div>
    </form>
  );
};

export default PlantPathologyEntomologyForm;

