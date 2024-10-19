import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  LineChart,
  Line,
} from "recharts";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";

const boardingHouses = [
  { name: "Sunrise Residency", revenue: 5000, color: "#3B82F6" },
  { name: "Moonlight Lodge", revenue: 4500, color: "#10B981" },
  { name: "Starlight Inn", revenue: 3800, color: "#F59E0B" },
  { name: "Ocean View House", revenue: 6200, color: "#EF4444" },
];

const totalRooms = 50;
const rentedRooms = 42;
const emptyRooms = totalRooms - rentedRooms;
const monthlyRevenue = 19500;

const monthlyRevenueData = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 20000 },
  { month: "Apr", revenue: 19500 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 22000 },
];

const expiringContracts = [
  { id: 1, tenant: "John Doe", room: "101", expiryDate: "2023-07-15" },
  { id: 2, tenant: "Jane Smith", room: "205", expiryDate: "2023-07-20" },
  { id: 3, tenant: "Mike Johnson", room: "302", expiryDate: "2023-07-25" },
  { id: 4, tenant: "Emily Brown", room: "410", expiryDate: "2023-07-30" },
];

const outstandingRent = [
  {
    id: 1,
    tenant: "Alice Cooper",
    room: "103",
    amount: 850,
    dueDate: "2023-06-30",
  },
  {
    id: 2,
    tenant: "Bob Dylan",
    room: "207",
    amount: 750,
    dueDate: "2023-06-28",
  },
  {
    id: 3,
    tenant: "Charlie Brown",
    room: "305",
    amount: 900,
    dueDate: "2023-07-01",
  },
  {
    id: 4,
    tenant: "Diana Ross",
    room: "412",
    amount: 800,
    dueDate: "2023-06-29",
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.DASHBOARD));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FiHome />} title="Total Rooms" value={totalRooms} />
        <StatCard icon={<FiUsers />} title="Rented Rooms" value={rentedRooms} />
        <StatCard icon={<FiHome />} title="Empty Rooms" value={emptyRooms} />
        <StatCard
          icon={<FiDollarSign />}
          title="Monthly Revenue"
          value={`$${monthlyRevenue}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue by Boarding House
          </h2>
          <div className="space-y-4">
            {boardingHouses.map((house, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{house.name}</span>
                <span className="font-semibold text-gray-800">
                  ${house.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expiring Contracts
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">Tenant</th>
                  <th className="px-4 py-2 text-left text-gray-600">Room</th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Expiry Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {expiringContracts.map((contract) => (
                  <tr key={contract.id} className="border-b">
                    <td className="px-4 py-2 text-gray-800">
                      {contract.tenant}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{contract.room}</td>
                    <td className="px-4 py-2 text-gray-800">
                      {contract.expiryDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Revenue Distribution
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={boardingHouses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8">
                {boardingHouses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
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
      </div>
    </div>
  );
};

export default HomeScreen;

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
