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
  // Các cột khác
];

const data = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 2, name: "Jane Doe" },
];

const ListHouses = () => {
  const { listHouse } = useSelector((state) => state.invent.house);

  let total = 100;

  console.log(listHouse);

  return (
    <div className="my-4">
      <CusTable headers={columns} data={data} total={total} />
    </div>
  );
};

export default ListHouses;
