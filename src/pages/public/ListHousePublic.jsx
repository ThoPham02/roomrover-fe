import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChartArea, FaPhone, FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Pagination } from "@mui/material";
import { TbReportMoney } from "react-icons/tb";
import { Form } from "react-bootstrap";

import {
  address,
  HOUSE_TYPE,
  MAP_AREA,
  MAP_PRICE,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import { CusFormSelect } from "../../components/ui";
import * as actions from "../../../src/store/actions";
import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";
import avatar from "../../assets/images/default_avatar.png";
import CusFormUtils from "../../components/ui/CusForm/CusFormUtils";

const ListHousePublic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    priceIndex: -1,
    priceFrom: 0,
    priceTo: 9999999999,
    areaIndex: -1,
    areaFrom: 0,
    areaTo: 9999999999,
    unit: 0,
    limit: PAGE_SIZE,
    offset: 0,
  });
  const [filterTop, setFilterTop] = useState({
    provinceID: "01",
    districtID: "000",
    wardID: "00000",
    type: "0",
  });

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    dispatch(
      actions.getListHousePublic({
        ...filter,
        ...filterTop,
        provinceID: Number(filterTop?.provinceID),
        districtID: Number(filterTop?.districtID),
        wardID: Number(filterTop?.wardID),
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (currentPage - 1),
      })
    );
    // eslint-disable-next-line
  }, [dispatch, filter, currentPage]);

  const { listHouse, total } = useSelector((state) => state.invent.publicHouse);

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    setCurrentPage(1);

    dispatch(
      actions.getListHousePublic({
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (currentPage - 1),
        ...filter,
        ...filterTop,
      })
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="p-2 bg-yellow-500 rounded mb-4">
        <Form
          className="flex flex-wrap gap-4 justify-around w-full mt-4"
          onSubmit={handleSubmitFilter}
        >
          <CusFormSelect
            label={"Loại hình"}
            value={filterTop}
            setValue={setFilterTop}
            keyName={"type"}
            position="top"
            data={HOUSE_TYPE}
          />
          <CusFormSelect
            label={"Tỉnh/Thành phố"}
            value={filterTop}
            setValue={setFilterTop}
            keyName={"provinceID"}
            data={address}
            position="top"
          />
          <CusFormSelect
            label={"Quận/Huyện"}
            value={filterTop}
            setValue={setFilterTop}
            keyName={"districtID"}
            data={address[filterTop?.provinceID]?.districts}
            // eslint-disable-next-line
            disabled={filterTop?.provinceID == 0 ? true : false}
            position="top"
          />
          <CusFormSelect
            label={"Xã/Phường"}
            value={filterTop}
            setValue={setFilterTop}
            keyName={"wardID"}
            data={
              address[filterTop?.provinceID]?.districts[filterTop?.districtID]
                ?.wards
            }
            // eslint-disable-next-line
            disabled={filterTop?.districtID == 0 ? true : false}
            position="top"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-1 bg-blue-500 rounded group w-48"
          >
            <FaSearch className="text-2xl text-white group-hover:text-yellow-500 mr-2" />
            <span className="font-bold text-white ">Tìm kiếm</span>
          </button>
        </Form>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white p-4 shadow rounded ">
          {listHouse?.length > 0 ? (
            listHouse?.map((item, index) => (
              <div
                key={item?.houseID}
                className="flex border-b border-gray-300 p-4 hover:bg-slate-100"
                onDoubleClick={() =>
                  navigate(
                    ROUTE_PATHS.HOUSE_DETAIL_PUBLIC.replace(
                      ":id",
                      item?.houseID
                    )
                  )
                }
              >
                <div className="w-1/5">
                  <img
                    src={item?.albums[0]}
                    alt=""
                    className="rounded w-48 aspect-[1/1] object-cover"
                  />
                </div>
                <div className="w-4/5 pl-4">
                  <p className="text-3xl font-bold text-pink-500 uppercase">
                    {item?.name}
                  </p>
                  <div className="flex items-center">
                    <TbReportMoney className="text-green-500 text-2xl mr-2" />
                    <span className="text-xl font-semibold">
                      {formatCurrencyVND(item?.price) + "VND/tháng"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaChartArea className="text-blue-500 text-2xl mr-2" />
                    <span>{item?.area + "m²"}</span>
                  </div>
                  <p className="flex item-center">
                    <MdLocationOn className="text-2xl text-red-500 mr-2" />
                    {item?.location}
                  </p>
                  <p className="text-gray-500 h-12 line-clamp-2">
                    {item?.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <img
                        src={
                          item?.user?.avatarUrl ? item?.user?.avatarUrl : avatar
                        }
                        alt=""
                        className="rounded-full w-12 h-12"
                      />
                      <p className="ml-4">{item?.user?.fullName}</p>
                      <FaPhone className="text-blue-500 ml-8" />
                      <p className="ml-2">{item?.user?.phone}</p>
                    </div>
                    <p className="text-gray-400">
                      {convertTimestampToDate(item?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl mt-16">
              Rất tiếc! Không có nhà trọ nào phù hợp
            </div>
          )}

          <div className="mt-8">
            {listHouse?.length > 0 && (
              <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-500">
                  Hiển thị{" "}
                  {`${(currentPage - 1) * PAGE_SIZE + 1} - ${
                    total > currentPage * PAGE_SIZE
                      ? currentPage * PAGE_SIZE
                      : total
                  }`}{" "}
                  trong tổng số {total} kết quả
                </p>

                <Pagination
                  count={Math.ceil(total / PAGE_SIZE)}
                  defaultPage={1}
                  siblingCount={0}
                  boundaryCount={2}
                  page={currentPage}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded shadow mb-8">
            <h3 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
              Xem theo giá
            </h3>
            <ul className="grid grid-cols-2 gap-2 p-4">
              {MAP_PRICE.map((val, index) => (
                <li
                  key={index}
                  className={`${
                    index === filter.priceIndex
                      ? "text-red-500"
                      : " text-black-500"
                  } cursor-pointer mb-2 hover:text-blue-500 border-b border-gray-200`}
                  onClick={() => {
                    setFilter({
                      ...filter,
                      priceIndex: index === filter.priceIndex ? -1 : index,
                      priceTo:
                        index === filter.priceIndex ? 9999999999 : val.priceTo,
                      priceFrom:
                        index === filter.priceIndex ? 0 : val.priceFrom,
                    });
                  }}
                >
                  {val.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded shadow mb-8">
            <h3 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
              Xem theo diện tích
            </h3>
            <ul className="grid grid-cols-2 gap-2 p-4">
              {MAP_AREA.map((val, index) => (
                <li
                  key={index}
                  className={`${
                    index === filter.areaIndex
                      ? "text-red-500"
                      : " text-black-500"
                  } cursor-pointer mb-2 hover:text-blue-500 border-b border-gray-200`}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      areaIndex: index === filter.areaIndex ? -1 : index,
                      areaTo:
                        index === filter.areaIndex ? 9999999999 : val.areaTo,
                      areaFrom: index === filter.areaIndex ? 0 : val.areaFrom,
                    })
                  }
                >
                  {val.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded shadow mb-8">
            <h3 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
              Xem theo tiện ích
            </h3>
            <CusFormUtils
              state={filter}
              setState={setFilter}
              page="public-house"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHousePublic;
