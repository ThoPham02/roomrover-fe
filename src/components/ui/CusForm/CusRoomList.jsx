import React, { useEffect, useMemo } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const CusRoomList = ({ state, setState, disabled }) => {
  const rooms = useMemo(() => state.rooms || [], [state.rooms]);

  useEffect(() => {
    if (rooms.length === 0) {
      setState({
        ...state,
        rooms: [{ id: 1, name: "", capacity: "" }],
      });
    }
  }, [rooms, setState, state]);

  const handleAddRoom = () => {
    const newRoom = { id: rooms.length + 1, name: "", capacity: "" };
    setState({ ...state, rooms: [...rooms, newRoom] });
  };

  const handleRemoveRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    if (newRooms.length > 0) {
      setState({ ...state, rooms: newRooms });
    }
  };

  const handleRoomChange = (index, field, value) => {
    const newRooms = [...rooms];
    if (field === "capacity") {
      newRooms[index][field] = value.replace(/[^0-9]/g, "");
    } else {
      newRooms[index][field] = value;
    }
    setState({ ...state, rooms: newRooms });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center mb-2">
        <p className="min-w-96">Tên phòng</p>
        <p className="min-w-48 pl-2">Số lượng người tối đa</p>
      </div>
      {rooms.map((room, index) => (
        <div key={index} className="flex items-center mb-1 space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full min-w-96 form-control"
            value={room.name}
            onChange={(e) => handleRoomChange(index, "name", e.target.value)}
            placeholder="Nhập tên phòng"
            disabled={disabled}
          />

          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-48 text-center form-control"
            // eslint-disable-next-line
            value={room.capacity == 0 ? "" : room.capacity}
            onChange={(e) =>
              handleRoomChange(index, "capacity", e.target.value)
            }
            placeholder="Không giới hạn"
            disabled={disabled}
          />

          {!disabled && (
            <div>
              {index === 0 ? (
                <button className="text-blue-500" onClick={handleAddRoom}>
                  <FiPlus size={20} />
                </button>
              ) : (
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveRoom(index)}
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CusRoomList;
