import React from "react";

const TextAreaInput = ({
  onChange,
  disabled,
  placeholder,
  value,
  error,
  defaultValue,
  rows = 3, 
  ...rest
}) => {
  return (
    <>
      <textarea
        className="w-full bg-[#f5f6f7] rounded-2xl outline-none p-5 font-Catamaran text-[16px]"
        style={{ width: "100%" }}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        rows={rows} // Set the number of rows
        {...rest}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export default TextAreaInput;
