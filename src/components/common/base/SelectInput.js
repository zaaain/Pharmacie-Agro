import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    color: "#f5f6f7",
    minWidth: "100%",
    height: "60px",
    outline: "none",
    borderRadius: "18px",
    backgroundColor: "#f5f6f7",
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#668968" : "white", // Change background color of selected option
  }),
};

const CustomSelect = ({ onChange, value, options, placeholder, error }) => {
  return (
    <div style={{ position: "relative" }}>
      <Select
        options={options}
        styles={customStyles}
        onChange={onChange}
        value={value}
        className="font-Catamaran rounded-2xl"
        placeholder={placeholder} // Use placeholder prop here
      />
      {error && <p className="text-red-600 font-Catamaran text-[12px] mt-2">{error}</p>}
    </div>
  );
};

export default CustomSelect;
