import React, { useState, useMemo, useEffect } from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout"
import FruitsForm from "components/dashboard/ProductForms/FruitsForm";
import VegetablesForm from "components/dashboard/ProductForms/VegetablesForm";
import FertilizersForm from "components/dashboard/ProductForms/FertilizersForm";
import FiberOilSeedCropsForm from "components/dashboard/ProductForms/FiberOilSeedCropsForm";
import GrainsCerealsForm from "components/dashboard/ProductForms/GrainsCerealsForm";
import PlantPathologyEntomologyForm from "components/dashboard/ProductForms/PlantPathologyEntomologyForm";
import SeedVarietiesForm from "components/dashboard/ProductForms/SeedVarietiesForm";
import MachinaryToolsForm from "components/dashboard/ProductForms/MachinaryToolsForm";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { imgUrl } from "helpers/path";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import {addNewProduct} from "../redux/slices/productsSlice/productsAction"
import { useNavigate } from "react-router-dom";
import useSnackMsg from "hooks/useSnackMsg";
import useClient from "hooks/useClient";
import debounce from 'lodash/debounce';
import { CircularProgress } from "@mui/material";
import { isEmpty } from "lodash";

const categoryData = [
  {
    id: 1,
    name: "Fruits",
    val: "fruits",
    img: imgUrl + "/category/Fruits.png",
  },
  {
    id: 2,
    name: "Vegetables",
    val: "vegetables",
    img: imgUrl + "/category/Veges.png",
  },
  {
    id: 3,
    name: "Fertilizers",
    val: "fertilizers",
    img: imgUrl + "/category/Fertilizer.png",
  },
  {
    id: 4,
    name: "Fiber & Oil Seed Crops",
    val: "FiberOilSeedCrops",
    img: imgUrl + "/category/Oilandfibrecrops.png",
  },
  {
    id: 5,
    name: "Grains & Cereals",
    val: "grainsCereals",
    img: imgUrl + "/category/GrainandCerealCrop.png",
  },
  {
    id: 6,
    name: "Plant Pathology & Entomology",
    val: "plantPathologyEntomology",
    img: imgUrl + "/category/Entomolgy.png",
  },
  {
    id: 7,
    name: "Seed Varieties",
    val: "seedVarieties",
    img: imgUrl + "/category/SeedVarieties.png",
  },
  {
    id: 8,
    name: "Machinary & Tools",
    val: "machinaryTools",
    img: imgUrl + "/category/Machineryandtools.png",
  },
];

