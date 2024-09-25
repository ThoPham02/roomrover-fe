import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

import { PAGE_SIZE, ROUTE_PATHS } from "../../common";
import { CreateButton, CusTable } from "../../components/ui";
import HouseActionButton from "../../components/ui/House.ActionButton";
import { RoomModal } from "../../components/containers";
import { createRoom } from "../../store/services/inventServices";
import * as actions from "../../store/actions";

const columns = [
  {
    header: "Tên phòng",
    accessorKey: "name",
  },
  {
    header: "Số người/phòng",
    accessorKey: "capacity",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
  },
];

const TabRoomDetail = ({ id }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState({});

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseRoomAction(id));
  }, [dispatch, id]);

  const { houseRoom, totalRoom } = useSelector((state) => state.invent.house);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCreateRoomBtn = () => {
    setShowModal(true);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const res = await createRoom({
        houseID: id,
        ...room,
      });

      if (res.result.code === 0) {
        dispatch(actions.getHouseRoomAction(id));
        setShowModal(false);
        setRoom({});
      }
    } catch (error) {
      console.error("Error Create Service:", error);
      return null;
    }
  };

  return (
    <div className="relative">
      <CreateButton
        className="absolute -top-14 -right-0 z-1"
        onClick={handleCreateRoomBtn}
      />

      <CusTable
        headers={columns}
        data={houseRoom}
        page={page}
        ActionButton={HouseActionButton}
      />
      {houseRoom?.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hiển thị{" "}
            {`${(page - 1) * PAGE_SIZE + 1} - ${
              totalRoom > page * PAGE_SIZE ? page * PAGE_SIZE : totalRoom
            }`}{" "}
            trong tổng số {totalRoom} kết quả
          </p>

          <Pagination
            count={Math.ceil(totalRoom / PAGE_SIZE)}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}

      <RoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        room={room}
        setRoom={setRoom}
        handleSubmit={handleCreateRoom}
      />
    </div>
  );
};

export default TabRoomDetail;
