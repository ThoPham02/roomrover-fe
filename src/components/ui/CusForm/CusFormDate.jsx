import React from "react";
import DatePicker from "react-datepicker";

const parseValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj) || null;
};

const CusFormDate = ({
  label,
  labelWidth,
  position,
  placeholder,
  state,
  setState,
  keyName,
  required,
  disabled,
}) => {
  const handleValue = (date) => {
    setState((prevState) => {
      const newState = { ...prevState };
      const keys = keyName.split(".");
      let lastKey = keys.pop();

      let nestedState = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }, newState);

      nestedState[lastKey] = date ? date.getTime() : null;
      return newState;
    });
  };

  const DatePickerComponent = (
    <DatePicker
      className="form-control"
      placeholderText={placeholder}
      selected={
        parseValue(state, keyName) ? new Date(parseValue(state, keyName)) : null
      }
      onChange={handleValue}
      dateFormat="dd/MM/yyyy"
      required={required}
      disabled={disabled}
    />
  );

  return position === "right" ? (
    <div className="flex items-center mb-4">
      <p
        className={`font-bold text-nowrap mr-2 ${
          labelWidth ? labelWidth : "min-w-24"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}:
      </p>
      <div className="flex justify-center max-w-xs border rounded-md">
        {DatePickerComponent}
      </div>
    </div>
  ) : (
    <div className="relative">
      <p className="font-semibold absolute -top-6 w-48">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex justify-center max-w-xs border rounded-md">
        {DatePickerComponent}
      </div>
    </div>
  );
};

export default CusFormDate;
