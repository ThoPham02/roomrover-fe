import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaClock,
  FaHistory,
  FaChartArea,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";

import { BREADCRUMB_DETAIL, HOUSE_TYPE, ROUTE_PATHS } from "../../../common";
import {
  Breadcrumbs,
  CusFormGroup,
  CusFormSelect,
  CusSelectArea,
} from "../../../components/ui";
import * as actions from "../../../../src/store/actions";
import { formatCurrencyVND, getArea } from "../../../utils/utils";

const RoomDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { roomDetail } = useSelector((state) => state.invent.room);
  const [room, setRoom] = useState({});
  const [house, setHouse] = useState({});
  const [contract, setContract] = useState({});

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
    dispatch(actions.getRoomDetailAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (roomDetail) {
      setRoom(roomDetail.room);
      setHouse(roomDetail.house);
      setContract(roomDetail.contract);
    }
  }, [roomDetail]);

  const [activeTab, setActiveTab] = useState("contract");

  // Dummy data for room details
  const roomDetails = {
    name: "Luxurious Studio Apartment",
    price: "$1,200",
    area: "500 sq ft",
    address: "123 Main St, Cityville, State 12345",
    description:
      "A modern studio apartment with a stunning city view. Fully furnished with high-end appliances and amenities.",
  };

  // Dummy data for active contract
  const contractDetails = {
    tenantName: "John Doe",
    rentalPeriod: "Jan 1, 2023 - Dec 31, 2023",
    depositAmount: "$2,400",
    depositDeadline: "Dec 15, 2022",
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
        title={"Chi tiết phòng"}
        backRoute={ROUTE_PATHS.HOUSE}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <div className="p-2 bg-slate-100 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{room?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <p className="mt-6 text-gray-600">{house?.description}</p>
      </div>

      <div className="border-b border-gray-200 mt-4">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("contract")}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "contract"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active Contract
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "history"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Transaction History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "contract" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Contract
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="flex items-center">
                <FaUser className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Tenant</p>
                  <p className="text-lg font-semibold">
                    {contractDetails.tenantName}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Rental Period</p>
                  <p className="text-lg font-semibold">
                    {contractDetails.rentalPeriod}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Deposit Amount</p>
                  <p className="text-lg font-semibold">
                    {contractDetails.depositAmount}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Deposit Deadline</p>
                  <p className="text-lg font-semibold">
                    {contractDetails.depositDeadline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Transaction History
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
