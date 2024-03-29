import React from 'react'

const OrderCard = ({data, seeOrder}) => {

  console.log("xyzData", data)

  return (
    <div className="w-full bg-white border-2 border-l-primary border-r-primary border-t-secondary border-b-secondary  rounded-2xl">
    <div className="p-3 leading-6">
      <p className="font-RobotoBold text-primary text-[16px] truncate">
        Product Name:{" "}
        <span className="text-black font-Roboto  ">
        {data.name && data.name}
        </span>
      </p>
      <p className="font-RobotoBold text-primary text-[16px] truncate">
        Product Category:{" "}
        <span className="text-black font-Roboto  ">
          {data.ProductType && data.ProductType}
        </span>
      </p>
      <p className="font-RobotoBold text-primary text-[16px] truncate">
        Product Price:{" "}
        <span className="text-black font-Roboto  ">{`${data.price && data.price.toLocaleString()}/- PKR`}</span>
      </p>
      <p className="font-RobotoBold text-primary text-[16px] truncate">
        Total Requests:{" "}
        <span className="text-black font-Roboto  ">{data.request && data.request.length}</span>
      </p>
    </div>

    
      <button onClick={() => seeOrder(data.request)} className="h-[50px] w-full text-white font-RobotoBold rounded-b-xl bg-primary">
        See Requests
      </button>

  </div>
  )
}

export default OrderCard