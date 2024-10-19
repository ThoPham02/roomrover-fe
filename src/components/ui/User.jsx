import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineHomeWork } from "react-icons/md";

import defaultAvatar from "../../assets/images/default_avatar.png";
import { ROUTE_PATHS, USER_ROLES } from "../../common";
import * as actions from "../../store/actions";

const User = () => {
  const dispatch = useDispatch();
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(actions.logout());
  };
  return (
    <div
      className="flex items-center relative"
      onMouseEnter={() => setIsAvatarHovered(true)}
      onMouseLeave={() => setIsAvatarHovered(false)}
    >
      <button className="rounded-circle flex items-center justify-center m-2">
        <img
          src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
          alt="avatar"
          className={"rounded-full w-12 h-12"}
        />
      </button>

      {isAvatarHovered && (
        <div
          className="absolute w-360 bg-white shadow-md rounded-md z-50"
          style={{ top: "100%", right: 0 }}
        >
          <div className="d-flex align-items-center py-9 mx-7 border-bottom">
            <img
              src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
              className="rounded-full w-24 h-24"
              alt="avatar"
            />
            <div className="ms-3">
              <h5 className="mb-1 fs-4">
                {user.fullName ? user.fullName : user.phone}
              </h5>
              <p className="mb-0 d-flex align-items-center gap-2">
                <FiPhone />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>
          <div className="message-body">
            <div className="py-3 px-7 pb-0">
              <h5 className="mb-0 fs-5">User Profile</h5>
            </div>

            <Link
              to={
                user?.role === USER_ROLES.LESSOR
                  ? ROUTE_PATHS.DASHBOARD
                  : ROUTE_PATHS.RENTER_DASHBOARD
              }
              className="py-2 px-7 mt-4 d-flex align-items-center group"
            >
              <span className="d-flex align-items-center justify-content-center bg-info-subtle rounded p-3 fs-7 text-info">
                <MdOutlineHomeWork className="w-8 h-8" />
              </span>
              <div className="w-75 d-inline-block v-middle ps-3">
                <h6 className="mb-1 fs-5 font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                  Nhà trọ của tôi
                </h6>
                <span className="fs-7 d-block text-gray-500">Quản lý</span>
              </div>
            </Link>

            <Link
              to={
                user?.role === USER_ROLES.LESSOR
                  ? ROUTE_PATHS.USER_SETTINGS
                  : ROUTE_PATHS.RENTER_USER_SETTINGS
              }
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
          <div className="d-grid py-4 px-7 pt-8">
            <button onClick={handleLogout} className="btn btn-info">
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
