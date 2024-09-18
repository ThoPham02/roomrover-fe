import { useSelector } from "react-redux";
import CusTable from "./CusTable";

const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
];

const ListHouses = () => {
  const { listHouse } = useSelector((state) => state.invent.house);

  let total = 100;

  return (
    <div className="my-4">
      <CusTable headers={columns} />
    </div>
  );
};

export default ListHouses;
