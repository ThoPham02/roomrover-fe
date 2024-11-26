import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { FiHome, FiDollarSign, FiUsers } from "react-icons/fi";
import {
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  // LineChart,
  // Line,
} from "recharts";

import * as actions from "../../../src/store/actions";
import { BREADCRUMB_DETAIL, COLOR_INDEX, ROUTE_PATHS } from "../../../src/common";
import { Breadcrumbs } from "../../../src/components/ui";
import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.DASHBOARD));

    dispatch(actions.getDashboard());
  }, [dispatch]);

  const { 
    totalRoom,
    rentedRoom,
    emptyRoom,
    totalAmount,
    currentContact,
    expiredContract,
    houseRevenue,
  } = useSelector((state) => state.invent.dashboard);

  return (
    <div className="min-h-screen bg-gray-100">
      <Breadcrumbs backName={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FiHome />} title="Tổng số phòng" value={totalRoom} />
        <StatCard icon={<FiUsers />} title="Phòng đã thuê" value={rentedRoom} />
        <StatCard icon={<FiHome />} title="Phòng trống" value={emptyRoom} />
        <StatCard
          icon={<FiDollarSign />}
          title="Tổng doanh thu"
          value={`${formatCurrencyVND(totalAmount)} VND`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-80">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Lịch hẹn hôm nay
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">Người Thuê</th>
                  <th className="px-4 py-2 text-left text-gray-600">Số điện thoại</th>
                  <th className="px-4 py-2 text-left text-gray-600">Phòng</th>
                </tr>
              </thead>
              <tbody>
                {currentContact && currentContact.length > 0 ? currentContact?.map((contact) => (
                  <tr key={contact.id} className="border-b">
                    <td className="px-4 py-2 text-gray-800">{contact.renterName}</td>
                    <td className="px-4 py-2 text-gray-800">{contact.renterPhone}</td>
                    <td className="px-4 py-2 text-gray-800">{contact.houseName}</td>
                  </tr>
                )): <tr><td colSpan="4" className="pt-8 text-center">Hôm nay bạn không có lịch hẹn nào</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Hợp đồng sắp hết hạn
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">Người Thuê</th>
                  <th className="px-4 py-2 text-left text-gray-600">SĐT</th>
                  <th className="px-4 py-2 text-left text-gray-600">Phòng</th>
                  <th className="px-4 py-2 text-left text-gray-600">Mã HĐ</th>
                  <th className="px-4 py-2 text-left text-gray-600">Ngày hết hạn</th>
                </tr>
              </thead>
              <tbody>
                {expiredContract && expiredContract.length > 0 ? expiredContract?.map((contract) => (
                  <tr key={contract.id} className="border-b">
                    <td className="px-4 py-2 text-gray-800">{contract.renter.fullName}</td>
                    <td className="px-4 py-2 text-gray-800">{contract.renter.phone}</td>
                    <td className="px-4 py-2 text-gray-800">{contract.room.houseName}</td>
                    <td className="px-4 py-2 text-gray-800">{contract.code}</td>
                    <td className="px-4 py-2 text-gray-800">{convertTimestampToDate(contract.expiryDate.checkIn)}</td>
                  </tr>
                )): <tr><td colSpan="5" className="pt-8 text-center">Không có hợp đồng nào sắp hết hạn</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 min-h-80">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Doanh thu theo nhà trọ
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={houseRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="houseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8">
                {houseRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_INDEX[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Revenue Chart
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Outstanding Rent
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Tenant</th>
                <th className="px-4 py-2 text-left text-gray-600">Room</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Amount Due
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {outstandingRent.map((rent) => (
                <tr key={rent.id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{rent.tenant}</td>
                  <td className="px-4 py-2 text-gray-800">{rent.room}</td>
                  <td className="px-4 py-2 text-gray-800">${rent.amount}</td>
                  <td className="px-4 py-2 text-gray-800">{rent.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardScreen;

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="bg-blue-100 rounded-full p-3 mr-4">
      {React.cloneElement(icon, { className: "text-blue-500 w-6 h-6" })}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
