import React from 'react'
import FormInput from 'components/common/base/FormInput'
import SelectInput from 'components/common/base/SelectInput'
import { Button } from 'components/common/base/button'
import { category } from 'helpers/constant'

const Filter = () => {
  return (
    <div className='p-3 bg-white shadow-dashboard rounded-xl grid grid-cols-4 gap-3 items-center'>
        <div className='col-span-1'>
            <FormInput placeholder='Please Enter City'/>
        </div>
        <div className='col-span-1'>
            <FormInput placeholder='Please Enter State'/>
        </div>
        <div className='col-span-1'>
            <SelectInput placeholder='Please Select Category' options={category}/>
        </div>
        <div className='col-span-1 flex justify-end'>
            <Button value='Search' width={150} height={45}/>
        </div>
    </div>
  )
}

export default Filter
