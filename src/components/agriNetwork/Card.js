import React from 'react'
import Chip from 'components/common/base/chip';
import {  useNavigate } from "react-router-dom";
import { imgUrl, imgPath } from "helpers/path";


const Card = ({data}) => {
    const navigate = useNavigate()
  return (
    <div className='shadow-dashboard rounded-xl pt-3'>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar ? `${imgPath}${data.avatar}` : `${imgUrl}/kisan.png` } alt="person" className='min-w-[150px] max-w-[150px] max-h-[150px] min-h-[150px] rounded-full'/>
        {data.name ? (
        <p className='text-[18px] font-RobotoBold mt-5 text-primary truncate capitalize'>{`${data.name}`}</p>
        ):(
<p className='text-[18px] font-RobotoBold mt-5 text-primary truncate capitalize'>{`Not Register this user`}</p>
        )
        }
       
        {data.phone && (
        <p className='text-[16px] font-RobotoBold mt-1 truncate'>{data.phone && "0" + data.phone.replace(/^92/, "")}</p>
        )}
      </div>
      <div onClick={()=>navigate(`/agri-network/products?id=${data.id}`)} className='h-[60px] bg-gradient rounded-b-xl mt-5 cursor-pointer flex items-center justify-center'>
        <p className='text-white font-Roboto text-[20px]'>See Products</p>
      </div>
    </div>
  )
}

export default Card
