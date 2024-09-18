import { useSelector } from "react-redux";

import CusTable from "./CusTable";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import HouseActionButton from "./House.ActionButton";

const columns = [
  {
    header: "Nhà trọ",
    accessorKey: "name",
  },
  {
    header: "Khu vực",
    accessorKey: "address",
  },
  {
    header: "Diện tích",
    accessorKey: "area",
  },
  {
    header: "Giá",
    accessorKey: "price",
  },
];

const ListHouses = () => {
  const { listHouse } = useSelector((state) => state.invent.house);

  const data = listHouse.map((item) => {
    var area = getArea(item.provinceID, item.districtID, item.wardID)
      ? getArea(item.provinceID, item.districtID, item.wardID) +
        ", " +
        item.address
      : item.address;

    console.log(item);

    return {
      id: item.houseID,
      name: item.name,
      address: area,
      area: item.area + " m²",
      price: formatCurrencyVND(item.price),
    };
  });

  return (
    <div className="my-4">
      <CusTable
        headers={columns}
        data={data}
        ActionButton={HouseActionButton}
      />
    </div>
  );
};

export default ListHouses;
