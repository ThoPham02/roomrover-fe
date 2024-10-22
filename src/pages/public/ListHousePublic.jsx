import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  address,
  MAP_AREA,
  MAP_PRICE,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import { CusFormSelect } from "../../components/ui";

import * as actions from "../../../src/store/actions";
import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";

const ListHousePublic = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (value) => {
    setCurrentPage(value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    provinceID: "01",
    districtID: "000",
    wardID: "00000",
    priceIndex: -1,
    priceFrom: 0,
    priceTo: 9999999999,
    areaIndex: -1,
    areaFrom: 0,
    areaTo: 9999999999,
    limit: PAGE_SIZE,
    offset: 0,
  });

  useEffect(() => {
    dispatch(
      actions.getListHousePublic({
        ...filter,
        provinceID: Number(filter?.provinceID),
        districtID: Number(filter?.districtID),
        wardID: Number(filter?.wardID),
      })
    );
  }, [dispatch, filter]);
  const { listHouse, total } = useSelector((state) => state.invent.publicHouse);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main grid container */}
      <div className="grid grid-cols-4 gap-4">
        {/* Left column: Listing */}
        <div className="col-span-3 bg-white p-4 drop-shadow-md rounded">
          {listHouse &&
            listHouse?.map((item, index) => (
              <div
                key={item?.houseID}
                className="flex border-b border-gray-300 py-4 hover:bg-slate-100"
                onDoubleClick={() =>
                  navigate(
                    ROUTE_PATHS.HOUSE_DETAIL_PUBLIC.replace(
                      ":id",
                      item?.houseID
                    )
                  )
                }
              >
                <div className="w-1/5 relative">
                  <img
                    src={item?.albums[0]}
                    alt=""
                    className="rounded w-full aspect-[1/1] object-cover"
                  />
                  <p className="mt-2 absolute bottom-4 left-4 font-bold text-blue-500">
                    {item?.albums.length} ảnh
                  </p>
                </div>
                <div className="w-4/5 pl-4">
                  <p className="text-lg font-bold text-pink-500">
                    {item?.name}
                  </p>
                  <p className="text-green-600 text-lg">
                    {formatCurrencyVND(item?.price) + "VND/tháng"}
                  </p>
                  <p className="text-gray-600">{item?.area + "m²"}</p>
                  <p className="flex item-center">
                    <MdLocationOn className="text-2xl text-red-500" />
                    {item?.location}
                  </p>
                  <p className="text-gray-500 h-12 truncate">
                    {item?.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <img
                        src={item?.user?.avatarUrl}
                        alt=""
                        className="rounded-full"
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
            ))}

          <div className="flex justify-center mt-8 w-full">
            {/* {listHouse?.length > 0 && (
              <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-500">
                  Hiển thị{" "}
                  {`${(currentPage - 1) * itemsPerPage + 1} - ${
                    total > currentPage * itemsPerPage
                      ? currentPage * itemsPerPage
                      : total
                  }`}{" "}
                  trong tổng số {total} kết quả
                </p>

                <Pagination
                  count={Math.ceil(total / itemsPerPage)}
                  defaultPage={1}
                  siblingCount={0}
                  boundaryCount={2}
                  page={currentPage}
                  onChange={handleChange}
                />
              </div>
            )} */}
          </div>
        </div>

        {/* Right column: Filters */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded drop-shadow-md">
            <h3 className="font-bold mb-2">Xem theo khu vực</h3>
            <CusFormSelect
              label={"Tỉnh/TP"}
              labelWidth={"min-w-36"}
              data={address}
              value={filter}
              setValue={setFilter}
              keyName={"provinceID"}
            />
            <CusFormSelect
              label={"Quận/Huyện"}
              labelWidth={"min-w-36"}
              data={address[filter?.provinceID]?.districts}
              value={filter}
              setValue={setFilter}
              keyName={"districtID"}
              disabled={filter?.provinceID == 0}
            />
            <CusFormSelect
              label={"Phường/Xã"}
              labelWidth={"min-w-36"}
              data={
                address[filter?.provinceID]?.districts[filter?.districtID]
                  ?.wards
              }
              value={filter}
              setValue={setFilter}
              keyName={"wardID"}
              disabled={filter?.districtID == 0}
            />
          </div>

          <div className="mt-8 bg-white p-4 rounded drop-shadow-md">
            <h3 className="font-bold mb-2">Xem theo giá</h3>
            <ul className="grid grid-cols-2 gap-2">
              {MAP_PRICE.map((val, index) => (
                <li
                  key={index}
                  className={`${
                    index === filter.priceIndex
                      ? "text-red-500"
                      : " text-blue-500"
                  } cursor-pointer mb-2`}
                  onClick={() => {
                    setFilter({
                      ...filter,
                      priceIndex: index === filter.priceIndex ? -1 : index,
                      priceTo: val.priceTo,
                      priceFrom: val.priceFrom,
                    });
                  }}
                >
                  {val.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 bg-white p-4 rounded drop-shadow-md">
            <h3 className="font-bold mb-2">Xem theo diện tích</h3>
            <ul className="grid grid-cols-2 gap-2">
              {MAP_AREA.map((val, index) => (
                <li
                  key={index}
                  className={`${
                    index === filter.areaIndex
                      ? "text-red-500"
                      : " text-blue-500"
                  } cursor-pointer mb-2`}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      areaIndex: index === filter.areaIndex ? -1 : index,
                      areaTo: val.areaTo,
                      areaFrom: val.areaFrom,
                    })
                  }
                >
                  {val.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHousePublic;
