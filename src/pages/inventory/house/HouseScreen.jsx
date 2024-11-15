import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { Pagination } from "@mui/material";

import { CusFormGroup, CusFormSelect } from "../../../components/ui/CusForm";
import {
  Breadcrumbs,
  CreateButton,
  CusTable,
  HouseActionButton,
} from "../../../../src/components/ui";
import * as actions from "../../../../src/store/actions";
import {
  BREADCRUMB_DETAIL,
  HOUSE_STATUS,
  HOUSE_TYPE,
  HouseStatusComponent,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../../../src/common";
import { formatCurrencyVND, getArea } from "../../../utils/utils";
import logo from "../../../assets/images/logo.png";

const columns = [
  {
    header: "Hình ảnh",
    headerClass: " w-48",
    accessorKey: "album",
  },
  {
    header: "Nhà trọ",
    headerClass: "text-center w-96",
    accessorKey: "name",
  },
  {
    header: "Loại hình",
    headerClass: "text-center w-32",
    accessorKey: "type",
    dataClass: "text-center",
  },
  {
    header: "Địa chỉ",
    headerClass: "w-96",
    accessorKey: "address",
  },
  {
    header: "Diện tích",
    headerClass: "text-center w-32",
    accessorKey: "area",
    dataClass: "text-center",
  },
  {
    header: "Giá",
    headerClass: "text-center w-32",
    accessorKey: "price",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-48",
    accessorKey: "status",
    dataClass: "text-center",
  },
];

const HouseScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({
    search: "",
    type: 0,
    status: 0,
    limit: PAGE_SIZE,
    offset: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.HOUSE));
    dispatch(actions.clearSearchParams());
    dispatch(
      actions.getListHouses({
        ...filter,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const handleCreateHouse = () => {
    navigate(ROUTE_PATHS.HOUSE_CREATE);
  };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    setPage(1);

    dispatch(actions.getListHouses(filter));
  };

  const { listHouse, total } = useSelector((state) => state.invent.house);

  const data = listHouse.map((item) => {
    var area = getArea(item.provinceID, item.districtID, item.wardID) ? (
      <>
        {item.address}
        <br />
        {getArea(item.provinceID, item.districtID, item.wardID)}
      </>
    ) : (
      item.address
    );
    return {
      id: item.houseID,
      album:
        item?.albums && item?.albums.length > 0 ? (
          <img
            src={item?.albums[0]}
            alt="Hình ảnh nhà trọ"
            className="w-40 h-40 object-cover rounded-lg"
          />
        ) : (
          <img
            src={logo}
            alt="Logo mặc định"
            className="w-40 h-40 object-cover rounded-lg"
          />
        ),
      name: item.name,
      address: area,
      area: item.area + " m²",
      price: formatCurrencyVND(item.price),
      type: HOUSE_TYPE[item.type].name,
      status: HouseStatusComponent[item.status],
    };
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Breadcrumbs backName={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE]} />
      <div className="relative">
        <CreateButton
          className="absolute -top-12 right-0 z-1"
          onClick={handleCreateHouse}
        />

        <div className="mt-2">
          <div className="search-box p-2 bg-slate-100 rounded">
            <Form
              className="flex flex-wrap gap-4 items-center mt-8"
              onSubmit={handleSubmitFilter}
            >
              <CusFormGroup
                label="Tên phòng"
                placeholder="Search..."
                state={filter}
                setState={setFilter}
                keyName={"search"}
                position="top"
              />
              <CusFormSelect
                label="Loại phòng"
                value={filter}
                setValue={setFilter}
                keyName={"type"}
                data={HOUSE_TYPE}
                position="top"
              />
              <CusFormSelect
                label={"Trạng thái"}
                value={filter}
                setValue={setFilter}
                keyName={"status"}
                data={HOUSE_STATUS}
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
            page={page}
            ActionButton={HouseActionButton}
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
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HouseScreen;
