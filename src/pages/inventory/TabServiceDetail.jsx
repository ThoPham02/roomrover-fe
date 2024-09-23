import { useSelector } from "react-redux";
import { useState } from "react";

import { formatCurrencyVND } from "../../utils/utils";
import { CusTable, ServiceActionButton } from "../../components/ui";

const columns = [
  {
    header: "Tên chi phí",
    accessorKey: "name",
  },
  {
    header: "Loại",
    accessorKey: "type",
  },
  {
    header: "Giá",
    accessorKey: "price",
  },
];

const TabServiceDetail = () => {
  const { listHouse } = useSelector((state) => state.invent.house);

  const data = listHouse.map((item) => item);

  return (
    <div className="my-4">
      <CusTable
        headers={columns}
        data={data}
        page={1}
        ActionButton={ServiceActionButton}
      />
    </div>
  );
};

export default TabServiceDetail;
