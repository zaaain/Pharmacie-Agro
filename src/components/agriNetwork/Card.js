import React from 'react'
import Chip from 'components/common/base/chip';
import {  useNavigate } from "react-router-dom";


const Card = ({data}) => {
    const navigate = useNavigate()
  return (
    <div className='shadow-dashboard rounded-xl'>
      <div className='flex justify-end p-2'>
        <Chip value={data.status} width={100} height={30}/>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} alt="person" className='min-w-[150px] max-w-[150px] max-h-[150px] min-h-[150px] rounded-full'/>
        <p className='text-[18px] font-JosefinBold mt-5 text-primary'>{data.name}</p>
        <p className='text-[16px] font-CatamaranBold mt-1'>{data.phone}</p>
        <p className='text-[16px] font-Catamaran mt-1 truncate'>{data.address}</p>
      </div>
      <div onClick={()=>navigate(`/agri-network/${data.id}`)} className='h-[60px] bg-gradient rounded-b-xl mt-5 cursor-pointer flex items-center justify-center'>
        <p className='text-white font-Josefin text-[20px]'>See Products</p>
      </div>
    </div>
  )
}

export default Card
