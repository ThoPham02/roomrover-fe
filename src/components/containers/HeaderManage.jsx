import { useState } from "react";
import { Link } from "react-router-dom";

import { TfiViewList } from "react-icons/tfi";
import { LuBellRing } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

import defaultAvatar from "../../assets/images/default_avatar.png";
import { ROUTE_PATHS } from "../../common";

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
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  return (
    <header className="flex items-center justify-between h-70 px-4 bg-secondary2 shadow-md w-full">
      <div className="flex items-center">
        <HeaderButton
          icon={<TfiViewList className="text-xl" />}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <HeaderButton
          icon={<LuBellRing className="text-xl" />}
          onClick={() => console.log("Notification button clicked")}
        />
      </div>

      <div
        className="flex items-center relative"
        onMouseEnter={() => setIsAvatarHovered(true)}
        onMouseLeave={() => setIsAvatarHovered(false)}
      >
        <button className="rounded-circle flex items-center justify-center m-2">
          <img
            src={defaultAvatar}
            alt="avatar"
            className={"rounded-full w-12 h-12"}
          />
        </button>

        {isAvatarHovered && (
          <div
            className="absolute w-360 bg-white shadow-md rounded-md"
            style={{ top: "100%", right: 0 }}
          >
            {/* user */}
            <div className="d-flex align-items-center py-9 mx-7 border-bottom">
              <img
                src={defaultAvatar}
                className="rounded-circle"
                width="80"
                height="80"
                alt=""
              />
              <div className="ms-3">
                <h5 className="mb-1 fs-4">Markarn Doe</h5>
                <p className="mb-0 d-flex align-items-center gap-2">
                  <FiPhone />
                  <span>0123456789</span>
                </p>
              </div>
            </div>
            {/* body */}
            <div className="message-body">
              <div className="py-3 px-7 pb-0">
                <h5 className="mb-0 fs-5">User Profile</h5>
              </div>
              <Link
                to={ROUTE_PATHS.USER}
                className="py-2 px-7 mt-4 d-flex align-items-center group"
              >
                <span className="d-flex align-items-center justify-content-center bg-info-subtle rounded p-3 fs-7 text-info">
                  <FaRegUserCircle className="w-8 h-8" />
                </span>
                <div className="w-75 d-inline-block v-middle ps-3">
                  <h6 className="mb-1 fs-5 font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                    Tài khoản của tôi
                  </h6>
                  <span className="fs-7 d-block text-gray-500">Cài đặt</span>
                </div>
              </Link>
            </div>
            {/* Logout */}
            <div className="d-grid py-4 px-7 pt-8">
              <Link to={ROUTE_PATHS.HOME} className="btn btn-info">
                Đăng xuất
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderManage;
