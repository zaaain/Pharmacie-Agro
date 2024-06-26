import React, {useState, useEffect} from "react";
import Layout from "layout/BaseLayout";
import Filter from "components/allProducts/Filter";
import Card from "components/allProducts/Card";
import { getAllProduct, getProductWithCategory, searchProduct } from "../redux/slices/productsSlice/productsAction";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Modal from "components/common/base/Modal";
import SearchProductForm from "Forms/SearchProductForm";
import queryString from 'query-string';
import { useLocation, } from "react-router-dom";

const AllProducts = () => {

  const dispatch = useDispatch()
  const [flag,setFlag] = useState(false)
  const location = useLocation()
  const { id } = queryString.parse(location.search);
  const {allProductLoader, productWithCategoryLoader, productsData, productMsg} = useSelector((state)=> state.products)

  const handleGetAllPro = () => {
    dispatch(getAllProduct())
  }

  const handleGetCategoryProName = (val) => {
    if(!val) return
    if(val === "Fruits"){
      return "Fruits"
    }
    if(val === "Vegetables"){
      return "Vegetables"
    }
    if(val === "Fertilizers"){
      return "Fertilizers"
    }
    if(val === "Fiber "){
      return "Fiber & Oil Seed Crops"
    }
    if(val === "Grains "){
      return "Grains & Cereals"
    }
    if(val === "Plant "){
      return "Plant Pathology & Entomology"
    }
    if(val === "Seed "){
      return "Seed Varieties"
    }
    if(val === "Seed "){
      return "Seed Varieties"
    }
    if(val === "Machinary "){
      return "Machinary & Tools"
    }
    if(val === "Pesticides"){
      return "Pesticides"
    }
  }

  const handleGetCategoryPro = (val) => {
    if(!val.category) return
    dispatch(getProductWithCategory(val.category))
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
    setFlag(false)
  }

  useEffect(()=>{
    if(!id) return
    dispatch(getProductWithCategory(handleGetCategoryProName(id)))
  },[])

  return (
    <>
    <Layout>
      <div className="w-[95%] mx-auto my-10">
        <div>
          <Filter value={id ? handleGetCategoryProName(id) : ""} handleGetAllPro={handleGetAllPro} handleGetCategoryPro={handleGetCategoryPro} onFilter={()=>setFlag(true)}/>
        </div>
        <div className="grid grid-cols-12 gap-5 mt-[60px]">
          {(allProductLoader || productWithCategoryLoader ) && (
            <div className="col-span-12 flex justify-center">
              <CircularProgress size={42} style={{color:"#668968"}}/>
            </div>
          )}
          {(!allProductLoader && !productWithCategoryLoader && productMsg !== "") && (
            <div className="col-span-12 flex justify-center">
              <p className="font-Roboto text-[18px]">{productMsg}</p>
            </div>
          )}
          {!allProductLoader && !productWithCategoryLoader && productsData && productsData.length > 0 &&
            productsData.map((item) => (
              <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12" key={item.id}>
                <Card data={item} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
    <Modal isOpen={flag} toggle={() => setFlag(false)} title="Search Products">
      <SearchProductForm handleSearch={handleSearch}/>
    </Modal>
    </>
  );
};

export default AllProducts;
