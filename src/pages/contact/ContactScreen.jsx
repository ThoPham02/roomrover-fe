import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-router-dom";

import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import { Breadcrumbs, CusFormGroup, CusTable } from "../../components/ui";
import * as actions from "../../store/actions";
import ListContactActionButton from "../../components/ui/CusButton/ListContact.ActionButton";

const listFields = [
  {
    header: "Phòng",
    headerClass: "text-center w-96",
    accessorKey: "roomName",
    dataClass: "",
  },
  {
    header: "Họ và tên",
    headerClass: "text-center w-96",
    accessorKey: "name",
    dataClass: "",
  },
  {
    header: "Số điện thoại",
    headerClass: "text-center w-32",
    accessorKey: "phone",
    dataClass: "text-center",
  },
  {
    header: "Số CCCD",
    headerClass: "text-center w-48",
    accessorKey: "cccdNumber",
    dataClass: "text-center",
  },
  {
    header: "Ngày cấp",
    headerClass: "text-center w-32",
    accessorKey: "cccdDate",
    dataClass: "text-center",
  },
  {
    header: "Nơi cấp",
    headerClass: "text-center w-48",
    accessorKey: "cccdAddress",
    dataClass: "",
  },
  {
    header: "Tạm Trú",
    headerClass: "text-center w-48",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const ContactScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    search: "",
    status: 0,
    limit: PAGE_SIZE,
    offset: 0,
  });
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTACT));
    dispatch(
      actions.getFilterRenterContact({
        ...filter,
        limit: PAGE_SIZE,
        offset: page - 1,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const { listRenterContacts, total } = useSelector(
    (state) => state.payment.renterContact
  );

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    setPage(1);

    console.log(filter);
    dispatch(actions.getFilterRenterContact({ ...filter }));
  };

  return (
    <div>
      <Breadcrumbs backName={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTACT]} />

      <div className="mt-2">
        <div className="p-2 bg-slate-100 rounded">
          <Form
            className="flex flex-wrap gap-4 items-center mt-8"
            onSubmit={handleSubmitFilter}
          >
            <CusFormGroup
              label="Tên hoặc số điện thoại"
              placeholder="Search..."
              state={filter}
              setState={setFilter}
              keyName={"search"}
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
          data={listRenterContacts}
          page={page}
          ActionButton={ListContactActionButton}
        />
        {listRenterContacts?.length > 0 && (
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

export default ContactScreen;
