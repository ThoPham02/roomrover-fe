import React, { useEffect, useState } from "react";
import { FaChartArea } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbReportMoney } from "react-icons/tb";

import * as actions from "../../../src/store/actions";
import { ROUTE_PATHS, SERVICE_UNIT, USER_ROLES } from "../../common";
import RoomRoverLogo from "../../assets/images/logo.png";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import avatar from "../../assets/images/default_avatar.png";
import CusFormUtils from "../../components/ui/CusForm/CusFormUtils";
import AppointmentModal from "../../components/ui/CusModal/Appointment.Model";

const BoardingHouseDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHouseDetailPublic(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.publicHouse);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const images = houseDetail?.albums || [];
  const setMainImage = (index) => {
    setCurrentImageIndex(index);
  };
  const handleClickAppointment = () => {
    if (user === null) {
      navigate(ROUTE_PATHS.LOGIN);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-yellow-500 p-2 flex">
        <Link to={ROUTE_PATHS.ROOT} className="text-blue-700 font-semibold">
          Danh sách nhà trọ
        </Link>
        <span className="mx-2">/</span>
        <p>Chi tiết</p>
      </div>

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
        <div className="md:col-span-2 bg-white shadow rounded">
          <h2 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
            Chi tiết nhà thuê
          </h2>
          <div className="p-4">
            <h1 className="text-3xl font-bold text-pink-500 uppercase mb-6">
              {houseDetail?.name}
            </h1>
            <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
            <div className="w-full p-2 border rounded bg-gray-100">
              {houseDetail?.description?.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-2 mt-4">
              Tiện ích nhà trọ:
            </h2>
            <div className="">
              {houseDetail?.unit ? (
                <CusFormUtils
                  state={houseDetail}
                  disable={true}
                  page="public-detail"
                />
              ) : (
                <p className="ml-8">Nhà trọ không có tiện ích cụ thể</p>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2 mt-4">
              Chi phí phát sinh:
            </h2>
            <div className="grid grid-cols-2 w-full p-2">
              {houseDetail?.services ? (
                houseDetail?.services?.map((service, index) => {
                  return (
                    <div key={index}>
                      <span className="font-semibold mr-4">
                        {service.name + ":"}
                      </span>
                      <span className="text-lg">
                        {formatCurrencyVND(service.price) +
                          ` đ/${SERVICE_UNIT[service.unit].name}`}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="ml-8">Nhà trọ không phát sinh chi phí khác</p>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2 mt-4">Địa điểm</h2>
            <div className="flex items-center space-x-2 mb-6">
              <MdLocationOn className="text-red-500 text-3xl" />
              <span className="text-lg">
                {houseDetail?.address +
                  ", " +
                  getArea(
                    houseDetail?.provinceID,
                    houseDetail?.districtID,
                    houseDetail?.wardID
                  )}
              </span>
            </div>
            <div className="w-full h-64 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow rounded mb-6">
            <h2 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
              Giá thuê
            </h2>
            <div className="p-4">
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
              {!user ? (
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  onClick={handleClickAppointment}
                >
                  Đặt lịch hẹn xem nhà
                </button>
              ) : (
                user?.role === USER_ROLES.RENTER && (
                  <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={handleClickAppointment}
                  >
                    Đặt lịch hẹn xem nhà
                  </button>
                )
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded">
            <h2 className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-2">
              Người cho thuê
            </h2>
            <div className="p-4">
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
                  <h3 className="font-semibold">
                    {houseDetail?.user?.fullName}
                  </h3>
                  <p className="text-gray-600">{houseDetail?.user?.address}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 ">
                Liên hệ: {houseDetail?.user?.phone}
              </p>
            </div>
            {/* <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              Liên hệ người cho thuê
            </button> */}
          </div>
        </div>
      </div>

      <AppointmentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        house={houseDetail}
      />
    </div>
  );
};

export default BoardingHouseDetail;
