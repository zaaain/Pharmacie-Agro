import React,{useState, useEffect} from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout";
import BidCard from "components/dashboard/BidCard";
import useClient from "hooks/useClient";
import { CircularProgress } from "@mui/material";
import Modal from "components/common/base/Modal";

const Bids = () => {

  const [loader,setLoader] = useState(false)
  const {api} = useClient()
  const [data, setData] = useState([])
  const [open,setOpen] = useState(false)
  const [personData, setPersonData] = useState([])

  const handleGetOrder = () => {
    setLoader(true);
    setData([]);
    api.get(`/api/product/bidders`)
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
        <div className="grid grid-cols-3 gap-3">
        {loader && (
          <div className="col-span-3 flex items-center justify-center">
            <CircularProgress size={36} style={{color:"#668968"}}/>
          </div>
        )}
        {!loader && data && data.length === 0 && (
          <div className="col-span-3 flex items-center justify-center">
            <p className="font-Josefin text-[18px]">You have not recived any Order !</p>
          </div>
        )}
        {!loader && data && data.length > 0 && data.map((item, index) => (
          <div className="col-span-1" key={index}>
            <BidCard data={item} seeBider={handleOpen}/>
          </div>
        ))}
        </div>
      </div>
      <Modal isOpen={open} toggle={handleClose} title="Bidder Information">
          {personData && personData.length > 0 && personData.map((item)=>(
            <>
              {item.user && (
                <div className="bg-[#f5f6f7] p-5 rounded-2xl mb-2">
                  {item.user.firstName && item.user.lastName && (
                    <p className="font-Josefin text-[16px] truncate text-primary">
                    Name: <span className="font-Catamaran text-black">{`${item.user.firstName} ${item.user.lastName}`}</span>
                    </p>
                  )}
                  {item.user.email && (
                    <p className="font-Josefin text-[16px] truncate text-primary">
                    Email: <span className="font-Catamaran text-black">{item.user.email}</span>
                    </p>
                  )}
                           {item.user.phone && (
                    <p className="font-Josefin text-[16px] truncate text-primary">
                    Phone: <span className="font-Catamaran text-black">{item.user.phone}</span>
                    </p>
                  )}
                                 {item.price && (
                    <p className="font-Josefin text-[16px] truncate text-primary">
                    Bid Price: <span className="font-Catamaran text-black">{item.price}</span>
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

export default withAuth(Bids);
