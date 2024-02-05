import React from 'react'
import Chip from 'components/common/base/chip'

const OrderCard = () => {
  return (
    <div className="w-full bg-white border-2 border-l-primary border-r-primary border-t-secondary border-b-secondary  rounded-2xl">
    <img
      className="rounded-full my-3 mx-auto w-[100px] h-[100px]"
      width={100}
      height={100}
      draggable={false}
      src="/product.jpg"
      alt="avatar"
    />
    <div className='mb-3 flex justify-center'>
    <Chip value="Pending" width={120} height={30}/>
    </div>
    <div className="p-3 leading-6">
    <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Customer Name:{" "}
        <span className="text-black font-Catamaran  ">
          John Doe
        </span>
      </p>
      <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Customer Phone:{" "}
        <span className="text-black font-Catamaran  ">
          0300 0000000
        </span>
      </p>
      <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Customer Address:{" "}
        <span className="text-black font-Catamaran  ">
          Rawalpindi Punjab Pakistan 
        </span>
      </p>
      <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Product Name:{" "}
        <span className="text-black font-Catamaran  ">
        John Doe
        </span>
      </p>
      <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Product Category:{" "}
        <span className="text-black font-Catamaran  ">
          Fertilizers
        </span>
      </p>
      <p className="font-CatamaranBold text-primary text-[16px] truncate">
        Product Price:{" "}
        <span className="text-black font-Catamaran  ">1000 PRs</span>
      </p>
    </div>

    
      <button className="h-[50px] w-full text-white font-CatamaranBold rounded-b-xl bg-primary">
        Order Done
      </button>

  </div>
  )
}

export default OrderCard
