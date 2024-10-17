import { TfiViewList } from "react-icons/tfi";
import { LuBellRing } from "react-icons/lu";
import React, { useState, useEffect } from "react";
import { FaBell, FaCheck, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import User from "../ui/User";

const HeaderButton = ({ icon, onClick }) => {
  return (
    <button
      className="p-3 text-black rounded-circle flex items-center justify-center hover:bg-blue-400 ml-2"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const HeaderManage = ({ setIsExpanded, isExpanded }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div>
      <header
        className={`fixed flex items-center justify-between h-70 px-4 bg-secondary2 shadow-md z-20 transition-width duration-300 ${
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

        {isNotificationOpen && <NotificationModule />}

        <User />
      </header>
      <div className="h-70"></div>
    </div>
  );
};

export default HeaderManage;

const NotificationModule = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 1,
              content: "New message received",
              createdAt: "2023-06-15T10:30:00Z",
              status: "unread",
            },
            {
              id: 2,
              content: "Your order has been shipped",
              createdAt: "2023-06-14T15:45:00Z",
              status: "read",
            },
            {
              id: 3,
              content: "Payment successful",
              createdAt: "2023-06-13T09:00:00Z",
              status: "read",
            },
            {
              id: 4,
              content: "New friend request",
              createdAt: "2023-06-12T18:20:00Z",
              status: "unread",
            },
          ]);
        }, 1000)
      );
      setNotifications(response);
    } catch (error) {
      setError("Failed to fetch notifications. Please try again later.");
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "read" } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    return notif.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="absolute top-16 left-24 max-w-lg w-full bg-white shadow-lg rounded-lg p-4 z-50">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaBell className="mr-2" /> Thông báo
      </h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.map((notif) => (
            <motion.li
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`bg-gray-50 p-4 rounded-lg shadow ${
                notif.status === "unread" ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{notif.content}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {notif.status === "unread" && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Mark as read"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete notification"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Không có thông báo 
        </p>
      )}
    </div>
  );
};