function getCategoryComponent(val, handleAddNew,images, handleImagesChange, selectProductData) {
  if (!val) return null;
  if (val === "Fruits") {
    return <FruitsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Vegetables") {
    return <VegetablesForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Fertilizers") {
    return <FertilizersForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Fiber & Oil Seed Crops") {
    return <FiberOilSeedCropsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Grains & Cereals") {
    return <GrainsCerealsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Plant Pathology & Entomology") {
    return <PlantPathologyEntomologyForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Seed Varieties") {
    return <SeedVarietiesForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Machinary & Tools") {
    return <MachinaryToolsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
}

const AddNewProduct = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductFlag, setNewProductFlag] = useState(false);
  const [images,setImages] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {eSnack, sSnack} = useSnackMsg()
  const {api} = useClient()
  const [searchLoader,setSearchLoader] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [searchMsg,setSearchMsg] = useState("")
  const [selectProductData, setSelectProductData] = useState({})

  const handleSelectCategory = (val) => {
    if (!val) return;
    setSelectedCategory(val);
  };

  const handleImagesChange = (file) => {
    const img = file[0]
    setImages([...images, img]);
  };

  const handleGoBack = () => {
    setSelectedCategory("")
    setImages([])
    setNewProductFlag(false)
    setSelectProductData({})
    setSearchData([])
    setSearchLoader(false)
    setSearchMsg("")
  }

  const handleAddNew = (val) => {

    Object.assign(val,{
      ProductType:selectedCategory,
      addressId: val.addressId && val.addressId.length > 0 && JSON.stringify(val.addressId.map((item)=> item.id))
    })
   
    if(!isEmpty(selectProductData)){
      Object.assign(val,{
        isAlreadyExists:true,
        productId:selectProductData.id
      })
    }

    const formData = new FormData();
    Object.keys(val).forEach((key) => {
        formData.append(key, val[key]);
    });

    images.forEach((image, index) => {
        formData.append(`images`, image);
    });

    dispatch(addNewProduct(formData)).unwrap()
    .then((res)=>{
      sSnack("Successfully new product added !")
      navigate("/products/my")
    })
    .catch((err)=>{
      eSnack("Sorry Something is went wrong")
    })
  };

  useEffect(()=>{
    handleGoBack()
  },[])

  const handleSearchProduct = useMemo(() => debounce((value, category) => {
    if(!value){
      setSearchData([])
      setSearchLoader(false)
      setSearchMsg("")
    }
    if(!value) return
    const payload = {
      query:value,
      category:category
    }
    setSearchData([])
    setSearchLoader(true)
    setSearchMsg("")
    api.post("/api/product/search", payload)
    .then((res)=>{
      const response = res.data && res.data.data ? res.data.data : []
      setSearchLoader(false)
      setSearchData(response)
      if(response && response.length === 0){
      setSearchMsg("No products were found matching your search criteria.");
      }
    })
    .catch((err)=>{
      setSearchLoader(false)
      setSearchData([])
      setSearchMsg("")
    })
  }, 500), []);


  const handleSelectedProduct = (data) => {
    if(isEmpty(data)) return
    setSelectProductData(data)
    setNewProductFlag(true)
  }



  return (
    <Layout>
      <div className="p-4">
        {!selectedCategory && (
          <>
            <p className="font-Roboto text-primary text-[24px]">
              Select your product category before adding a product !
            </p>
            <div className="grid grid-cols-12 gap-5 mt-5">
              {categoryData.map((item) => (
                <div
                  className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12 p-2 hover:border-2 cursor-pointer hover:border-primary shadow-card rounded-2xl flex flex-col justify-center items-center"
                  key={item.id}
                  onClick={() => handleSelectCategory(item.name)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    draggable={false}
                    className="rounded-xl max-h-[150px] object-contain min-h-[150px] min-w-[150px]"
                  />
                  <p className="mt-5 font-Roboto text-[16px]">{item.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedCategory && (
               <div className="flex mb-2 z-10 bg-white sticky ">
               <div className="shadow-dashboard p-2 rounded-lg flex items-center cursor-pointer" onClick={handleGoBack}>
               <ArrowBackIcon/> 
               </div>
             </div>
        )}
        {selectedCategory && !newProductFlag && (
          <>
            <p className="font-Roboto text-primary text-[24px] mt-5">
              Do you want to search for a product ?
            </p>
            <div className="mt-5 relative">
              <FormInput placeholder="Search Product" onChange={(e)=>handleSearchProduct(e.target.value, selectedCategory)}/>
              {((searchLoader) || (searchData && searchData.length > 0) || (searchMsg)) && (
              <div className="absolute top-[70px] right-0 left-0 max-h-[200px] p-5 overflow-y-auto bg-white shadow-dashboard rounded-2xl">
                {searchLoader && (
                <CircularProgress sze={28} style={{color:"#668968"}}/>
                )}
                {!searchLoader && searchMsg && searchData && searchData.length === 0 && (
                  <p className="font-Roboto text-[16px]">{searchMsg}</p>
                )}
                {!searchLoader && searchData && searchData.length > 0 && searchData.map((item, index) => (
                  <div className="hover:bg-[#f5f6f7] hover:cursor-pointer p-3" onClick={()=> handleSelectedProduct(item)}>
                  <p className="font-Roboto text-[16px]" key={index}>{`${item.name && item.name} ${item.brand ? `( ${item.brand} )` : "" }`}</p>
                  </div>
                ))}
              </div>
               )}
            </div>
            <p className="font-Roboto text-primary text-[24px] mt-10">
              Are you interested in adding a new product ?
            </p>
            <div className="mt-5">
              <Button value="Yes" width={150} height={50} onClick={() => setNewProductFlag(true)} />
            </div>
          </>
        )}
        {selectedCategory && newProductFlag && (
          <div className="mt-5">
          {getCategoryComponent(selectedCategory, handleAddNew, images, handleImagesChange, selectProductData)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(AddNewProduct);
