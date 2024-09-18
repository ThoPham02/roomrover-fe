import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { AiOutlineEllipsis } from "react-icons/ai";
import { PAGE_SIZE } from "../../common";

const ActionButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <AiOutlineEllipsis className="text-2xl" />
    </button>
  );
};

const CusTable = ({ headers }) => {
  const [pageIndex, setPageIndex] = useState(0);

  // const { total, listHouse } = useSelector((state) => state.invent.house);
  var total = 0;
  var listHouse = [];
  // useEffect(() => {
  //   // Lấy dữ liệu cho trang hiện tại
  //   const start = pageIndex * PAGE_SIZE;
  //   const end = start + PAGE_SIZE;
  //   setCurrentData(data.slice(start, end));
  // }, [data, pageIndex]);

  // Xử lý khi click "Thao tác"
  const handleAction = (item) => {
    console.log("Thao tác với:", item);
  };

  // Xử lý khi click chuyển trang
  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th className="text-nowrap text-center w-4">STT</th>
            {headers.map((item, index) => (
              <th key={index} className="">
                {item.header}
              </th>
            ))}
            <th className="text-nowrap text-center w-8">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listHouse && listHouse.length > 0 ? (
            listHouse.map((item, index) => (
              <tr key={index}>
                <td className="text-nowrap text-center">{index + 1}</td>
                {headers.map((header, i) => (
                  <td key={i}>{item[header.accessorKey]}</td>
                ))}
                <td className="text-nowrap text-center">
                  <ActionButton onClick={() => handleAction(item)} />
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>

      <div className="pagination mt-4 flex justify-center space-x-2">
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
          Trang {pageIndex + 1} / {Math.ceil(total / PAGE_SIZE)}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex >= Math.ceil(total / PAGE_SIZE) - 1}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(Math.ceil(total / PAGE_SIZE) - 1)}
          disabled={pageIndex >= Math.ceil(total / PAGE_SIZE) - 1}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default CusTable;
