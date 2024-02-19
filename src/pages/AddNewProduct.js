import React, { useState } from "react";
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
import moment from "moment"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const categoryData = [
  {
    id: 1,
    name: "Fruits",
    val: "fruits",
    img: imgUrl + "/category/fruits.jpg",
  },
  {
    id: 2,
    name: "Vegetables",
    val: "vegetables",
    img: imgUrl + "/category/vegetables.jpg",
  },
  {
    id: 3,
    name: "Fertilizers",
    val: "fertilizers",
    img: imgUrl + "/category/fertilizers.png",
  },
  {
    id: 4,
    name: "Fiber & Oil Seed Crops",
    val: "FiberOilSeedCrops",
    img: imgUrl + "/category/fiberOil.jpg",
  },
  {
    id: 5,
    name: "Grains & Cereals",
    val: "grainsCereals",
    img: imgUrl + "/category/Grains&Cereals.jpg",
  },
  {
    id: 6,
    name: "Plant Pathology & Entomology",
    val: "plantPathologyEntomology",
    img: imgUrl + "/category/PlantPathology&Entomology.jpg",
  },
  {
    id: 7,
    name: "Seed Varieties",
    val: "seedVarieties",
    img: imgUrl + "/category/SeedVarieties.jpg",
  },
  {
    id: 8,
    name: "Machinary & Tools",
    val: "machinaryTools",
    img: imgUrl + "/category/Machinary&Tools.jpg",
  },
];

function getCategoryComponent(val, handleAddNew,images, handleImagesChange, ) {
  if (!val) return null;
  if (val === "Fruits") {
    return <FruitsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
  if (val === "Vegetables") {
    return <VegetablesForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange}/>;
  }
  if (val === "Fertilizers") {
    return <FertilizersForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange}/>;
  }
  if (val === "Fiber & Oil Seed Crops") {
    return <FiberOilSeedCropsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
  if (val === "Grains & Cereals") {
    return <GrainsCerealsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
  if (val === "Plant Pathology & Entomology") {
    return <PlantPathologyEntomologyForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
  if (val === "Seed Varieties") {
    return <SeedVarietiesForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
  if (val === "Machinary & Tools") {
    return <MachinaryToolsForm onSubmit={handleAddNew} images={images} onImages={handleImagesChange} />;
  }
}

const AddNewProduct = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductFlag, setNewProductFlag] = useState(false);
  const [images,setImages] = useState([])

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
  }

  const handleAddNew = (val) => {

    const formFlag = selectedCategory === "Fruits" || selectedCategory === "Vegetables" || selectedCategory === "Fiber & Oil Seed Crops" || selectedCategory === "Grains & Cereals"

    if(formFlag){
      Object.assign(val,{
      shelfLifeStart: val.shelfLifeStart && moment(val.shelfLifeStart, "YYYY-MM-DD").format("DD/MM/YYYY"),
      shelfLifeEnd: val.shelfLifeEnd && moment(val.shelfLifeEnd, "YYYY-MM-DD").format("DD/MM/YYYY"),
      availableFrom: val.availableFrom && moment(val.availableFrom, "YYYY-MM-DD").format("DD/MM/YYYY"),
      })
    }

    Object.assign(val,{
      ProductType:selectedCategory,
      discount:"no"
    })
    console.log("value", val)
  };



  return (
    <Layout>
      <div className="p-4">
        {!selectedCategory && (
          <>
            <p className="font-Josefin text-primary text-[24px]">
              Select your product category before adding a product !
            </p>
            <div className="grid grid-cols-4 gap-5 mt-5">
              {categoryData.map((item) => (
                <div
                  className="col-span-1 p-2 hover:border-2 cursor-pointer hover:border-primary shadow-card rounded-2xl flex flex-col justify-center items-center"
                  key={item.id}
                  onClick={() => handleSelectCategory(item.name)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    draggable={false}
                    className="rounded-xl max-h-[150px] object-cover min-h-[150px] min-w-[150px]"
                  />
                  <p className="mt-5 font-Catamaran text-[16px]">{item.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {/* {selectedCategory && !newProductFlag && (
          <>
            <p className="font-Josefin text-primary text-[24px] mt-5">
              Do you want to search for a product ?
            </p>
            <div className="mt-5">
              <FormInput placeholder="Search Product" />
            </div>
            <p className="font-Josefin text-primary text-[24px] mt-10">
              Are you interested in adding a new product ?
            </p>
            <div className="mt-5">
              <Button value="Yes" width={150} height={50} onClick={() => setNewProductFlag(true)} />
            </div>
          </>
        )} */}
        {selectedCategory && (
          <>
          <div className="flex mb-2 z-10 bg-white sticky ">
            <div className="shadow-dashboard p-2 rounded-lg flex items-center cursor-pointer" onClick={handleGoBack}>
            <ArrowBackIcon/> 
            </div>
          </div>
          {getCategoryComponent(selectedCategory, handleAddNew, images, handleImagesChange)}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AddNewProduct;
