import React from "react";
import TextField from '@mui/material/TextField';

const TextAreaInput = ({
  onChange,
  disabled,
  placeholder,
  value,
  error,
  defaultValue,
  label,
  ref,
  rows = 3, 
  ...rest
}) => {
  return (
    <>
      <TextField
         style={{ width: "100%"}}
         value={value}
         varriant="outline"
         ref={ref}
         label={placeholder}
         onChange={onChange}
         disabled={disabled}
         defaultValue={defaultValue}
         multiline
         rows={3}
         {...rest}
      />
      {error && <p className="text-red-600 font-Catamaran text-[12px] mt-2">{error}</p>}
    </>
  );
};

export default TextAreaInput;
