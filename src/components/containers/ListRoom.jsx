import { RoomItem } from "../ui";

const ListRoom = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </div>
  );
};

export default ListRoom;
