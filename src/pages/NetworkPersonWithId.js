import React, { useEffect } from "react";
import Layout from "layout/BaseLayout";
import Card from "components/allProducts/Card";
import { imgUrl } from "helpers/path";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { getPersonProducts } from "../redux/slices/agriNetwork/agriNetworkAction";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";


const PersonProductPage = () => {

  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const agriReducer = useSelector((state) => state.agri);
  const dispatch = useDispatch();
  const { personProducts, personProductLoader, users } = agriReducer;
  const uesrName = id && users && users.length > 0 && users.find((item)=> item.id == id)
  const {firstName, lastName} = uesrName

  useEffect(() => {
    if (!id) return;
    dispatch(getPersonProducts(id));
  }, []);

  return (
    <Layout>
      <div className="w-[90%] mx-auto my-10">
        {firstName && lastName && (
        <p className="text-[32px] font-JosefinBold text-primary text-center">
          {`${firstName} ${lastName} Products`}
        </p>
        )}
        <img
          src={imgUrl + "/basil-leaf.png"}
          alt="leaf"
          className="mx-auto mt-5"
        />
        <div className="grid grid-cols-4 gap-5 mt-[60px]">
          {personProductLoader && (
            <div className="col-span-4 flex justify-center">
              <CircularProgress size={42} style={{ color: "#668968" }} />
            </div>
          )}
          {!personProductLoader &&
            personProducts &&
            personProducts.length === 0 && (
              <div className="col-span-4 flex justify-center">
                <p className="font-Josefin text-[18px]">
                  No products added in this person!
                </p>
              </div>
            )}
          {!personProductLoader &&
            personProducts &&
            personProducts.length > 0 &&
            personProducts.map((item, index) => (
              <div key={item.id} className="col-span-1">
                <Card data={item} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default PersonProductPage;
