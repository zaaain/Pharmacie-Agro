import React, { forwardRef } from "react";

const FormInput = forwardRef(({
  onChange,
  disabled,
  placeholder,
  value,
  error,
  type,
  defaultValue,
  ...rest
}, ref) => {
  return (
    <>
      <input
        className="min-w-full bg-[#f5f6f7] h-[60px] text-[#000] rounded-2xl outline-none p-5 font-Catamaran text-[16px]"
        style={{ width: "100%" }}
        type={type}
        value={value}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p className="text-red-600 font-Catamaran text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default FormInput;
