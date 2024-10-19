import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

import { Breadcrumbs, CusTable, RoomActionButton } from "../../components/ui";
import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const listFields = [
  {
    header: "Hoá đơn",
    headerClass: "text-center w-96",
    accessorKey: "code",
    dataClass: "text-center",
  },
  {
    header: "Phòng",
    headerClass: "text-center w-32",
    accessorKey: "name",
    dataClass: "text-center",
  },
  {
    header: "Người thuê",
    headerClass: "text-center w-96",
    accessorKey: "renter",
    dataClass: "",
  },
  {
    header: "Số điện thoại",
    headerClass: "text-center w-32",
    accessorKey: "phone",
    dataClass: "",
  },
  {
    header: "Số tiền",
    headerClass: "text-center w-96",
    accessorKey: "total",
    dataClass: "",
  },
  {
    header: "Hạn thanh toán",
    headerClass: "text-center w-32",
    accessorKey: "paymentDate",
    dataClass: "",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-32",
    accessorKey: "status",
    dataClass: "text-center",
  },
];

const PaymentScreen = () => {
  const [page, setPage] = useState(1);

  var data = [
    {
      name: "Phòng 1",
      type: "Phòng trọ",
      area: "10m2",
      maxPeople: 2,
      price: "1.000.000",
      status: "Đã cho thuê",
    },
    {
      name: "Phòng 2",
      type: "Phòng trọ",
      area: "15m2",
      maxPeople: 3,
      price: "1.500.000",
      status: "Chưa cho thuê",
    },
    {
      name: "Phòng 3",
      type: "Phòng trọ",
      area: "20m2",
      maxPeople: 4,
      price: "2.000.000",
      status: "Đã cho thuê",
    },
  ];
  var total = 100;

  const dispatch = useDispatch();
  // const [filter, setFilter] = useState({});

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.PAYMENT));
    dispatch(
      actions.getListContract({
        limit: PAGE_SIZE,
        offset: 0,
      })
    );
  }, [dispatch]);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]} />

      <div className="search-box"></div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={data}
          page={page}
          ActionButton={RoomActionButton}
        />
        {data.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              {`${(page - 1) * PAGE_SIZE + 1} - ${
                total > page * PAGE_SIZE ? page * PAGE_SIZE : total
              }`}{" "}
              trong tổng số {total} kết quả
            </p>

            <Pagination
              count={Math.ceil(total / PAGE_SIZE)}
              defaultPage={1}
              siblingCount={0}
              boundaryCount={2}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
