import { SERVICE_UNIT } from "../../../common";
import { formatCurrencyVND } from "../../../utils/utils";
import CusFormProof from "./CusUploadProof";

const CusServiceQuantity = ({ state, setState, disabled }) => {
  const handleServiceChange = (index, field, value) => {
    setState((prev) => {
      const updatedServices = [...prev];
      updatedServices[index][field] = Number(value);
      return updatedServices;
    });
  };

  const handleImg = (index, url) => {
    setState((prev) => {
      const updatedServices = [...prev];
      updatedServices[index].imgUrl = url;
      return updatedServices;
    });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center ">
        <p className="w-48">Tên dịch vụ</p>
        <p className="w-48 pl-2">Đơn giá</p>
        <p className="w-48 pl-4">Chỉ số cũ</p>
        <p className="w-48 pl-6">Chỉ số mới</p>
        <p className="w-48 pl-8">Hình ảnh</p>
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
            type="text"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={service?.type === 4 ? service.oldIndex : "Đã xác định"}
            disabled
          />
          <input
            type="number"
            className="p-2 border border-gray-300 rounded w-48 form-control"
            value={service.newIndex || ""}
            placeholder={
              service?.type === 4 ? "Nhập chỉ số mới" : "Đã xác định"
            }
            onChange={(e) =>
              handleServiceChange(index, "newIndex", e.target.value)
            }
            disabled={service?.type !== 4 || disabled}
          />

          {service?.type === 4 && (
            <CusFormProof
              state={service?.imgUrl}
              onChange={(url) => {
                handleImg(index, url);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CusServiceQuantity;
