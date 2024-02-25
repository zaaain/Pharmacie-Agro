import React, { forwardRef } from "react";
import { RiseLoader } from 'react-spinners';

const ImageInputButton = forwardRef(({ onChange, loader }) => {
  
  const handleChange = (event) => {
    onChange(event.target.files);
  };

  const handleClick = () => {
    const element = document.getElementById('imageInput');
    if (element) {
      element.click();
    } else {
      console.error('Element with id "imageInput" not found');
    }
  };

  return (
    <>
      <input
        id="imageInput"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={loader}
      />
     
      <div
        className="w-[170px] bg-primary h-[50px] rounded-2xl outline-none p-5 font-Catamaran text-[16px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
         {!loader ? <span className="text-white	text-lg">Upload Avatar</span> : <RiseLoader color="#fff" size={14} />}
      </div>
    </>
  );
});

export default ImageInputButton;
