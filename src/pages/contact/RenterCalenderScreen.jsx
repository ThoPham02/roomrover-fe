import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

import {
  BREADCRUMB_DETAIL,
  CONTACT_STATUS,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import {
  Breadcrumbs,
  CusFormDate,
  CusFormSelect,
  CusTable,
} from "../../components/ui";
import * as actions from "../../store/actions";
import { Form } from "react-router-dom";
import RenterContactActionButton from "../../components/ui/CusButton/RenterContact.ActionButton";

const listFields = [
  {
    header: "Nhà trọ",
    headerClass: "text-center w-96",
    accessorKey: "houseName",
    dataClass: "",
  },
  {
    header: "Địa chỉ",
    headerClass: "text-center w-96",
    accessorKey: "address",
    dataClass: "",
  },
  {
    header: "Người cho thuê",
    headerClass: "text-center w-96",
    accessorKey: "lessorName",
    dataClass: "text-center",
  },
  {
    header: "Số điện thoại",
    headerClass: "text-center w-32",
    accessorKey: "lessorPhone",
    dataClass: "text-center",
  },
  {
    header: "Ngày hẹn",
    headerClass: "text-center w-32",
    accessorKey: "datetime",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-96",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const RenterCalenderScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    from: 0,
    to: 0,
    status: 0,
    limit: PAGE_SIZE,
    offset: 0,
  });
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.RENTER_CALENDAR));
    dispatch(
      actions.getFilterContact({
        ...filter,
        limit: PAGE_SIZE,
        offset: page - 1,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const { listContact, total } = useSelector((state) => state.invent.contact);

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    setPage(1);

    dispatch(actions.getFilterContact({ ...filter }));
  };

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.CALENDAR]} />

      <div className="mt-4">
        <div className="p-2 bg-slate-100 rounded">
          <Form
            className="flex flex-wrap gap-4 items-center mt-8"
            onSubmit={handleSubmitFilter}
          >
            <CusFormDate
              label={"Ngày hẹn"}
              placeholder={"Từ ngày"}
              state={filter}
              setState={setFilter}
              keyName={"from"}
            />
            <p>-</p>
            <CusFormDate
              placeholder={"Đến ngày"}
              state={filter}
              setState={setFilter}
              keyName={"to"}
            />
            <CusFormSelect
              label={"Trạng thái"}
              value={filter}
              setValue={setFilter}
              keyName={"status"}
              data={CONTACT_STATUS}
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
      </div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={listContact}
          page={page}
          ActionButton={RenterContactActionButton}
        />
        {listContact?.length > 0 && (
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

export default RenterCalenderScreen;
