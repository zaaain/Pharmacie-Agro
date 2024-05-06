import React,{useState, useEffect} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { BioUpdateSchema } from "helpers/schema";
import { category } from "helpers/constant";
import {
  weightUnitType,
} from "helpers/constant";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const SearchProductForm = ({handleSearch}) => {


  const [cateFlag, setCateFlag] = useState(false)
  const [chemicals, setChemicals] = useState([{ name: "", unit:"", volume:""}]);
  const [flag, setFlag] = useState(true);
  const [chemFlag, setChemFlag] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(BioUpdateSchema),
  });


  const checkEmptyFields = (chemicalsArray) => {
    const isEmpty = chemicalsArray.some(
      (chem) => chem.name.trim() === ""
    );
    setFlag(isEmpty);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedChemicals = [...chemicals];
    updatedChemicals[index][fieldName] = value;
    setChemicals(updatedChemicals);
    checkEmptyFields(updatedChemicals);
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

  useEffect(()=>{
    const flag = chemicals.some((item)=> item.name)
    if(flag){
      setChemFlag(true)
    }else{
      setChemFlag(false)
    }
  },[chemicals])

  const handleSubmitNow = (val) => {
    Object.assign(val, { composition: chemicals });
    handleSearch(val)
  }


  return (
    <form onSubmit={handleSubmit(handleSubmitNow)}>
      <div className="grid grid-cols-6 gap-5 rounded-lg">
        <div className="col-span-3">
          <Controller
            name="query"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("query")}
                placeholder="Enter Product Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.query && errors.query.message}
              />
            )}
          />
        </div>
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
        <div className="col-span-6">
        <Controller
            name="category"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("category")}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption)
                  setCateFlag(true)
                }}
                options={category}
                placeholder="Select category Type"
                value={field.value}
                error={errors?.category && errors.category.message}
              />
            )}
          />
          </div>
          {cateFlag && (
         <div className="col-span-6">
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("subCategory")}
                placeholder="Enter Sub Category"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.subCategory && errors.subCategory.message}
              />
            )}
          />
        </div> 
      )}
        {chemicals.map((chem, index) => (
        <>
        <div className={`col-span-2`}>
              <FormInput
                placeholder="Active Ingredients"
                value={chem.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
              />
    
        </div>
        <div className={`col-span-2`}>
              <FormInput
                placeholder="Concentration"
                type="number"
                value={chem.volume}
                onChange={(e) => handleInputChange(index, "volume", e.target.value)}
              />
    
        </div>
        <div className={`col-span-2`}>
              <SelectInput
                placeholder="Unit"
                value={chem.unit}
                options={weightUnitType}
                onChange={(e) => handleInputChange(index, "unit", e.target.value)}
              />
        </div>
   
        <div className="col-span-6 flex">
              <div className={`${!chemFlag ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={handleAddNewChem}>
                <AddIcon style={{color:"white"}}/>
              </div>
              <div className={`${!chemFlag || chemicals.length === 1 ? "bg-[#eaeaea]" : "bg-secondary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={()=>handleRemoveChem(index)}>
                <CloseIcon style={{color:"white"}}/>
              </div>
        </div>
      
        </>
        ))}
        <div className="col-span-6 flex justify-center">
              <Button value="Search Here" width={150} height={45} type="submit" loader={false} disabled={false}/>
        </div>
      </div>
    </form>
  );
};

export default SearchProductForm;
