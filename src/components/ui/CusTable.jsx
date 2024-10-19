import Table from "react-bootstrap/Table";
import { PAGE_SIZE } from "../../common";

const CusTable = ({ headers, data, page, ActionButton }) => {
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th className="text-nowrap text-center w-4">STT</th>
          {headers.map((item, index) => (
            <th key={index} className={`text-nowrap ${item.headerClass}`}>
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
              <td className="text-nowrap text-center align-middle">
                {(page - 1) * PAGE_SIZE + index + 1}
              </td>
              {headers.map((header, i) => (
                <td key={i} className={`align-middle ${header.dataClass}`}>
                  {getNestedValue(item, header.accessorKey)}
                </td>
              ))}
              <td className="text-nowrap text-center align-middle">
                <ActionButton item={item} className="p-4" />
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
