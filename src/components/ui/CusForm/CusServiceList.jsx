import React, { useEffect, useMemo } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { UNIT_SERVICE } from "../../../common";
import { formatCurrencyVND } from "../../../utils/utils";

const CusServiceList = ({ state, setState, disabled }) => {
  const services = useMemo(() => state.services || [], [state.services]);

  useEffect(() => {
    if (services.length === 0) {
      setState({
        ...state,
        services: [{ id: 1, name: "", price: "", unit: 1 }],
      });
    }
  }, [services, setState, state]);

  const handleAddService = () => {
    const newService = { id: services.length + 1, name: "", maxPeople: "" };
    setState({ ...state, services: [...services, newService] });
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    if (newServices.length > 0) {
      setState({ ...state, services: newServices });
    }
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    if (field === "price") {
      newServices[index][field] = value.replace(/[^0-9]/g, "");
    } else {
      newServices[index][field] = value;
    }
    setState({ ...state, services: newServices });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center mb-2">
        <p className="min-w-96">Loại dịch vụ</p>
        <p className="min-w-48 pl-2">Đơn giá</p>
        <p className="min-w-48 pl-16">Đơn vị tính</p>
      </div>
      {services.map((service, index) => (
        <div key={index} className="flex items-center mb-1 space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full min-w-96 form-control"
            value={service.name}
            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            placeholder="Nhập tên dich vụ"
            disabled={disabled}
          />

          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full min-w-48 form-control"
            value={formatCurrencyVND(service.price)}
            onChange={(e) =>
              handleServiceChange(index, "price", e.target.value)
            }
            placeholder="Nhập giá"
            disabled={disabled}
          />
          <p>VNĐ/</p>
          <select
            className="form-control"
            onChange={(e) => handleServiceChange(index, "unit", e.target.value)}
            value={service.unit}
            disabled={disabled}
          >
            {Object.keys(UNIT_SERVICE).map((key) => (
              <option key={key} value={key}>
                {UNIT_SERVICE[key].name}
              </option>
            ))}
          </select>

          {!disabled && (
            <div>
              {index === 0 ? (
                <button className="text-blue-500" onClick={handleAddService} type="button">
                  <FiPlus size={20} />
                </button>
              ) : (
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveService(index)}
                  type="button"
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

export default CusServiceList;
