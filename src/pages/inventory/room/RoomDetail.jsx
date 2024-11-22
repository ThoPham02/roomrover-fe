import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHistory,
  FaChartArea,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaMoneyBill,
  FaClock,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { Col, Row } from "react-bootstrap";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../../common";
import { Breadcrumbs } from "../../../components/ui";
import * as actions from "../../../../src/store/actions";
import {
  convertTimestampToDate,
  formatCurrencyVND,
  getArea,
} from "../../../utils/utils";

const RoomDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { roomDetail } = useSelector((state) => state.invent.room);
  const [room, setRoom] = useState({});
  const [house, setHouse] = useState({ albums: [] });
  const [contract, setContract] = useState({});
  const [mainImage, setMainImage] = useState(
    house?.albums ? house?.albums[0] : ""
  );

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
    dispatch(actions.getRoomDetailAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (roomDetail) {
      setRoom(roomDetail.room);
      setHouse(roomDetail.house);
      setContract(roomDetail.contract);
      setMainImage(roomDetail.house?.albums ? roomDetail.house?.albums[0] : "");
    }
  }, [roomDetail]);

  const [activeTab, setActiveTab] = useState("contract");

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  // Dummy data for transaction history
  const transactionHistory = [
    {
      invoiceName: "January Rent",
      invoiceNumber: "INV-001",
      amount: "$1,200",
      time: "Jan 1, 2023",
      status: "Paid",
    },
    {
      invoiceName: "February Rent",
      invoiceNumber: "INV-002",
      amount: "$1,200",
      time: "Feb 1, 2023",
      status: "Paid",
    },
    {
      invoiceName: "March Rent",
      invoiceNumber: "INV-003",
      amount: "$1,200",
      time: "Mar 1, 2023",
      status: "Pending",
    },
  ];

  return (
    <div className="">
      <Breadcrumbs
        backRoute={ROUTE_PATHS.ROOM}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.ROOM]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main room"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              {house?.albums?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                    mainImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-2xl font-bold">{room?.name}</h1>
            <h2 className="text-lg text-gray-700">{house?.name}</h2>
            <div className="flex items-center">
              <TbReportMoney className="text-green-500 text-2xl mr-2" />
              <span className="text-xl font-semibold">
                {formatCurrencyVND(house?.price)}VND/tháng
              </span>
            </div>
            <div className="flex items-center">
              <FaChartArea className="text-blue-500 text-2xl mr-2" />
              <span>{house?.area}</span> m²
            </div>
            <div className="flex items-center col-span-2">
              <FaLocationDot className="text-red-500 text-2xl mr-2" />
              <span>
                {house?.address +
                  ", " +
                  getArea(house?.provinceID, house?.districtID, house?.wardID)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-t border-gray-200 mt-2">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("contract")}
            className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "contract"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Hợp đồng hiện tại
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "history"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Lịch sử giao dịch
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "contract" && <ContractInfo tenant={contract} />}

        {activeTab === "history" && (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionHistory.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaHistory className="text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.invoiceName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {transaction.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetail;

const ContractInfo = ({ tenant }) => {
  if (tenant?.contractID === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-36 rounded-lg w-full max-w-lg mx-auto">
        <p className="text-xl text-gray-700 mb-4">
          Hiện tại phòng chưa được thuê
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Tạo hợp đồng
        </button>
      </div>
    );
  }

  return (
    <div className=" p-6 rounded-lg">
      <Row>
        <Col>
          <div className="flex items-center">
            <FaUser className="text-xl mr-2" />
            <p className="text-lg font-medium">{tenant?.renterName}</p>
          </div>

          <div className="flex items-center mt-4">
            <FaPhone className="text-xl mr-2" />
            <p className="text-lg">{tenant?.renterPhone}</p>
          </div>
        </Col>
        <Col>
          <div className="flex items-center">
            <FaMoneyBill className="text-xl mr-2" />
            <div>
              <h3 className="text-lg font-medium">
                Cọc: {formatCurrencyVND(tenant?.payment?.deposit)} VND
              </h3>
            </div>
          </div>

          <div className="flex items-center">
            <FaClock className="text-xl mr-2" />
            <h3 className="text-lg font-medium">
              Hạn đặt cọc:{" "}
              {convertTimestampToDate(tenant?.payment?.depositDate)}
            </h3>
          </div>
        </Col>
        <Col>
          <div className="flex items-center">
            <FaCalendarAlt className="text-xl mr-2" />
            <h3 className="text-lg font-medium">
              Thời gian thuê: {convertTimestampToDate(tenant?.checkIn)}
            </h3>
          </div>
        </Col>
      </Row>

      <div className="flex flex-col items-center justify-center rounded-lg w-full max-w-lg mx-auto">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};
