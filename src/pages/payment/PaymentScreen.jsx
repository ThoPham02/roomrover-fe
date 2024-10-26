import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Breadcrumbs,
  CusTable,
  PaymentActionButton,
} from "../../components/ui";
import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import * as actions from "../../store/actions";

const listFields = [
  {
    header: "Hoá đơn",
    headerClass: "text-center w-96",
    accessorKey: "title",
    dataClass: "text-center",
  },
  {
    header: "Mã hợp đồng",
    headerClass: "text-center w-32",
    accessorKey: "contractCode",
    dataClass: "text-center",
  },
  // {
  //   header: "Người thuê",
  //   headerClass: "text-center w-96",
  //   accessorKey: "renter",
  //   dataClass: "",
  // },
  // {
  //   header: "Số điện thoại",
  //   headerClass: "text-center w-32",
  //   accessorKey: "phone",
  //   dataClass: "",
  // },
  {
    header: "Số tiền",
    headerClass: "text-center w-32",
    accessorKey: "amount",
    dataClass: "text-center",
  },
  {
    header: "Đã trả",
    headerClass: "text-center w-32",
    accessorKey: "pay",
    dataClass: "text-center",
  },
  {
    header: "Còn lại",
    headerClass: "text-center w-32",
    accessorKey: "remain",
    dataClass: "text-center",
  },
  {
    header: "Hạn thanh toán",
    headerClass: "text-center w-32",
    accessorKey: "paymentDate",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-60",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const PaymentScreen = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [filter, setFilter] = useState({
    limit: PAGE_SIZE,
    offset: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.PAYMENT));
    dispatch(
      actions.getListPayment({
        ...filter,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const { listBill, total } = useSelector((state) => state.payment.bill);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]} />

      <div className="search-box"></div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={listBill}
          page={page}
          ActionButton={PaymentActionButton}
        />
        {listBill?.length > 0 && (
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
