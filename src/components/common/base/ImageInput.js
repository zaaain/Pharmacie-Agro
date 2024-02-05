import React, { forwardRef, useState } from "react";

const ImageInput = forwardRef(({ onChange, disabled, placeholder, value, error, type, defaultValue, ...rest }, ref) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    onChange(e);
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
        onChange={handleImageChange}
        ref={ref}
        {...rest}
      />
      <div
        className="min-w-full bg-[#f5f6f7] border-2 border-dashed h-[120px] rounded-2xl outline-none p-5 font-Catamaran text-[16px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
      {error && <p className="text-red-600 font-Catamaran text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default ImageInput;
