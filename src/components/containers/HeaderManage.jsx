import { TfiViewList } from "react-icons/tfi";
import { LuBellRing } from "react-icons/lu";
import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import User from "../ui/User";
import {
  convertTimestampToDate,
  convertTimestampToDateTime,
} from "../../utils/utils";
import {
  apiGetListNotis,
  apiMarkAsReadNoti,
} from "../../store/services/notiServices";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS, USER_ROLES } from "../../common";
import { useSelector } from "react-redux";
// import { PAGE_SIZE } from "../../common";

const HeaderManage = ({ setIsExpanded, isExpanded }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header
        className={`fixed flex items-center justify-between h-70 px-4 bg-primary z-20 transition-width duration-300 ${
          isExpanded ? "width260px" : "width80px"
        }`}
      >
        <div className="flex items-center">
          <HeaderButton
            icon={<TfiViewList className="text-xl" />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <HeaderButton
            icon={<LuBellRing className="text-xl" />}
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          />
        </div>

        {isNotificationOpen && (
          <div ref={notificationRef}>
            <NotificationModule
              handleClose={() => setIsNotificationOpen(!isNotificationOpen)}
            />
          </div>
        )}

        <User />
      </header>
      <div className="h-70"></div>
    </div>
  );
};

export default HeaderManage;

const HeaderButton = ({ icon, onClick }) => {
  return (
    <button
      className="p-3 text-white rounded-full flex items-center justify-center hover:bg-yellow-400 ml-2 transition duration-300"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const NotificationModule = ({ handleClose }) => {
  const [notifications, setNotifications] = useState([]);
  // const [page, setPage] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await apiGetListNotis({ limit: 0, offset: 0 }); // Lấy tất cả thông báo

      if (res?.result.code === 0) {
        setNotifications(res.notifications);
      }
    } catch (error) {
      console.log("Fetch notifications error", error);
    }
  };

  return (
    <div className="absolute top-16 left-24 max-w-lg w-full bg-white shadow-lg rounded-lg p-4 z-50 h-96">
      <h2 className="text-xl font-bold mb-2 flex items-center">
        <FaBell className="mr-2" /> Thông báo
      </h2>
      <ul className="space-y-2">
        <AnimatePresence>
          {notifications?.map((notif) => (
            <motion.li
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-2 cursor-pointer rounded ${
                notif.unread === 1 ? "bg-sky-200" : "bg-gray-100"
              }`}
            >
              <NotiItem noti={notif} handleClose={handleClose} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {(!Array.isArray(notifications) || notifications.length === 0) && (
        <p className="text-center text-gray-500 mt-4">Không có thông báo</p>
      )}
    </div>
  );
};

const NotiItem = ({ noti, handleClose }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleRedirect = () => {
    switch (noti.refType) {
      case 1:
        navigate(ROUTE_PATHS.CALENDAR);
        break;
      case 2:
        navigate(ROUTE_PATHS.RENTER_CALENDAR);
        break;
      case 4:
        navigate(ROUTE_PATHS.RENTER_CALENDAR);
        break;
      case 8:
        navigate(ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", noti.refID));
        break;
      case 16:
        navigate(ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", noti.refID));
        break;
      case 32:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", noti.refID));
        }
        break;
      case 64:
        navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", noti.refID));
        break;
      case 128:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", noti.refID));
        }
        break;
      case 256:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", noti.refID));
        }
        break;
      case 512:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.PAYMENT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_PAYMENT_DETAIL.replace(":id", noti.refID));
        }
        break;
      case 1024:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.PAYMENT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_PAYMENT_DETAIL.replace(":id", noti.refID));
        }
        break;
      case 2048:
        if (user.role === USER_ROLES.LESSOR) {
          navigate(ROUTE_PATHS.PAYMENT_DETAIL.replace(":id", noti.refID));
        } else {
          navigate(ROUTE_PATHS.RENTER_PAYMENT_DETAIL.replace(":id", noti.refID));
        }
        break;
      default:
        console.log("Unknown refType, no redirect available");
        break;
    }
  };

  var content = <></>;
  switch (noti.refType) {
    case 1:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã đặt
          lịch hẹn xem phòng{" "}
          <span className="font-semibold">{noti.notiInfos[1].name}</span> vào
          ngày{" "}
          <span className="font-semibold">
            {convertTimestampToDate(noti.notiInfos[2].name)}
          </span>
        </div>
      );
      break;
    case 2:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã
          đồng ý lịch hẹn xem phòng{" "}
          <span className="font-semibold">{noti.notiInfos[1].name}</span> vào
          ngày{" "}
          <span className="font-semibold">
            {convertTimestampToDate(noti.notiInfos[2].name)}
          </span>
        </div>
      );
      break;
    case 4:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã từ
          chối lịch hẹn xem phòng{" "}
          <span className="font-semibold">{noti.notiInfos[1].name}</span> vào
          ngày{" "}
          <span className="font-semibold">
            {convertTimestampToDate(noti.notiInfos[2].name)}
          </span>
        </div>
      );
      break;
    case 8:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã tạo hợp đồng 
          [<span className="font-semibold">{noti.notiInfos[1].name}</span>] với bạn. Vui lòng kiểm tra và cập nhật hợp đồng!
        </div>
      );
      break;
    case 16:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã cập nhật hợp đồng 
          [<span className="font-semibold">{noti.notiInfos[1].name}</span>] với bạn. Vui lòng kiểm tra và cập nhật hợp đồng!
        </div>
      );
      break;
    case 32:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã hủy hợp đồng 
          [<span className="font-semibold">{noti.notiInfos[1].name}</span>] với bạn!
        </div>
      );
      break;
    case 64:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã xác nhận hợp đồng 
          [<span className="font-semibold">{noti.notiInfos[1].name}</span>]. Hợp đồng đã được kích hoạt!
        </div>
      );
      break;
    case 128:
      content = (
        <div>
          Hợp đồng [<span className="font-semibold">{noti.notiInfos[0].name}</span>] đã hết hạn!
        </div>
      );
      break;
    case 256:
      content = (
        <div>
          Hợp đồng [<span className="font-semibold">{noti.notiInfos[0].name}</span>] sắp hết hạn.
          Vui lòng gia hạn hợp đồng trước ngày hết hạn!
        </div>
      );
      break;
    case 512:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã được tạo. 
          Vui lòng cập nhật số lượng sử dụng và thanh toán trước ngày {" "}
          <span className="font-semibold">
            {convertTimestampToDate(noti.notiInfos[1].name)}
          </span>
        </div>
      );
      break;
    case 1024:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã quá hạn. 
          Vui lòng kiểm tra lại thông tin thanh toán!
        </div>
      );
      break;
    case 2048:
      content = (
        <div>
          <span className="font-semibold">{noti.notiInfos[0].name}</span> đã được thanh toán thành công.
        </div>
      );
      break;
    default:
      content = <span>Thông báo mới</span>;
      break;
  }

  const handleMarkAsRead = async () => {
    if (noti.unread === 1) {
      try {
        await apiMarkAsReadNoti(noti.id);
      } catch (e) {
        console.log("Mark as read error", e);
      }
    }
    handleClose();

    handleRedirect();
  };

  return (
    <div className="" onDoubleClick={handleMarkAsRead}>
      <p className="text-sm">{content}</p>
      <div className="w-full flex justify-end">
        <p className="text-xs text-gray-500 ">
          {convertTimestampToDateTime(noti.createdAt)}
        </p>
      </div>
    </div>
  );
};
