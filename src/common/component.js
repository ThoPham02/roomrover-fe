export const ContractStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-300">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-cyan-300">
      Chờ cọc
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-emerald-300">
      Đang thuê
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-yellow-300">
      Đã hết hạn
    </p>
  ),
  16: (
    <p className="px-2 py-1 rounded inline-block text-center bg-rose-500">
      Đã hủy
    </p>
  ),
};

export const HouseStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-blue-500 text-white">
      Đang cho thuê
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-orange-500 text-white">
      Tạm dừng
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
      Hết phòng
    </p>
  ),
};

export const RoomStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-blue-500 text-white">
      Sẵn sàng thuê
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-orange-500 text-white">
      Đã được thuê
    </p>
  ),
};
