import { SERVICE_UNIT } from "../../../common";
import { formatCurrencyVND } from "../../../utils/utils";

const CusServiceConfirm = ({ state, setState, disabled }) => {
  const handleServiceChange = (index, field, value) => {
    setState((prev) => {
      const updatedServices = [...prev];
      updatedServices[index][field] = Number(value);
      return updatedServices;
    });
  };

  console.log("state", state);

  return (
    <div className="mt-2">
      <div className="flex items-center ">
        <p className="w-48">Tên dịch vụ</p>
        <p className="w-48 pl-2">Đơn giá</p>
        <p className="w-48 pl-4">Chỉ số hiện tại</p>
      </div>
      {state?.map((service, index) => (
        <div key={index} className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={service.name}
            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            placeholder="Nhập tên dịch vụ"
            disabled
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={`${formatCurrencyVND(service.price)} VNĐ/${
              SERVICE_UNIT[service?.type]?.name
            }`}
            onChange={(e) => handleServiceChange(index, "type", e.target.value)}
            disabled
          />
          <input
            type="number"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={service.index || ""}
            onChange={(e) =>
              handleServiceChange(index, "index", e.target.value)
            }
            placeholder={service?.type === 4 ? "Nhập chỉ số" : "Đã xác định"}
            disabled={service?.type !== 4 || disabled}
          />
          {/* {!disabled && (
            <div>
              {index === state.length - 1 ? (
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
          )} */}
        </div>
      ))}
    </div>
  );
};

export default CusServiceConfirm;
