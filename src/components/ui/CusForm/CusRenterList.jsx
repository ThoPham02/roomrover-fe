import React, { useEffect, useMemo } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const CusRenterList = ({ state, setState, disabled }) => {
  const paymentRenters = useMemo(
    () => state.paymentRenters || [],
    [state.paymentRenters]
  );

  useEffect(() => {
    if (paymentRenters.length === 0) {
      setState((prev) => ({
        ...prev,
        paymentRenters: [
          {
            id: 1,
            paymentID: "",
            name: "",
            phone: "",
            cccdNumber: "",
            cccdDate: "",
            cccdAddress: "",
          },
        ],
      }));
    }
  }, [paymentRenters.length, setState]);

  console.log("paymentRenters", paymentRenters);

  const handleAddRenter = () => {
    setState((prev) => ({
      ...prev,
      paymentRenters: [
        ...prev.paymentRenters,
        {
          id: prev.paymentRenters.length + 1,
          paymentID: "",
          name: "",
          phone: "",
          cccdNumber: "",
          cccdDate: "",
          cccdAddress: "",
        },
      ],
    }));
  };

  const handleRemoveRenter = (index) => {
    setState((prev) => ({
      ...prev,
      paymentRenters: prev.paymentRenters.filter((_, i) => i !== index),
    }));
  };

  const handleRenterChange = (index, field, value) => {
    setState((prev) => {
      const updatedRenters = [...prev.paymentRenters];
      updatedRenters[index][field] = value;
      return { ...prev, paymentRenters: updatedRenters };
    });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center ">
        <p className="w-48">Họ và tên</p>
        <p className="w-48 pl-2">Số điện thoại</p>
        <p className="w-48 pl-4">Số CCCD</p>
        <p className="w-48 pl-6">Ngày cấp</p>
        <p className="w-48 pl-8">Nơi cấp</p>
      </div>
      {paymentRenters.map((renter, index) => (
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
          <input
            type="date"
            className="p-2 border border-gray-300 rounded  w-48 form-control"
            value={renter.cccdDate}
            onChange={(e) =>
              handleRenterChange(index, "cccdDate", e.target.value)
            }
            placeholder="Nhập ngày cấp"
            disabled={disabled}
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
              {index === paymentRenters.length - 1 ? (
                <button className="text-blue-500" onClick={handleAddRenter}>
                  <FiPlus size={20} />
                </button>
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
