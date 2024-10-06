import React from "react";
import DatePicker from "react-datepicker";

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
    setState((prevState) => ({
      ...prevState,
      [keyName]: date,
    }));
  };

  const DatePickerComponent = (
    <DatePicker
      className="form-control"
      placeholderText={placeholder}
      selected={state?.[keyName] || ""}
      onChange={handleValue}
      dateFormat="dd/MM/yyyy"
      required={required}
      disabled={disabled}
    />
  );

  return position === "right" ? (
    <div className="flex items-center justify-center mb-4">
      <p className={`font-bold text-nowrap mr-2 ${labelWidth ? labelWidth : "min-w-24"}`}>
        {label}
        {required && <span className="text-red-500">*</span>}:
      </p>
      <div className="flex justify-center max-w-xs border rounded-md bg-white">
        {DatePickerComponent}
      </div>
    </div>
  ) : (
    <div className="relative">
      <p className="font-semibold absolute -top-6 w-48">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex justify-center px-2 py-2 max-w-xs border rounded-md bg-white">
        {DatePickerComponent}
      </div>
    </div>
  );
};

export default CusFormDate;
