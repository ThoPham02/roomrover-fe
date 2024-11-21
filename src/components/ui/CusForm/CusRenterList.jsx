import React, { useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";

import { convertDateToTimestamp, genUnixID } from "../../../utils/utils";

const CusRenterList = ({ state, setState, capacity = 0, disabled }) => {
  useEffect(() => {
    if (state.length === 0) {
      setState([
        {
          id: genUnixID(),
          name: "",
          phone: "",
          cccdNumber: "",
          cccdDate: "",
          cccdAddress: "",
        },
      ]);
    }
  }, [state.length, setState]);

  const handleAddRenter = () => {
    setState((prev) => [
      ...prev,
      {
        id: genUnixID(),
        name: "",
        phone: "",
        cccdNumber: "",
        cccdDate: "",
        cccdAddress: "",
      },
    ]);
  };

  const handleRemoveRenter = (index) => {
    setState((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRenterChange = (index, field, value) => {
    setState((prev) => {
      const updatedRenters = [...prev];
      updatedRenters[index][field] = value;
      return updatedRenters;
    });
  };

  console.log(capacity === 0 ? true : capacity > state.length);

  return (
    <div className="mt-2">
      <div className="flex items-center ">
        <p className="w-48">Họ và tên</p>
        <p className="w-48 pl-2">Số điện thoại</p>
        <p className="w-48 pl-4">Số CCCD</p>
        <p className="w-48 pl-6">Ngày cấp</p>
        <p className="w-48 pl-8">Nơi cấp</p>
      </div>
      {state.map((renter, index) => (
        <div key={index} className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={renter.name}
            onChange={(e) => handleRenterChange(index, "name", e.target.value)}
            placeholder="Nhập họ và tên"
            disabled={disabled}
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={renter.phone}
            onChange={(e) => handleRenterChange(index, "phone", e.target.value)}
            placeholder="Nhập số điện thoại"
            disabled={disabled}
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={renter.cccdNumber}
            onChange={(e) =>
              handleRenterChange(index, "cccdNumber", e.target.value)
            }
            placeholder="Nhập số CCCD"
            disabled={disabled}
          />
          <DatePicker
            className="p-2 border border-gray-300 rounded  w-48 form-control"
            placeholderText={"Chọn ngày"}
            selected={renter.cccdDate ? new Date(renter.cccdDate) : null}
            onChange={(date) =>
              setState((prev) => {
                const updatedRenters = [...prev];
                updatedRenters[index].cccdDate = convertDateToTimestamp(date);
                return updatedRenters;
              })
            }
            dateFormat="dd/MM/yyyy"
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={renter.cccdAddress}
            onChange={(e) =>
              handleRenterChange(index, "cccdAddress", e.target.value)
            }
            placeholder="Nhập nơi cấp"
            disabled={disabled}
          />
          {!disabled && (
            <div>
              {index === 0 ? (
                (capacity === 0 ? true : capacity > state.length) && (
                  <button className="text-blue-500" onClick={handleAddRenter}>
                    <FiPlus size={20} />
                  </button>
                )
              ) : (
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveRenter(index)}
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CusRenterList;
