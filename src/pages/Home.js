import React from "react";
import Layout from "layout/BaseLayout";
import { useSelector } from "react-redux";
import { Button } from "components/common/base/button";
import ServiceCard from "components/homePage/ServiceCard";
import SellingCard from "components/homePage/SellingCard";
import CategoryCard from "components/homePage/CategoryCard";
import ReviewCard from "components/homePage/ReviewCard";
import { useNavigate } from "react-router-dom";

const url = process.env.PUBLIC_URL;

const content = {
  img: url + "/homeMain.png",
  subTite: "Best Quality Products",
  title: "Smart Agri - Movement!",
  text: "Join smart agri movement to become a part of growing community as well as sustainable agriculture.",
  leafImg: url + "/basil-leaf.png",
};

const Service = [
  {
    id: 1,
    img: url + "icons/certificate.png",
    name: "Certified Products",
  },
  {
    id: 2,
    img: url + "icons/commodity.png",
    name: "Fresh Agri-Commodities",
  },
  {
    id: 3,
    img: url + "icons/wallet.png",
    name: "Secure Business",
  },
  {
    id: 4,
    img: url + "icons/user-friendly.png",
    name: "User Friendly",
  },
];

const Selling = [
  {
    id: 1,
    img: url + "agripro.jpg",
    category: "Fertilizers",
    price: 1500,
    name: "Lambda",
  },
  {
    id: 2,
    img: url + "agripro.jpg",
    category: "Vegetables",
    price: 1500,
    name: "Lambda",
  },
  {
    id: 3,
    img: url + "agripro.jpg",
    category: "Fruits",
    price: 1000,
    name: "Lambda",
  },
  {
    id: 4,
    img: url + "agripro.jpg",
    category: "Fertilizers",
    price: 1200,
    name: "Lambda",
  },
];

const Category = [
  {
    id: 1,
    title: "Fresh fruits & vegetables",
    about:
      "All the fruits & vegetables are sourced from local farms and are guaranteed to be fresh and full of flavor.",
  },
  {
    id: 2,
    title: "Cereals & Legumes",
    about:
      "Order now and enjoy the convenience of having a wide range of cereals and legumes.",
  },
  {
    id: 3,
    title: "Fiber & Oil seed crops",
    about:
      "Now you can buy a variety of fiber & oil seed crops/products in one place.",
  },
];

const Reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: "4.0",
    avatar: url + "/kisan.png",
    reviewText:
      "I recently purchased some tomato seeds from Agronomics Market Place and was blown away by their quality. The seeds were easy to plant and grew into beautiful, healthy tomato plants that produced a bountiful harvest. I will definitely be coming back for more seeds in the future.",
  },
  {
    id: 2,
    name: "John Doe",
    rating: "4.5",
    avatar: url + "/kisan.png",
    reviewText:
      "I've been using Agronomics Market Place for all of my gardening needs, including fertilizers and pesticides, and have been extremely happy with the results. My crops have never looked better, and I feel confident that I'm using products that are safe for both my family and the environment.",
  },
  {
    id: 3,
    name: "John Doe",
    rating: "5.0",
    avatar: url + "/kisan.png",
    reviewText:
      "Agronomics Market Place is my go-to for high-quality fruits and vegetables. I can always count on their produce to be fresh and delicious. Plus, I love that I can support local farmers and small businesses through this marketplace.",
  },
];

const Home = () => {
    const authReducer = useSelector((state) => state.auth)
    const navigate = useNavigate()

  return (
    <Layout>
      <div className={`mb-10 min-w-full`}>
        {/*Container 1*/}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 md:w-[90%] xs:w-[90%] sm:w-[80%] lg:[80%] xl:[80%] 2xl:[80%] mx-auto gap-10 items-center my-[100px]">
          <div className="col-span-1 flex justify-center">
            <img
              src={content.img}
              alt="img"
              className="w-full md:h-[450px] sm:h-[400px] xs:h-[300px] bg-contain"
            />
          </div>
          <div className="flex flex-col col-span-1 xs:justify-center xs:items-center">
            <p className="text-secondary font-RobotoBold text-[16px]">
              {content.subTite}
            </p>
            <p className="text-primary font-RobotoBold sm:text-[32px] xs:text-[22px] mt-5">
              {content.title}
            </p>
            <p className=" font-Roboto text-[18px] mt-2 xs:text-center">
              {content.text}
            </p>
            <div className="mt-5">
              <Button value="Shop Now" width={160} height={40} font="Roboto" onClick={()=> navigate("/products/all")}/>
            </div>
          </div>
        </div>
        {/*Container 2*/}
        <div className="grid bg-primary w-[100%] 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 p-10 md:gap-10 sm:gap-5 xs:gap-4">
          {Service &&
            Service.map((item) => (
              <div className="col-span-1" key={item.id}>
                <ServiceCard data={item} />
              </div>
            ))}
        </div>
        {/*Container 3*/}
        {/* <div className="w-[90%] mx-auto grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 my-10 gap-10">
          <p className="text-canter xs:text-[22px] 2xl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-2 sm:col-span-2 xs:col-span-1 mx-auto text-primary mt-10 xs:mt-0 font-RobotoBold text-[28px]">
            Best Selling Products
          </p>
          {Selling &&
            Selling.map((item) => (
              <div className="col-span-1" key={item.id}>
                <SellingCard data={item} />
              </div>
            ))}
        </div> */}
        {/*Container 4*/}
        <div className="my-10">
          <div className="flex justify-center">
            <img
              alt="leaf"
              src={content.leafImg}
              className="max-w-[200px] max-h-[100px] my-10"
            />
          </div>
          <div className="w-[90%] mx-auto grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 smgrid-cols-1 xs:grid-cols-1 gap-10">
            {Category &&
              Category.map((item) => (
                <div className="col-span-1" key={item.id}>
                  <CategoryCard data={item} />
                </div>
              ))}
          </div>
        </div>
        {/*Container 5*/}
        <div className="bg-gradient py-10 mt-[70px]">
          <div className="flex justify-around w-[80%] mx-auto h-full items-center flex-wrap">
            <p className="text-white font-RobotoBold text-[32px] xs:text-[22px] sm:text-[28px] text-center">
              Get 25% Off On Your First Purchase!
            </p>
            <Button
              font="Roboto"
              value="Shop Now"
              variant="outline"
              width={150}
              height={50}
              onClick={()=> navigate("/products/all")}
            />
          </div>
        </div>
        {/*Container 6*/}
        {/* <div className="w-[90%] mx-auto grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 my-10 gap-10">
          <p className="text-canter text-[28px] 2xl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-2 sm:col-span-2 xs:col-span-1 mx-auto text-primary mt-10 xs:mt-0 font-RobotoBold xs:text-[22px]">
            Trending Products
          </p>
          {Selling &&
            Selling.map((item) => (
              <div className="col-span-1" key={item.id}>
                <SellingCard data={item} />
              </div>
            ))}
        </div> */}
        {/*Container 7*/}
        <div className="w-[90%] mx-auto grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 my-10 gap-3">
          <p className="text-canter 2xl:col-span-3 xl:col-span-3 sm:text-[28px] lg:col-span-3 md:col-span-3 sm:col-span-1 xs:col-span-1 mx-auto text-primary mt-10 xs:mt-0 mb-[50px] xs:mb-[20px] xs:text-[22px] font-RobotoBold">
            Customer Reviews
          </p>
          {Reviews &&
            Reviews.map((item) => (
              <div className="col-span-1" key={item.id}>
                <ReviewCard data={item} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
