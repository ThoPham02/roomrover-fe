import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import * as actions from "../../../src/store/actions";
import {
  BREADCRUMB_DETAIL,
  CONTRACT_STATUS,
  ContractStatusComponent,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../../src/common";
import {
  Breadcrumbs,
  ContractActionButton,
  CreateButton,
  CusFormDate,
  CusFormGroup,
  CusFormSelect,
  CusTable,
} from "../../../src/components/ui";
import {
  convertTimestampToDate,
  formatCurrencyVND,
  getDate,
} from "../../../src/utils/utils";

const columns = [
  {
    header: "Mã hợp đồng",
    headerClass: "text-center w-32",
    accessorKey: "code",
    dataClass: "text-center",
  },
  {
    header: "Phòng",
    headerClass: "text-center w-96",
    accessorKey: "room.name",
    dataClass: "",
  },
  {
    header: "Nguời thuê",
    headerClass: "text-center w-32",
    accessorKey: "renter.fullName",
    dataClass: "",
  },
  {
    header: "Số điện thoại",
    headerClass: "text-center w-32",
    accessorKey: "renter.phone",
    dataClass: "text-center",
  },
  {
    header: "Ngày bắt đầu",
    headerClass: "text-center w-32",
    accessorKey: "createdAt",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "payment.amount",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "payment.amount",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "payment.amount",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-40",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const ContractScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({
    search: "",
    status: 0,
    createFrom: getDate(90),
    createTo: getDate() + 86399999,
    limit: PAGE_SIZE,
    offset: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTRACT));
    dispatch(actions.getListContract(filter));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    dispatch(
      actions.getListContract({
        ...filter,
        createTo: filter.createTo + 86399999,
      })
    );
  };

  const { listContract, total } = useSelector((state) => state.contract);

  const handleCreateContract = () => {
    navigate(ROUTE_PATHS.CONTRACT_CREATE);
  };

  const data = listContract
    ? listContract?.map((contract) => {
        return {
          ...contract,
          createdAt: convertTimestampToDate(contract?.createdAt),
          statusComponent: ContractStatusComponent[contract?.status],
          room: {
            name: `${contract.room?.name} (${contract.room?.houseName})`,
          },
          payment: {
            amount: formatCurrencyVND(contract.payment?.amount),
          },
        };
      })
    : [];

  return (
    <div className="">
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]} />
      <div className="relative">
        <CreateButton
          className="absolute -top-12 right-0 z-1"
          onClick={handleCreateContract}
        />

        <div className="mt-4">
          <div className="p-2 bg-slate-100 rounded">
            <Form
              className="flex flex-wrap gap-4 items-center mt-8"
              onSubmit={handleSubmitFilter}
            >
              <CusFormGroup
                label="Mã hợp đồng"
                placeholder="Mã hợp đồng"
                state={filter}
                setState={setFilter}
                keyName={"search"}
                position="top"
              />
              <CusFormDate
                label={"Ngày bắt đầu"}
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
                data={CONTRACT_STATUS}
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

          <CusTable
            headers={columns}
            data={data}
            page={1}
            ActionButton={ContractActionButton}
          />

          {data?.length > 0 && (
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
                onChange={(val) => setPage(val)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;
