import Table from "react-bootstrap/Table";
import { PAGE_SIZE } from "../../common";

const CusTable = ({ headers, data, page, ActionButton }) => {
  return (
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
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td className="text-nowrap text-center">
                {(page - 1) * PAGE_SIZE + index + 1}
              </td>
              {headers.map((header, i) => (
                <td key={i}>{item[header.accessorKey]}</td>
              ))}
              <td className="text-nowrap text-center">
                <ActionButton house={item} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length + 2} className="text-center">
              Không có dữ liệu để hiển thị
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CusTable;