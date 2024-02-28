import React, { forwardRef } from "react";
import TextField from '@mui/material/TextField';

const FormInput = forwardRef(({
  onChange,
  disabled,
  placeholder,
  value,
  error,
  type,
  defaultValue,
  label,
  ...rest
}, ref) => {
  return (
    <>
      <TextField
        style={{ width: "100%"}}
        type={type}
        value={value}
        ref={ref}
        label={placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default FormInput;
