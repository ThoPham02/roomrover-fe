import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineHomeWork,
  MdPayment,
} from "react-icons/md";
import { LiaFileContractSolid } from "react-icons/lia";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS, USER_ROLES } from "../../common";

const NavBarManage = ({ isExpanded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useSelector((state) => state.auth);

  console.log(user?.role);

  const menuItems =
    user?.role !== USER_ROLES.LESSOR
      ? [
          {
            icon: <MdOutlineDashboardCustomize className="text-3xl" />,
            label: "Dashboard",
            path: ROUTE_PATHS.RENTER_DASHBOARD,
          },
          {
            icon: <LiaFileContractSolid className="text-3xl" />,
            label: "Hợp đồng",
            path: ROUTE_PATHS.RENTER_CONTRACT,
          },
          {
            icon: <MdPayment className="text-3xl" />,
            label: "Thanh toán",
            path: ROUTE_PATHS.RENTER_PAYMENT,
          },
          {
            icon: <IoSettingsOutline className="text-3xl" />,
            label: "Cài đặt",
            path: ROUTE_PATHS.RENTER_USER_SETTINGS,
          },
        ]
      : [
          {
            icon: <MdOutlineDashboardCustomize className="text-3xl" />,
            label: "Dashboard",
            path: ROUTE_PATHS.DASHBOARD,
          },
          {
            icon: <MdOutlineHomeWork className="text-3xl" />,
            label: "Nhà trọ",
            path: ROUTE_PATHS.HOUSE,
          },
          {
            icon: <MdOutlineMeetingRoom className="text-3xl" />,
            label: "Phòng trọ",
            path: ROUTE_PATHS.ROOM,
          },
          {
            icon: <LiaFileContractSolid className="text-3xl" />,
            label: "Hợp đồng",
            path: ROUTE_PATHS.CONTRACT,
          },
          {
            icon: <MdPayment className="text-3xl" />,
            label: "Thanh toán",
            path: ROUTE_PATHS.PAYMENT,
          },
          {
            icon: <RiContactsBook3Line className="text-3xl" />,
            label: "Liên hệ",
            path: ROUTE_PATHS.CONTACT,
          },
          {
            icon: <IoSettingsOutline className="text-3xl" />,
            label: "Cài đặt",
            path: ROUTE_PATHS.USER_SETTINGS,
          },
        ];

  const shouldExpand = isExpanded || isHovered;
  const { currentPage } = useSelector((state) => state.app);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen transition-width duration-300 ${
          shouldExpand ? "w-260" : "w-80"
        } shadow-custom bg-white z-50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full text-black">
          <Link to={ROUTE_PATHS.ROOT}>
            <div
              className={`flex items-center p-4 ${
                shouldExpand ? "text-left" : "text-center justify-center"
              } h-70`}
            >
              <img
                src={logo}
                alt="logo"
                className={`rounded-full ${
                  shouldExpand ? "w-16 h-16" : "w-10 h-10"
                }`}
              />
              {shouldExpand ? (
                <h1 className="text-xl font-bold ml-4 uppercase whitespace-nowrap">
                  Nhà Trọ <br /> HUMG
                </h1>
              ) : null}
            </div>
          </Link>

          <div className="flex-grow">
            <ul className="list-unstyled">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`p-4 hover:text-blue-700 cursor-pointer ${
                    currentPage === item.path && "text-blue-700"
                  } ${shouldExpand ? "justify-start" : "justify-center"}`}
                >
                  <Link to={item.path} className="flex items-center">
                    {item.icon}
                    {shouldExpand && (
                      <span className="ml-4 whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`h-screen transition-width duration-300 ${
          shouldExpand ? "w-260" : "w-80"
        }`}
      ></div>
    </div>
  );
};

export default NavBarManage;
