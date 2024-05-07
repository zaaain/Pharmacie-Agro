import React, { useState, useEffect } from "react";
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
import PesticidesForm from "components/dashboard/ProductForms/PesticidesForm";
import { imgUrl } from "helpers/path";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from "react-redux";
import {addNewProduct} from "../redux/slices/productsSlice/productsAction"
import { useNavigate } from "react-router-dom";
import useSnackMsg from "hooks/useSnackMsg";
import { isEmpty } from "lodash";
import SearchProductForm from "Forms/SearchProductForm";
import { searchProduct } from "../redux/slices/productsSlice/productsAction";
import ProductCard from "components/dashboard/SearchProductCard";
import { clearProduct } from "../redux/slices/productsSlice/productsReducer";

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
    img: imgUrl + "/category/fertilizer.png",
  },
  {
    id: 4,
    name: "Pesticides",
    val: "pesticides",
    img: imgUrl + "/category/Pesticide.png",
  },
  {
    id: 5,
    name: "Fiber & Oil Seed Crops",
    val: "FiberOilSeedCrops",
    img: imgUrl + "/category/Oilandfibrecrops.png",
  },
  {
    id: 6,
    name: "Grains & Cereals",
    val: "grainsCereals",
    img: imgUrl + "/category/GrainandCerealCrop.png",
  },
  {
    id: 7,
    name: "Plant Pathology & Entomology",
    val: "plantPathologyEntomology",
    img: imgUrl + "/category/Entomolgy.png",
  },
  {
    id: 8,
    name: "Seed Varieties",
    val: "seedVarieties",
    img: imgUrl + "/category/SeedVarieties.png",
  },
  {
    id: 9,
    name: "Machinary & Tools",
    val: "machinaryTools",
    img: imgUrl + "/category/Machineryandtools.png",
  },
];

function getCategoryComponent(val, handleAddNew,images, handleImagesChange, selectProductData) {
  if (!val) return null;
  if (val === "Fruits") {
    return <FruitsForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Vegetables") {
    return <VegetablesForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Fertilizers") {
    return <FertilizersForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Pesticides") {
    return <PesticidesForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Fiber & Oil Seed Crops") {
    return <FiberOilSeedCropsForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Grains & Cereals") {
    return <GrainsCerealsForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Plant Pathology & Entomology") {
    return <PlantPathologyEntomologyForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Seed Varieties") {
    return <SeedVarietiesForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
  if (val === "Machinary & Tools") {
    return <MachinaryToolsForm category={val} onSubmit={handleAddNew} images={images} onImages={handleImagesChange} defaultValues={!isEmpty(selectProductData) ? selectProductData : {}}/>;
  }
}

const AddNewProduct = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductFlag, setNewProductFlag] = useState(false);
  const [images,setImages] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {eSnack, sSnack} = useSnackMsg()
  const [selectProductData, setSelectProductData] = useState({})
  const {productsData, productMsg} = useSelector((state)=> state.products)

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
    dispatch(clearProduct())
  }

  const handleAddNew = (val) => {

    Object.assign(val,{
      productType:selectedCategory,
    })
   
    if(!isEmpty(selectProductData)){
      Object.assign(val,{
        isAlreadyExists:true,
        addressId: val.addressId && val.addressId.length > 0 && JSON.stringify(val.addressId.map((item)=> item.id)),
        productId:selectProductData.id
      })
    }

    const formData = new FormData();
    Object.keys(val).forEach((key) => {
        formData.append(key, val[key]);
    });

    if(isEmpty(selectProductData)){
    images.forEach((image, index) => {
        formData.append(`images`, image);
    })};

    dispatch(addNewProduct(formData)).unwrap()
    .then((res)=>{
      sSnack(!isEmpty(selectProductData) ? `Your product has been added to the list. Thank you!` : `Thank you for adding the product!`)
      navigate("/products/my")
    })
    .catch((err)=>{
      eSnack("Sorry Something is went wrong")
    })
  };

  useEffect(()=>{
    handleGoBack()
  },[])


  const handleSelectedProduct = (data) => {
    if(isEmpty(data)) return
    setSelectProductData(data)
    setNewProductFlag(true)
  }

const handleSearch = (val) => {
  const payload = {
    query: val.query ? val.query : undefined,
    brand: val.brand ? val.brand : undefined,
    category: val.category ? val.category : undefined,
    subCategory: val.category && val.subCategory ? val.subCategory : undefined,
    composition: val.composition && val.composition.length > 0 ? val.composition : undefined
  }
  dispatch(searchProduct(payload))
}

  return (
    <Layout>
      <div className="p-4">
        {!selectedCategory && (
          <>
            <p className="font-Roboto text-primary text-[24px]">
              Please Select Product Category
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
          <div className=" p-5 shadow-card bg-white rounded-xl">
             <SearchProductForm cate={selectedCategory} handleSearch={handleSearch}/>
            {/* <p className="font-Roboto text-primary text-[24px] mt-5">
            You search for the name of your product and list it.
            </p> */}
            {/* <div className="flex justify-between items-center mb-5"> */}
              {/* <FormInput placeholder="Search Product" onChange={(e)=>handleSearchProduct(e.target.value, selectedCategory)}/>
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
               )} */}
               {/* <SearchProductForm/> */}
               {/* <p className="font-Roboto text-primary text-[16px] ">
            Note: If your product is not in the list, you can click on the 'Add New' button to add it. We will review and add it to the list soon.
            </p>
            <Button value="Add New" width={150} height={50} onClick={() => setNewProductFlag(true)} />
            </div> */}
            {/* <Button value="Apply Filter" width={150} height={50} onClick={() => setSearchFlag(true)} /> */}
            {/* <SearchProductForm/>  */}
            {/* <div className="mt-5">
              
            </div> */}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-5">
            {productMsg && (
              <p>{productMsg}</p>
            )}
          {productsData && productsData.length > 0 && productsData.map((item, index)=>(
            <div className="col-span-1" key={index}>
              <ProductCard data={item} onSelect={handleSelectedProduct}/>
            </div>
          ))}
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
