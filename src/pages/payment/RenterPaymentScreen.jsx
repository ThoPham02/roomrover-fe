import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";

import {
  Breadcrumbs,
  CusFormDate,
  CusFormSelect,
  CusTable,
  RenterPaymentActionButton,
} from "../../components/ui";
import {
  BILL_STATUS,
  BREADCRUMB_DETAIL,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import * as actions from "../../store/actions";
import { FaSearch } from "react-icons/fa";

const listFields = [
  {
    header: "Hoá đơn",
    headerClass: "text-center w-96",
    accessorKey: "title",
    dataClass: "",
  },
  {
    header: "Mã hợp đồng",
    headerClass: "text-center w-32",
    accessorKey: "contractCode",
    dataClass: "text-center",
  },
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

const RenterPaymentScreen = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [filter, setFilter] = useState({
    limit: PAGE_SIZE,
    offset: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.RENTER_PAYMENT));
    dispatch(
      actions.getListPayment({
        ...filter,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    dispatch(
      actions.getListPayment({
        ...filter,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      })
    );
  };

  const { listBill, total } = useSelector((state) => state.payment.bill);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]} />

      <div className="p-2 bg-slate-100 rounded">
        <Form
          className="flex flex-wrap gap-4 items-center mt-8"
          onSubmit={handleSubmitFilter}
        >
          <CusFormDate
            label={"Hạn thanh toán"}
            placeholder={"Từ ngày"}
            state={filter}
            setState={setFilter}
            keyName={"createFrom"}
          />
          <p>-</p>
          <CusFormDate
            placeholder={"Đến ngày"}
            state={filter}
            setState={setFilter}
            keyName={"createTo"}
          />
          <CusFormSelect
            label={"Trạng thái"}
            value={filter}
            setValue={setFilter}
            keyName={"status"}
            data={BILL_STATUS}
            position="top"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-blue-500 rounded group w-48"
          >
            <FaSearch className="text-2xl text-white group-hover:text-yellow-500 mr-2" />
            <span className="font-bold text-white ">Tìm kiếm</span>
          </button>
        </Form>
      </div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={listBill}
          page={page}
          ActionButton={RenterPaymentActionButton}
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

export default RenterPaymentScreen;
