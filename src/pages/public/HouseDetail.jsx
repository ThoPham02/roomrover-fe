import { Breadcrumb } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaBroom,
  FaUtensils,
  FaWater,
  FaBolt,
  FaChartArea,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbReportMoney } from "react-icons/tb";

import * as actions from "../../../src/store/actions";
import { ROUTE_PATHS } from "../../common";
import RoomRoverLogo from "../../assets/images/logo.png";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import avatar from "../../assets/images/default_avatar.png";

const BoardingHouseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHouseDetailPublic(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.publicHouse);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(houseDetail);

  const images = houseDetail?.albums || [];
  const services = [
    { name: "Wi-Fi", icon: <FaWifi /> },
    { name: "Cleaning", icon: <FaBroom /> },
    { name: "Kitchen", icon: <FaUtensils /> },
    { name: "Water", icon: <FaWater /> },
    { name: "Electricity", icon: <FaBolt /> },
  ];

  const setMainImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: ROUTE_PATHS.ROOT }}
          className="text-blue-700 font-semibold"
        >
          Nhà trọ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link}>Chi tiết nhà trọ</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={`Main house`}
            className="w-full h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-200 rounded">
            <img
              src={RoomRoverLogo}
              alt="RoomRover"
              className="w-48 h-48 mb-4 rounded-full"
            />
            <span className="text-2xl font-semibold text-gray-600 text-center">
              RoomRover
            </span>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                index === currentImageIndex ? "border-2 border-blue-500" : ""
              } rounded-lg`}
              onClick={() => setMainImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-32 h-24 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6 mb-2">
          <h1 className="text-3xl font-bold mb-6">{houseDetail?.name}</h1>
          <h2 className="text-2xl font-semibold mb-2">Mô tả:</h2>
          <div className="w-full p-2 border rounded bg-gray-100">
            {houseDetail?.description?.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-2 mt-4">Thông tin nhà:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-blue-500">{service.icon}</span>
                <span>{service.name}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-2">Địa điểm</h2>
          <div className="flex items-center space-x-2 mb-6">
            <MdLocationOn className="text-red-500 text-2xl" />
            <span>{houseDetail?.address + ", " + getArea(houseDetail?.provinceID, houseDetail?.districtID, houseDetail?.wardID)}</span>
          </div>
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
        </div>

        <div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Giá thuê</h2>
            <div className="flex items-center mb-4">
              <TbReportMoney className="text-green-500 text-2xl mr-2" />
              <span className="text-xl font-semibold">
                {formatCurrencyVND(houseDetail?.price) + "VND/tháng"}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <FaChartArea className="text-blue-500 text-2xl mr-2" />
              <span>{houseDetail?.area + "m²"}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Đặt lịch hẹn xem nhà
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Người cho thuê</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={
                  houseDetail?.user?.avatarUrl
                    ? houseDetail?.user?.avatarUrl
                    : avatar
                }
                alt=""
                className="rounded-full w-12 h-12"
              />
              <div>
                <h3 className="font-semibold">{houseDetail?.user?.fullName}</h3>
                <p className="text-gray-600">{houseDetail?.user?.address}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 ">
              Liên hệ: {houseDetail?.user?.phone}
            </p>
            {/* <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              Liên hệ người cho thuê
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingHouseDetail;
