import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineEllipsis } from "react-icons/ai";

const ActionButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <AiOutlineEllipsis className="text-2xl" />
    </button>
  );
};

const CusTable = ({ headers, data, total }) => {
  // Số lượng bản ghi trên mỗi trang
  const recordsPerPage = 20;
  const [pageIndex, setPageIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu cho trang hiện tại
    const start = pageIndex * recordsPerPage;
    const end = start + recordsPerPage;
    setCurrentData(data.slice(start, end));
  }, [data, pageIndex]);

  // Xử lý chuyển trang
  const handlePageChange = (newPageIndex) => {
    if (newPageIndex >= 0 && newPageIndex < Math.ceil(total / recordsPerPage)) {
      setPageIndex(newPageIndex);
    }
  };

  // Xử lý khi click "Thao tác"
  const handleAction = (item) => {
    console.log("Thao tác với:", item);
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th className="text-nowrap text-center w-4">STT</th>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
            <th className="text-nowrap text-center w-8">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-nowrap text-center w-4">1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td className="text-nowrap text-center w-8">
              <ActionButton onClick={() => handleAction({ id: 1 })} />
            </td>
          </tr>
          <tr>
            <td className="text-nowrap text-center w-4">2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td className="text-nowrap text-center w-4">3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>

        {/* <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">STT</th>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {pageIndex * recordsPerPage + index + 1}
              </td>

              {headers.map((header, i) => (
                <td key={i} className="border border-gray-300 px-4 py-2">
                  {item[header]}
                </td>
              ))}

              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleAction(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Thao tác
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </Table>

      {/* <div className="pagination mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(0)}
          disabled={pageIndex === 0}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {"<"}
        </button>
        <span className="px-2 py-1">
          Trang {pageIndex + 1} / {Math.ceil(total / recordsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex >= Math.ceil(total / recordsPerPage) - 1}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {">"}
        </button>
        <button
          onClick={() =>
            handlePageChange(Math.ceil(total / recordsPerPage) - 1)
          }
          disabled={pageIndex >= Math.ceil(total / recordsPerPage) - 1}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {">>"}
        </button>
      </div> */}
    </>
  );
};

export default CusTable;
