export const ContractStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-300 text-gray-800">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-blue-400 text-white">
      Chờ cọc
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Đang thuê
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-yellow-400 text-gray-800">
      Đã hết hạn
    </p>
  ),
  16: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
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
      Đã đăng tin
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
      Tạm dừng
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
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
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Đã được thuê
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
      Tạm dừng
    </p>
  ),
};

export const PaymentStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-blue-500 text-white">
      Chờ thanh toán
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Đã thanh toán
    </p>
  ),
  8: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
      Quá hạn
    </p>
  ),
};

export const BillPayStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Đang xử lý
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Thành công
    </p>
  ),
};

export const ContactStatusComponent = {
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Chờ xác nhận
    </p>
  ),
  2: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Đồng ý
    </p>
  ),
  4: (
    <p className="px-2 py-1 rounded inline-block text-center bg-red-500 text-white">
      Từ chối
    </p>
  ),
};

export const RenterContactStatusComponent = {
  0: (
    <p className="px-2 py-1 rounded inline-block text-center bg-gray-500 text-white">
      Chưa đăng ký
    </p>
  ),
  1: (
    <p className="px-2 py-1 rounded inline-block text-center bg-green-500 text-white">
      Đã đăng ký
    </p>
  ),
};
