import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineHomeWork,
  MdPayment,
} from "react-icons/md";
import { LiaFileContractSolid } from "react-icons/lia";
import { LuBellRing } from "react-icons/lu";
import { TbReportMoney } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS } from "../../common";

const NavBarManage = ({ isExpanded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
    {
      icon: <MdOutlineDashboardCustomize className="text-3xl" />,
      label: "Dashboard",
      path: ROUTE_PATHS.HOME,
    },
    {
      icon: <MdOutlineHomeWork className="text-3xl" />,
      label: "Nhà trọ",
      path: ROUTE_PATHS.HOUSE,
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
      icon: <LuBellRing className="text-3xl" />,
      label: "Thông báo",
      path: ROUTE_PATHS.NOTIFICATION,
    },
    {
      icon: <TbReportMoney className="text-3xl" />,
      label: "Báo cáo",
      path: ROUTE_PATHS.REPORT,
    },
  ];

  const shouldExpand = isExpanded || isHovered;

  return (
    <div
      className={`relative h-screen transition-width duration-300 ${
        shouldExpand ? "w-260" : "w-80"
      } shadow-custom bg-white`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full text-black">
        <Link to={ROUTE_PATHS.HOME}>
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
                  shouldExpand ? "justify-start" : "justify-center"
                }`}
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon}
                  {shouldExpand && (
                    <span className="ml-4 whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 mt-auto">
          <Link to={ROUTE_PATHS.SETTINGS}>
            <div
              className={`flex items-center p-4 hover:text-blue-700 cursor-pointer ${
                shouldExpand ? "justify-start" : "justify-center"
              }`}
            >
              <IoSettingsOutline className="text-3xl" />
              {shouldExpand && (
                <span className="ml-4 whitespace-nowrap">Cài đặt</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarManage;
