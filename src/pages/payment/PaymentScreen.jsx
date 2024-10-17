import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FiSearch,
  FiDownload,
  FiPrinter,
  FiEdit,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import * as actions from "../../store/actions";

const invoices = [
  {
    id: 1,
    count: 1,
    contractCode: "CNT-2023-001",
    amount: 1500.0,
    paymentDueDate: "2023-07-15",
    payer: "John Doe",
    payerPhone: "+1 (123) 456-7890",
    status: "Paid",
  },
  {
    id: 2,
    count: 2,
    contractCode: "CNT-2023-002",
    amount: 2000.0,
    paymentDueDate: "2023-07-20",
    payer: "Jane Smith",
    payerPhone: "+1 (234) 567-8901",
    status: "Pending",
  },
  {
    id: 3,
    count: 3,
    contractCode: "CNT-2023-003",
    amount: 1800.0,
    paymentDueDate: "2023-07-25",
    payer: "Mike Johnson",
    payerPhone: "+1 (345) 678-9012",
    status: "Overdue",
  },
  {
    id: 4,
    count: 4,
    contractCode: "CNT-2023-004",
    amount: 2200.0,
    paymentDueDate: "2023-07-30",
    payer: "Emily Brown",
    payerPhone: "+1 (456) 789-0123",
    status: "Paid",
  },
  {
    id: 5,
    count: 5,
    contractCode: "CNT-2023-005",
    amount: 1700.0,
    paymentDueDate: "2023-08-05",
    payer: "Alex Wilson",
    payerPhone: "+1 (567) 890-1234",
    status: "Pending",
  },
];

const PaymentScreen = () => {
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.PAYMENT));
    // eslint-disable-next-line
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices =
    statusFilter === "All"
      ? invoices
      : invoices.filter((invoice) => invoice.status === statusFilter);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoices..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <FiDownload className="inline-block mr-2" />
              Export
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <FiPrinter className="inline-block mr-2" />
              Print
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Contract Code
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Payment Due Date
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Payer
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Payer Phone
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.contractCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.paymentDueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.payer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.payerPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-gray-700">
            Showing{" "}
            <span className="font-medium">{filteredInvoices.length}</span> of{" "}
            <span className="font-medium">{invoices.length}</span> results
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
