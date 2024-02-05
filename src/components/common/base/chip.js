import React from 'react'


const Chip = ({value,width,height}) => {
  return (
    <div className='rounded-2xl bg-gradient text-white flex justify-center items-center font-CatamaranBold text-center' style={{width:`${width}px`, height:`${height}px` }}>
      {value}
    </div>
  )
}

export default Chip
