import React,{useState, useEffect} from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout";
import OrderCard from "components/dashboard/OrderCard";
import useClient from "hooks/useClient";
import { CircularProgress } from "@mui/material";
import Modal from "components/common/base/Modal";

const Requests = () => {

  const [loader,setLoader] = useState(false)
  const {api} = useClient()
  const [data, setData] = useState([])
  const [open,setOpen] = useState(false)
  const [personData, setPersonData] = useState([])

  const handleGetOrder = () => {
    setLoader(true);
    setData([]);
    api.get(`/api/product/requests`)
      .then((res) => {
        const response = res.data?.data || [];
        setLoader(false);
        setData(response);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  
  useEffect(()=>{
    handleGetOrder()
  },[])


  const handleOpen = (user) => {
    setPersonData(user)
    setOpen(true)
  }

  const handleClose = () => {
    setPersonData([])
    setOpen(false)
    
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="grid grid-cols-12 gap-3">
        {loader && (
          <div className="col-span-12 flex items-center justify-center">
            <CircularProgress size={36} style={{color:"#668968"}}/>
          </div>
        )}
        {!loader && data && data.length === 0 && (
          <div className="col-span-12 flex items-center justify-center">
            <p className="font-Roboto text-[18px]">You have not recived any Order !</p>
          </div>
        )}
        {!loader && data && data.length > 0 && data.map((item, index) => (
          <div className="2xl:col-span-4 xl:col-span-4  lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12" key={index}>
            <OrderCard data={item} seeOrder={handleOpen}/>
          </div>
        ))}
        </div>
      </div>
      <Modal isOpen={open} toggle={handleClose} title="Customer Information">
          {personData && personData.length > 0 && personData.map((item)=>(
            <>
              {item.user.name && (
                <div className="bg-[#f5f6f7] p-5 rounded-2xl mb-2">
                  {item.user.name && (
                    <p className="font-Roboto text-[16px] truncate text-primary">
                    Name: <span className="font-Roboto text-black">{item.user.name}</span>
                    </p>
                  )}
                    {item.user.phone && (
                    <p className="font-Roboto text-[16px] truncate text-primary">
                    Phone: <span className="font-Roboto text-black">{item.user.phone && "0" + item.user.phone.replace(/^0|92/, "")}</span>
                    </p>
                  )}
                </div>
              )}
            </>
          ))}
      </Modal>
    </Layout>
  );
};

export default withAuth(Requests);
